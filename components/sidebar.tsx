"use client";

import { useKanbanStore, type Task } from "@/lib/store";
import { useState } from "react";

export function Sidebar() {
  const { sidebarTasks, columns, addTaskToColumn } = useKanbanStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    e.dataTransfer.setData("source", "sidebar");
  };

  // Handle drops from Kanban back to sidebar
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskData = e.dataTransfer.getData("application/json");
    const source = e.dataTransfer.getData("source");
    
    if (taskData && source === "kanban") {
      const task: Task = JSON.parse(taskData);
      
      // Remove from all columns and add back to sidebar
      const newColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== task.id),
      }));
      
      // Update store
      useKanbanStore.setState({
        columns: newColumns,
        sidebarTasks: [...sidebarTasks, task],
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className={`w-80 bg-muted/30 border-r p-6 h-screen overflow-y-auto transition-colors ${
        isDragOver ? "bg-primary/10 border-primary" : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-xl font-bold mb-6">Available Tasks</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Drag tasks to the board or drag them back here
      </p>
      <div className="space-y-3">
        {sidebarTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            className="bg-card border rounded-lg p-4 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <h4 className="font-medium mb-1">{task.title}</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        ))}
        {sidebarTasks.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-8 border-2 border-dashed rounded-lg">
            <p className="mb-2">All tasks on the board</p>
            <p className="text-xs">Drag cards back here to remove them</p>
          </div>
        )}
      </div>
    </div>
  );
}
