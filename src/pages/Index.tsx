import { useTasks } from "@/hooks/useTasks";
import { KanbanColumn } from "@/components/KanbanColumn";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { ChatPanel } from "@/components/ChatPanel";
import { LayoutDashboard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const { tasks, loading, addTask, deleteTask, moveTask, fetchTasks } = useTasks();

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border glass-panel sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground">Kanban Board</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchTasks}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <AddTaskDialog onAdd={addTask} taskCount={tasks.length} />
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
        ) : (
          <div className="flex gap-8 flex-col md:flex-row">
            <KanbanColumn
              title="To Do"
              status="todo"
              tasks={todoTasks}
              count={todoTasks.length}
              onDelete={deleteTask}
              onMove={moveTask}
            />
            <KanbanColumn
              title="In Progress"
              status="in_progress"
              tasks={inProgressTasks}
              count={inProgressTasks.length}
              onDelete={deleteTask}
              onMove={moveTask}
            />
          </div>
        )}
      </main>

      {/* AI Chat */}
      <ChatPanel />
    </div>
  );
};

export default Index;
