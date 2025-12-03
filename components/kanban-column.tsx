"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./kanban-card";
import { useKanbanStore, type Column, type Task } from "@/lib/store";

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  
  const addTaskToColumn = useKanbanStore((state) => state.addTaskToColumn);

  // Handle native HTML5 drops (from sidebar)
  const handleNativeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const taskData = e.dataTransfer.getData("application/json");
    const source = e.dataTransfer.getData("source");
    
    if (taskData && source === "sidebar") {
      const task: Task = JSON.parse(taskData);
      addTaskToColumn(task, column.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex flex-col w-80 bg-muted/50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
      <SortableContext
        id={column.id}
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          onDrop={handleNativeDrop}
          onDragOver={handleDragOver}
          className="flex flex-col gap-3 min-h-[200px]"
        >
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
