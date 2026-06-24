"use client";

import { TodoItem } from "@/components/TodoItem";
import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  ready: boolean;
  onToggle: (id: Todo["id"]) => void;
  onUpdate: (id: Todo["id"], text: string) => void;
  onDeleteRequest: (todo: Todo) => void;
};

export function TodoList({
  todos,
  ready,
  onToggle,
  onUpdate,
  onDeleteRequest,
}: TodoListProps) {
  if (!ready) {
    return <p className="todo-page__empty">Loading tasks...</p>;
  }

  if (todos.length === 0) {
    return <p className="todo-page__empty">No tasks to show.</p>;
  }

  return (
    <ul className="todo-page__list" aria-label="Task list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </ul>
  );
}
