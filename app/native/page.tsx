"use client";

import { NativeSidebar } from "@/components/native/native-sidebar";
import { NativeBoard } from "@/components/native/native-board";
import { NativeHeader } from "@/components/native/native-header";

export default function NativePage() {
	return (
		<div className="flex h-screen bg-background">
			<NativeSidebar />

			<div className="flex-1 overflow-auto">
				<div className="p-8">
					<NativeHeader />
					<p className="text-sm text-muted-foreground mb-8">
						100% Native HTML5 Drag & Drop - No libraries needed!
					</p>
					<NativeBoard />
				</div>
			</div>
		</div>
	);
}
