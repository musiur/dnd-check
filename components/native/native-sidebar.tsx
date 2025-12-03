"use client";

import { useNativeKanbanStore } from "@/lib/native-store";
import { useNativeDrag } from "@/hooks/use-native-drag";
import { NativeCard } from "./native-card";

export function NativeSidebar() {
	const { sidebarTasks, sidebarHighlight, setSidebarHighlight } =
		useNativeKanbanStore();
	const { handleSidebarDragStart, handleSidebarDrop, handleDragEnd } =
		useNativeDrag();

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		setSidebarHighlight(true);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setSidebarHighlight(false);
		handleSidebarDrop();
	};

	const handleDragLeave = () => {
		setSidebarHighlight(false);
	};

	return (
		<div
			className={`w-80 border-r p-6 overflow-y-auto transition-colors ${
				sidebarHighlight ? "bg-primary/10 border-primary" : "bg-muted/30"
			}`}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragLeave={handleDragLeave}
		>
			<h2 className="text-xl font-bold mb-2">Available Tasks</h2>
			<p className="text-xs text-muted-foreground mb-4">
				Pure Native HTML5 Drag & Drop
			</p>

			<div className="space-y-3">
				{sidebarTasks.map((task) => (
					<NativeCard
						key={task.id}
						task={task}
						onDragStart={(e) => handleSidebarDragStart(e, task)}
						onDragEnd={handleDragEnd}
					/>
				))}

				{sidebarTasks.length === 0 && (
					<div className="text-sm text-muted-foreground text-center py-8 border-2 border-dashed rounded-lg">
						<p className="mb-2">All tasks on the board</p>
						<p className="text-xs">Drag cards back here</p>
					</div>
				)}
			</div>
		</div>
	);
}
