"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TodoFilters } from "@/components/TodoFilters";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";
import type { Todo } from "@/types/todo";

export function TodoApp() {
  const { theme, toggleTheme } = useTheme();
  const {
    todos,
    visibleTodos,
    filter,
    ready,
    completedCount,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    clearAll,
    setFilter,
  } = useTodos();
  const [pendingDelete, setPendingDelete] = useState<Todo | null>(null);

  return (
    <main className="todo-page">
      <div className="todo-page__header">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <h1 className="todo-page__title">Axio</h1>

      <TodoForm onAdd={addTodo} />

      <TodoFilters
        filter={filter}
        completedCount={completedCount}
        totalCount={todos.length}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        onClearAll={clearAll}
      />

      <TodoList
        todos={visibleTodos}
        ready={ready}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDeleteRequest={setPendingDelete}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete task?"
        message={
          pendingDelete
            ? `This will permanently delete "${pendingDelete.text}".`
            : ""
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteTodo(pendingDelete.id);
          }
          setPendingDelete(null);
        }}
      />
    </main>
  );
}
