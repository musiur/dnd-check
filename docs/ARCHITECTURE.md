# Drag & Drop Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser Window                          │
├──────────────────┬──────────────────────────────────────────────┤
│                  │                                              │
│    SIDEBAR       │           KANBAN BOARD                       │
│  (Native Drag)   │         (Hybrid: Native + DND-KIT)          │
│                  │                                              │
│  ┌────────────┐  │  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Task 1    │──┼─→│  To Do   │ │Progress  │ │  Done    │   │
│  │ draggable  │  │  │          │ │          │ │          │   │
│  └────────────┘  │  │ ┌──────┐ │ │ ┌──────┐ │ │ ┌──────┐ │   │
│                  │  │ │Task 1│←┼─┼─│Task 3│ │ │ │Task 4│ │   │
│  ┌────────────┐  │  │ └──────┘ │ │ └──────┘ │ │ └──────┘ │   │
│  │  Task 2    │──┼─→│          │ │          │ │          │   │
│  │ draggable  │  │  │ ┌──────┐ │ │          │ │ ┌──────┐ │   │
│  └────────────┘  │  │ │Task 2│ │ │          │ │ │Task 5│ │   │
│                  │  │ └──────┘ │ │          │ │ └──────┘ │   │
│  ┌────────────┐  │  └──────────┘ └──────────┘ └──────────┘   │
│  │  Task 3    │  │       ↑            ↑            ↑          │
│  │ draggable  │  │       │            │            │          │
│  └────────────┘  │       └────────────┴────────────┘          │
│                  │              DND-KIT Context                │
│  onDrop handler  │         (Reordering & Moving)               │
│  (accepts cards  │                                              │
│   from Kanban)   │         onDrop handlers                     │
│                  │         (accept from Sidebar)               │
└──────────────────┴──────────────────────────────────────────────┘
                   ↓
            ┌──────────────┐
            │   ZUSTAND    │
            │    STORE     │
            │              │
            │ sidebarTasks │
            │   columns    │
            │  activeTask  │
            └──────────────┘
```

## Drag Flow Diagrams

### Flow 1: Sidebar → Kanban

```
┌─────────┐
│ Sidebar │
│  Card   │
└────┬────┘
     │ 1. onDragStart
     │    - Set dataTransfer
     │    - source: "sidebar"
     ↓
┌─────────────┐
│   Dragging  │
│   (Native)  │
└──────┬──────┘
       │ 2. Drop on Column
       ↓
┌──────────────┐
│   Column     │
│   onDrop     │
└──────┬───────┘
       │ 3. Parse task data
       │ 4. addTaskToColumn()
       ↓
┌──────────────┐
│   Zustand    │
│   Update     │
└──────┬───────┘
       │ 5. Remove from sidebar
       │ 6. Add to column
       ↓
┌──────────────┐
│   Re-render  │
│   Complete   │
└──────────────┘
```

### Flow 2: Kanban → Sidebar

```
┌─────────┐
│ Kanban  │
│  Card   │
└────┬────┘
     │ 1. onDragStart (Native)
     │    - draggable="true"
     │    - source: "kanban"
     ↓
┌─────────────┐
│   Dragging  │
│   (Native)  │
└──────┬──────┘
       │ 2. Drop on Sidebar
       ↓
┌──────────────┐
│   Sidebar    │
│   onDrop     │
└──────┬───────┘
       │ 3. Check source === "kanban"
       │ 4. Remove from columns
       ↓
┌──────────────┐
│   Zustand    │
│   Update     │
└──────┬───────┘
       │ 5. Remove from all columns
       │ 6. Add to sidebarTasks
       ↓
┌──────────────┐
│   Re-render  │
│   Complete   │
└──────────────┘
```

### Flow 3: Within Kanban (DND-KIT)

```
┌─────────┐
│ Kanban  │
│  Card   │
└────┬────┘
     │ 1. Pointer down
     │    - PointerSensor activates
     ↓
┌─────────────┐
│   DND-KIT   │
│   Dragging  │
└──────┬──────┘
       │ 2. onDragOver
       │    - Collision detection
       │    - Visual feedback
       ↓
┌──────────────┐
│   Drop on    │
│   Column     │
└──────┬───────┘
       │ 3. onDragEnd
       │    - Calculate new position
       ↓
┌──────────────┐
│   Zustand    │
│   Update     │
└──────┬───────┘
       │ 4. moveTask() or
       │    reorderTasksInColumn()
       ↓
┌──────────────┐
│   Re-render  │
│   with       │
│   Animation  │
└──────────────┘
```

## Component Hierarchy

```
app/page.tsx
├── Sidebar (Native Drag Source + Drop Target)
│   ├── draggable cards
│   └── onDrop handler (accepts from Kanban)
│
└── KanbanBoard (DND-KIT Context)
    ├── DndContext
    │   ├── sensors
    │   ├── onDragStart
    │   ├── onDragOver
    │   └── onDragEnd
    │
    └── KanbanColumn (x3)
        ├── useDroppable (DND-KIT)
        ├── onDrop (Native - accepts from Sidebar)
        ├── onDragOver (Native)
        │
        └── SortableContext
            └── KanbanCard (x multiple)
                ├── useSortable (DND-KIT)
                ├── draggable="true" (Native)
                └── onDragStart (Native)
```

## State Management

```
┌─────────────────────────────────────────┐
│           Zustand Store                 │
├─────────────────────────────────────────┤
│                                         │
│  sidebarTasks: Task[]                   │
│  ├─ Available tasks to drag             │
│  └─ Updated when cards move             │
│                                         │
│  columns: Column[]                      │
│  ├─ Board state                         │
│  └─ Updated by all drag operations      │
│                                         │
│  activeTask: Task | null                │
│  └─ Currently dragging (for overlay)    │
│                                         │
│  Actions:                               │
│  ├─ addTaskToColumn()                   │
│  ├─ removeTaskFromSidebar()             │
│  ├─ moveTask()                          │
│  └─ reorderTasksInColumn()              │
│                                         │
└─────────────────────────────────────────┘
```

## Event System

### Native HTML5 Events
```
Sidebar Card:
  - onDragStart → Set dataTransfer
  
Column:
  - onDragOver → Allow drop
  - onDrop → Handle drop

Kanban Card:
  - draggable="true"
  - onDragStart → Set dataTransfer
```

### DND-KIT Events
```
DndContext:
  - onDragStart → Set activeTask
  - onDragOver → Handle collision
  - onDragEnd → Update state

Sensors:
  - PointerSensor (distance: 8px)
```

## Why This Works Across Layouts

```
app/
  layout.tsx (Server Component ✓)
    └── <body>
        └── {children}
            └── page.tsx (Client Component)
                ├── <Sidebar /> ← Native draggable
                └── <KanbanBoard /> ← Native droppable
                    └── <DndContext> ← Scoped to board only

Native events bubble through React tree naturally!
No context boundary issues!
```

## Performance Characteristics

| Operation | System | Performance |
|-----------|--------|-------------|
| Sidebar → Kanban | Native | ⚡ Excellent (browser-level) |
| Kanban → Sidebar | Native | ⚡ Excellent (browser-level) |
| Within Kanban | DND-KIT | ✅ Good (optimized React) |
| State Updates | Zustand | ⚡ Excellent (minimal re-renders) |

## Key Insights

1. **Native events work everywhere** - No React Context needed
2. **DND-KIT enhances UX** - But only where needed
3. **Zustand coordinates state** - Single source of truth
4. **Hybrid approach** - Best of both worlds
5. **Scales to any layout depth** - Native events bubble naturally
