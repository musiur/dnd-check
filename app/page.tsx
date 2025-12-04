import { KanbanBoard } from "@/components/kanban-board";
import { Sidebar } from "@/components/sidebar";
import { GitHubBanner } from "@/components/github-banner";
import Link from "next/link";
import ProgressLink from "@/components/progress-link";

const HomePage = () => {
	return (
		<div className="flex flex-col h-screen bg-background">
			<GitHubBanner />
			<div className="flex flex-1 overflow-hidden">
				<Sidebar />
				<div className="flex-1 overflow-auto">
					<div className="p-8">
						<div className="flex items-center justify-between mb-2">
							<h1 className="text-3xl font-bold">Kanban Board (Hybrid)</h1>
							<ProgressLink
								href="/native"
								className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
							>
								View Native Version →
							</ProgressLink>
						</div>
						<p className="text-sm text-muted-foreground mb-8">
							Hybrid approach: Native HTML5 + DND-KIT for enhanced UX
						</p>
						<KanbanBoard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;