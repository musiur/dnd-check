"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/lib/store";
import { useEffect, useRef } from "react";

interface KanbanCardProps {
  task: Task;
  isDragging?: boolean;
}

export function KanbanCard({ task, isDragging = false }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const cardRef = useRef<HTMLDivElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  // Native drag handler for dragging back to sidebar or other native drop zones
  const handleNativeDragStart = (e: React.DragEvent) => {
    // Allow native drag to work
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    e.dataTransfer.setData("source", "kanban");
    
    // Create a custom drag image
    if (cardRef.current) {
      const clone = cardRef.current.cloneNode(true) as HTMLElement;
      clone.style.opacity = "0.8";
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone, 0, 0);
      setTimeout(() => document.body.removeChild(clone), 0);
    }
  };

  const handleNativeDragEnd = () => {
    // Cleanup if needed
  };

  // Combine refs
  useEffect(() => {
    if (cardRef.current && setNodeRef) {
      setNodeRef(cardRef.current);
    }
  }, [setNodeRef]);

  return (
    <div
      ref={cardRef}
      style={style}
      {...attributes}
      {...listeners}
      // ⭐ Native drag support for cross-boundary dragging
      draggable="true"
      onDragStart={handleNativeDragStart}
      onDragEnd={handleNativeDragEnd}
      className={`bg-card border rounded-lg p-4 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-primary" : ""
      }`}
    >
      <h4 className="font-medium mb-2">{task.title}</h4>
      <p className="text-sm text-muted-foreground">{task.description}</p>
    </div>
  );
}
