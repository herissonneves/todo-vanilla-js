import type { Todo } from "@/types/todo";
import type { Theme } from "@/types/theme";
import { migrateTodo } from "@/lib/todo";

export const TODO_STORAGE_KEY = "tasks";
export const THEME_STORAGE_KEY = "theme";

export function loadTodos(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.flatMap((item) => {
      const todo = migrateTodo(item);
      return todo ? [todo] : [];
    });
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

export function loadTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

export function saveTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
