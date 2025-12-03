"use client";

import { useNativeKanbanStore } from "@/lib/native-store";
import { NativeColumn } from "./native-column";

export function NativeBoard() {
	const { columns } = useNativeKanbanStore();

	return (
		<div className="flex gap-6">
			{columns.map((column) => (
				<NativeColumn key={column.id} column={column} />
			))}
		</div>
	);
}
