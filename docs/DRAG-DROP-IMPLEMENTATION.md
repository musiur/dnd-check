# Bidirectional Drag & Drop Implementation

## Architecture Overview

This implementation demonstrates **bidirectional drag-and-drop** between a sidebar and Kanban board using a **hybrid approach**:

- **Native HTML5 Drag & Drop API**: For cross-boundary dragging (sidebar ↔ Kanban)
- **DND-KIT**: For enhanced interactions within the Kanban board (reordering, animations)
- **Zustand**: For global state management

## Key Features

### ✅ Sidebar → Kanban
- Drag tasks from sidebar to any column
- Tasks are removed from sidebar when dropped on board
- Native HTML5 drag events

### ✅ Kanban → Sidebar
- Drag tasks back from board to sidebar
- Tasks are removed from board and restored to sidebar
- Bidirectional flow

### ✅ Within Kanban
- Reorder tasks within columns (DND-KIT)
- Move tasks between columns (DND-KIT)
- Smooth animations and collision detection

## How It Works

### 1. Universal Cards (Hybrid Support)

Cards in the Kanban board support **both** drag systems:

```typescript
// components/kanban-card.tsx
<div
  {...dndKitListeners}  // DND-KIT for internal dragging
  draggable="true"       // Native HTML5 for external dragging
  onDragStart={...}      // Native handler
>
```

### 2. Native Drop Zones

Both sidebar and columns accept native drops:

```typescript
// components/kanban-column.tsx
<div
  onDrop={handleNativeDrop}      // Accept native drops
  onDragOver={handleDragOver}    // Required for drop to work
>
```

### 3. State Management

Zustand manages all state globally:

```typescript
// lib/store.ts
{
  sidebarTasks: Task[],        // Available tasks
  columns: Column[],           // Board state
  addTaskToColumn: (task, columnId) => void,
  // ... other actions
}
```

## Data Flow

### Sidebar → Kanban
```
1. User drags card from sidebar
   → Native onDragStart sets dataTransfer
   
2. User drops on column
   → Column's onDrop handler fires
   → Parses task data from dataTransfer
   → Calls addTaskToColumn(task, columnId)
   → Zustand updates state
   → Card removed from sidebar, added to column
```

### Kanban → Sidebar
```
1. User drags card from Kanban
   → Card has draggable="true"
   → Native onDragStart sets dataTransfer with source="kanban"
   
2. User drops on sidebar
   → Sidebar's onDrop handler fires
   → Checks source === "kanban"
   → Removes task from all columns
   → Adds task back to sidebarTasks
```

### Within Kanban (DND-KIT)
```
1. User drags card within board
   → DND-KIT PointerSensor activates
   → onDragOver handles collision detection
   → onDragEnd updates column state
```

## Why This Approach?

### Native HTML5 for Cross-Boundary
- ✅ No React Context needed
- ✅ Works across any component boundary
- ✅ Works with nested layouts, parallel routes
- ✅ Zero bundle size (built-in browser API)
- ✅ Simple to reason about

### DND-KIT for Enhanced UX
- ✅ Beautiful animations
- ✅ Collision detection
- ✅ Accessibility support
- ✅ Touch device support
- ✅ Consistent cross-browser behavior

### Zustand for State
- ✅ Global state accessible anywhere
- ✅ No prop drilling
- ✅ Simple API
- ✅ Works with Server Components

## Extending This Pattern

### Add More Drop Zones
```typescript
// Any component can be a drop zone
<div
  onDrop={(e) => {
    const task = JSON.parse(e.dataTransfer.getData("application/json"));
    handleDrop(task);
  }}
  onDragOver={(e) => e.preventDefault()}
>
  Drop here
</div>
```

### Add More Draggable Sources
```typescript
// Any component can be draggable
<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(data));
    e.dataTransfer.setData("source", "my-source");
  }}
>
  Drag me
</div>
```

### Works with Nested Layouts
```
app/
  layout.tsx (Server Component)
    <Sidebar /> ← Draggable source
    {children}
      (dashboard)/
        layout.tsx
          @parallel/
            projects/[id]/
              page.tsx
                <KanbanBoard /> ← Drop target
```

No context needed! Native events work across any boundary.

## Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ⚠️ Mobile: Requires touch polyfill for native drag

## Performance

- Native drag events are handled at browser level (C++)
- DND-KIT only active within Kanban board
- No global context re-renders
- Minimal JavaScript overhead

## Testing

Run the dev server:
```bash
pnpm dev
```

Try:
1. Drag task from sidebar → any column
2. Reorder tasks within a column
3. Move tasks between columns
4. Drag task back to sidebar

All flows should work smoothly!
