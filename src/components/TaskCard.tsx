import { motion } from "framer-motion";
import { Trash2, GripVertical } from "lucide-react";
import type { Task, Status } from "@/hooks/useTasks";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
}

const priorityClass: Record<string, string> = {
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

export function TaskCard({ task, onDelete, onMove }: TaskCardProps) {
  const targetStatus: Status = task.status === "todo" ? "in_progress" : "todo";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      draggable
      onDragEnd={() => onMove(task.id, targetStatus)}
      className="glass-panel rounded-lg p-4 cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-opacity">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-sm text-foreground truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityClass[task.priority]}`}
        >
          {task.priority}
        </span>
        {task.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[10px] px-2 py-0 h-5 bg-secondary/50 text-secondary-foreground border-none"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <button
        onClick={() => onMove(task.id, targetStatus)}
        className="mt-3 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
      >
        Move to {task.status === "todo" ? "In Progress" : "To Do"} →
      </button>
    </motion.div>
  );
}
