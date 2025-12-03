import { KanbanBoard } from "@/components/kanban-board";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

const HomePage = () => {
	return (
		<div className="flex h-screen bg-background">
			<Sidebar />
			<div className="flex-1 overflow-auto">
				<div className="p-8">
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-3xl font-bold">Kanban Board (Hybrid)</h1>
						<Link
							href="/native"
							className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
						>
							View Native Version →
						</Link>
					</div>
					<p className="text-sm text-muted-foreground mb-8">
						Hybrid approach: Native HTML5 + DND-KIT for enhanced UX
					</p>
					<KanbanBoard />
				</div>
			</div>
		</div>
	);
};

export default HomePage;