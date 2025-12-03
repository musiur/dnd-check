"use client";

import { NativeSidebar } from "@/components/native/native-sidebar";
import { NativeBoard } from "@/components/native/native-board";
import { NativeHeader } from "@/components/native/native-header";
import { GitHubBanner } from "@/components/github-banner";

export default function NativePage() {
	return (
		<div className="flex flex-col h-screen bg-background">
			<GitHubBanner />
			<div className="flex flex-1 overflow-hidden">
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
		</div>
	);
}
