# Quick Start Guide

## Run the Application

```bash
# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## What You'll See

```
┌─────────────────┬──────────────────────────────────────────┐
│                 │                                          │
│  SIDEBAR        │         KANBAN BOARD                     │
│                 │                                          │
│  Available      │   To Do    In Progress    Done          │
│  Tasks:         │                                          │
│                 │   Task 1     Task 3      Task 4          │
│  • New Feature  │   Task 2                  Task 5          │
│  • Bug Fix      │                                          │
│  • Documentation│                                          │
│  • Code Review  │                                          │
│                 │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

## Try These Actions

### 1. Drag from Sidebar to Board
1. Click and hold "New Feature" in the sidebar
2. Drag it over the "To Do" column
3. Release to drop
4. ✅ Card appears in "To Do" column
5. ✅ Card disappears from sidebar

### 2. Reorder Within Column
1. Click and hold "Task 1" in "To Do"
2. Drag it below "Task 2"
3. Release to drop
4. ✅ Tasks swap positions with smooth animation

### 3. Move Between Columns
1. Click and hold "Task 1" in "To Do"
2. Drag it over "In Progress" column
3. Release to drop
4. ✅ Task moves to new column with animation

### 4. Drag Back to Sidebar
1. Click and hold any task from the board
2. Drag it over the sidebar area
3. Release to drop
4. ✅ Task returns to sidebar
5. ✅ Task disappears from board

## Visual Feedback

- **Dragging**: Card becomes semi-transparent
- **Valid Drop Zone**: Cursor shows "move" icon
- **Sidebar Hover**: Background highlights when dragging from board
- **Animations**: Smooth transitions when reordering

## Understanding the Code

### Key Files

```
lib/store.ts                 - State management (Zustand)
components/sidebar.tsx       - Draggable source + drop target
components/kanban-board.tsx  - DND-KIT context wrapper
components/kanban-column.tsx - Drop zone for sidebar cards
components/kanban-card.tsx   - Hybrid draggable card
app/page.tsx                 - Layout composition
```

### State Structure

```typescript
{
  sidebarTasks: [
    { id: "sidebar-1", title: "New Feature", description: "..." }
  ],
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "1", title: "Task 1", description: "..." }
      ]
    }
  ]
}
```

## Customization

### Add More Sidebar Tasks

Edit `lib/store.ts`:

```typescript
const initialSidebarTasks: Task[] = [
  { id: "sidebar-1", title: "New Feature", description: "Implement new feature" },
  { id: "sidebar-2", title: "Bug Fix", description: "Fix critical bug" },
  // Add more here
  { id: "sidebar-5", title: "Your Task", description: "Your description" },
];
```

### Add More Columns

Edit `lib/store.ts`:

```typescript
const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
  // Add more here
  { id: "archived", title: "Archived", tasks: [] },
];
```

### Change Styling

All components use Tailwind CSS. Edit the `className` props:

```typescript
// components/sidebar.tsx
<div className="w-80 bg-muted/30 border-r p-6">
  {/* Change width, background, padding, etc. */}
</div>
```

## Troubleshooting

### Cards Not Dropping

**Problem**: Cards don't drop when released

**Solution**: Make sure `onDragOver` calls `e.preventDefault()`:

```typescript
onDragOver={(e) => {
  e.preventDefault(); // Required!
  e.dataTransfer.dropEffect = 'move';
}}
```

### No Visual Feedback

**Problem**: No cursor change or highlighting

**Solution**: Check that `draggable="true"` is set:

```typescript
<div draggable="true" onDragStart={...}>
```

### State Not Updating

**Problem**: Cards move but state doesn't update

**Solution**: Verify Zustand actions are being called:

```typescript
const addTaskToColumn = useKanbanStore((state) => state.addTaskToColumn);
// Make sure to call it in onDrop
addTaskToColumn(task, columnId);
```

### TypeScript Errors

**Problem**: Type errors in components

**Solution**: Restart TypeScript server:
- VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
- Or restart your editor

## Next Steps

1. **Read the docs**:
   - `DRAG-DROP-IMPLEMENTATION.md` - How it works
   - `ARCHITECTURE.md` - System design
   - `IMPLEMENTATION-SUMMARY.md` - Overview

2. **Extend the functionality**:
   - Add task creation form
   - Add task editing
   - Add task deletion
   - Persist to localStorage
   - Add backend API

3. **Improve UX**:
   - Add loading states
   - Add error handling
   - Add undo/redo
   - Add keyboard shortcuts
   - Add touch support

## Questions?

Check the implementation files for detailed explanations:
- Architecture diagrams in `ARCHITECTURE.md`
- Flow diagrams in `DRAG-DROP-IMPLEMENTATION.md`
- Technical details in `IMPLEMENTATION-SUMMARY.md`

## Demo Video Script

If you want to record a demo:

1. Start with sidebar visible
2. "Here we have available tasks in the sidebar"
3. Drag "New Feature" to "To Do"
4. "Tasks can be dragged from sidebar to any column"
5. Reorder tasks within "To Do"
6. "Within columns, we can reorder with smooth animations"
7. Move task from "To Do" to "In Progress"
8. "Tasks can move between columns"
9. Drag task back to sidebar
10. "And we can drag tasks back to the sidebar to remove them"
11. "This works across any layout depth in Next.js"

Enjoy your bidirectional drag-and-drop Kanban board! 🎉
