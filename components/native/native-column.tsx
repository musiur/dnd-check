"use client";

import { useNativeKanbanStore, type Column } from "@/lib/native-store";
import { useNativeDrag } from "@/hooks/use-native-drag";
import { NativeCard } from "./native-card";

interface NativeColumnProps {
	column: Column;
}

export function NativeColumn({ column }: NativeColumnProps) {
	const { highlightedColumn, setHighlightedColumn } = useNativeKanbanStore();
	const { handleKanbanDragStart, handleColumnDrop, handleDragEnd } =
		useNativeDrag();

	const isHighlighted = highlightedColumn === column.id;

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		setHighlightedColumn(column.id);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setHighlightedColumn(null);
		handleColumnDrop(column.id);
	};

	const handleDragLeave = () => {
		setHighlightedColumn(null);
	};

	return (
		<div
			className={`flex flex-col w-80 rounded-lg p-4 transition-colors ${
				isHighlighted
					? "bg-primary/10 border-2 border-primary"
					: "bg-muted/50 border-2 border-transparent"
			}`}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragLeave={handleDragLeave}
		>
			<h3 className="font-semibold text-lg mb-4">{column.title}</h3>

			<div className="flex flex-col gap-3 min-h-[200px]">
				{column.tasks.map((task) => (
					<NativeCard
						key={task.id}
						task={task}
						onDragStart={(e) => handleKanbanDragStart(e, task, column.id)}
						onDragEnd={handleDragEnd}
					/>
				))}
			</div>
		</div>
	);
}
