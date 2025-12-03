import { useNativeKanbanStore, type Task } from "@/lib/native-store";

export function useNativeDrag() {
	const {
		draggedTask,
		dragSource,
		setDraggedTask,
		setDragSource,
		moveTaskToColumn,
		moveTaskBetweenColumns,
		moveTaskToSidebar,
		clearDragState,
	} = useNativeKanbanStore();

	const handleSidebarDragStart = (e: React.DragEvent, task: Task) => {
		setDraggedTask(task);
		setDragSource("sidebar");
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", task.id);
	};

	const handleKanbanDragStart = (
		e: React.DragEvent,
		task: Task,
		columnId: string
	) => {
		setDraggedTask(task);
		setDragSource(columnId);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", task.id);
	};

	const handleColumnDrop = (targetColumnId: string) => {
		if (!draggedTask || !dragSource) return;

		if (dragSource === "sidebar") {
			moveTaskToColumn(draggedTask, targetColumnId);
		} else if (dragSource !== targetColumnId) {
			moveTaskBetweenColumns(draggedTask, dragSource, targetColumnId);
		}

		clearDragState();
	};

	const handleSidebarDrop = () => {
		if (!draggedTask || !dragSource || dragSource === "sidebar") return;

		moveTaskToSidebar(draggedTask, dragSource);
		clearDragState();
	};

	const handleDragEnd = () => {
		clearDragState();
	};

	return {
		handleSidebarDragStart,
		handleKanbanDragStart,
		handleColumnDrop,
		handleSidebarDrop,
		handleDragEnd,
	};
}
