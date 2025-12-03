"use client";

import type { Task } from "@/lib/native-store";

interface NativeCardProps {
	task: Task;
	onDragStart: (e: React.DragEvent) => void;
	onDragEnd: () => void;
}

export function NativeCard({ task, onDragStart, onDragEnd }: NativeCardProps) {
	return (
		<div
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			className="bg-card border rounded-lg p-4 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
		>
			<h4 className="font-medium mb-1">{task.title}</h4>
			<p className="text-sm text-muted-foreground">{task.description}</p>
		</div>
	);
}
