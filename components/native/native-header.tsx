"use client";

export function NativeHeader() {
	return (
		<div className="flex items-center justify-between mb-2">
			<h1 className="text-3xl font-bold">Native Kanban Board</h1>
			<a
				href="/"
				className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
			>
				← View Hybrid Version
			</a>
		</div>
	);
}
