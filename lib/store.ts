import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

interface KanbanStore {
  columns: Column[];
  sidebarTasks: Task[];
  activeTask: Task | null;
  setActiveTask: (task: Task | null) => void;
  moveTask: (
    activeId: string,
    overId: string,
    activeColumnId: string,
    overColumnId: string
  ) => void;
  reorderTasksInColumn: (columnId: string, activeIndex: number, overIndex: number) => void;
  addTaskToColumn: (task: Task, columnId: string, position?: number) => void;
  removeTaskFromSidebar: (taskId: string) => void;
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Task 1", description: "Description for task 1" },
      { id: "2", title: "Task 2", description: "Description for task 2" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "Task 3", description: "Description for task 3" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "4", title: "Task 4", description: "Description for task 4" },
      { id: "5", title: "Task 5", description: "Description for task 5" },
    ],
  },
];

const initialSidebarTasks: Task[] = [
  { id: "sidebar-1", title: "New Feature", description: "Implement new feature" },
  { id: "sidebar-2", title: "Bug Fix", description: "Fix critical bug" },
  { id: "sidebar-3", title: "Documentation", description: "Update docs" },
  { id: "sidebar-4", title: "Code Review", description: "Review PR #123" },
];

export const useKanbanStore = create<KanbanStore>((set) => ({
  columns: initialColumns,
  sidebarTasks: initialSidebarTasks,
  activeTask: null,
  
  setActiveTask: (task) => set({ activeTask: task }),
  
  addTaskToColumn: (task, columnId, position) =>
    set((state) => {
      const newColumns = state.columns.map((col) => {
        if (col.id === columnId) {
          const newTasks = [...col.tasks];
          if (position !== undefined) {
            newTasks.splice(position, 0, task);
          } else {
            newTasks.push(task);
          }
          return { ...col, tasks: newTasks };
        }
        return col;
      });
      
      // Remove from sidebar
      const newSidebarTasks = state.sidebarTasks.filter((t) => t.id !== task.id);
      
      return { columns: newColumns, sidebarTasks: newSidebarTasks };
    }),
  
  removeTaskFromSidebar: (taskId) =>
    set((state) => ({
      sidebarTasks: state.sidebarTasks.filter((t) => t.id !== taskId),
    })),
  
  moveTask: (activeId, overId, activeColumnId, overColumnId) =>
    set((state) => {
      const newColumns = [...state.columns];
      const activeColIndex = newColumns.findIndex((col) => col.id === activeColumnId);
      const overColIndex = newColumns.findIndex((col) => col.id === overColumnId);
      
      const activeColumn = newColumns[activeColIndex];
      const overColumn = newColumns[overColIndex];
      
      const activeTaskIndex = activeColumn.tasks.findIndex((task) => task.id === activeId);
      const activeTask = activeColumn.tasks[activeTaskIndex];
      
      // Remove from active column
      const newActiveTasks = activeColumn.tasks.filter((task) => task.id !== activeId);
      
      // Add to over column
      const overTaskIndex = overColumn.tasks.findIndex((task) => task.id === overId);
      const newOverTasks = [...overColumn.tasks];
      
      if (overTaskIndex === -1) {
        newOverTasks.push(activeTask);
      } else {
        newOverTasks.splice(overTaskIndex, 0, activeTask);
      }
      
      newColumns[activeColIndex] = { ...activeColumn, tasks: newActiveTasks };
      newColumns[overColIndex] = { ...overColumn, tasks: newOverTasks };
      
      return { columns: newColumns };
    }),
  
  reorderTasksInColumn: (columnId, activeIndex, overIndex) =>
    set((state) => {
      const newColumns = [...state.columns];
      const colIndex = newColumns.findIndex((col) => col.id === columnId);
      const column = newColumns[colIndex];
      
      const newTasks = [...column.tasks];
      const [movedTask] = newTasks.splice(activeIndex, 1);
      newTasks.splice(overIndex, 0, movedTask);
      
      newColumns[colIndex] = { ...column, tasks: newTasks };
      
      return { columns: newColumns };
    }),
}));
