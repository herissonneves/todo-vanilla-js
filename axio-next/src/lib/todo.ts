import type { Todo, TodoFilter } from "@/types/todo";

export const TODO_FILTERS: TodoFilter[] = ["all", "active", "completed"];

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function migrateTodo(value: unknown): Todo | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Todo> & { id?: string | number };

  if (typeof candidate.text !== "string" || !candidate.text.trim()) {
    return null;
  }

  return {
    id: String(candidate.id ?? crypto.randomUUID()),
    text: candidate.text.trim(),
    completed: Boolean(candidate.completed),
    createdAt:
      typeof candidate.createdAt === "string"
        ? candidate.createdAt
        : new Date().toISOString(),
  };
}

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}
