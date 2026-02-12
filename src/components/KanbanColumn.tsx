import { AnimatePresence } from "framer-motion";
import type { Task, Status } from "@/hooks/useTasks";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  count: number;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
}

const statusColors: Record<Status, string> = {
  todo: "bg-primary/20 text-primary",
  in_progress: "bg-priority-medium/20 text-priority-medium",
};

export function KanbanColumn({ title, status, tasks, count, onDelete, onMove }: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-[320px] max-w-[500px]">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="font-heading font-bold text-lg text-foreground">{title}</h2>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[status]}`}
        >
          {count}
        </span>
      </div>

      <div className="space-y-3 kanban-scrollbar overflow-y-auto max-h-[calc(100vh-240px)] pr-1">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} onMove={onMove} />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="glass-panel rounded-lg p-8 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
