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

interface NativeKanbanStore {
	sidebarTasks: Task[];
	columns: Column[];
	draggedTask: Task | null;
	dragSource: string | null;
	sidebarHighlight: boolean;
	highlightedColumn: string | null;

	setDraggedTask: (task: Task | null) => void;
	setDragSource: (source: string | null) => void;
	setSidebarHighlight: (highlight: boolean) => void;
	setHighlightedColumn: (columnId: string | null) => void;

	moveTaskToColumn: (task: Task, columnId: string) => void;
	moveTaskBetweenColumns: (task: Task, fromColumn: string, toColumn: string) => void;
	moveTaskToSidebar: (task: Task, fromColumn: string) => void;
	clearDragState: () => void;
}

const initialSidebarTasks: Task[] = [
	{ id: "sidebar-1", title: "New Feature", description: "Implement new feature" },
	{ id: "sidebar-2", title: "Bug Fix", description: "Fix critical bug" },
	{ id: "sidebar-3", title: "Documentation", description: "Update docs" },
	{ id: "sidebar-4", title: "Code Review", description: "Review PR #123" },
];

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
		tasks: [{ id: "3", title: "Task 3", description: "Description for task 3" }],
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

export const useNativeKanbanStore = create<NativeKanbanStore>((set) => ({
	sidebarTasks: initialSidebarTasks,
	columns: initialColumns,
	draggedTask: null,
	dragSource: null,
	sidebarHighlight: false,
	highlightedColumn: null,

	setDraggedTask: (task) => set({ draggedTask: task }),
	setDragSource: (source) => set({ dragSource: source }),
	setSidebarHighlight: (highlight) => set({ sidebarHighlight: highlight }),
	setHighlightedColumn: (columnId) => set({ highlightedColumn: columnId }),

	moveTaskToColumn: (task, columnId) =>
		set((state) => ({
			sidebarTasks: state.sidebarTasks.filter((t) => t.id !== task.id),
			columns: state.columns.map((col) =>
				col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
			),
		})),

	moveTaskBetweenColumns: (task, fromColumn, toColumn) =>
		set((state) => ({
			columns: state.columns.map((col) => {
				if (col.id === fromColumn) {
					return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
				}
				if (col.id === toColumn) {
					return { ...col, tasks: [...col.tasks, task] };
				}
				return col;
			}),
		})),

	moveTaskToSidebar: (task, fromColumn) =>
		set((state) => ({
			columns: state.columns.map((col) =>
				col.id === fromColumn
					? { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) }
					: col
			),
			sidebarTasks: [...state.sidebarTasks, task],
		})),

	clearDragState: () =>
		set({
			draggedTask: null,
			dragSource: null,
			sidebarHighlight: false,
			highlightedColumn: null,
		}),
}));
