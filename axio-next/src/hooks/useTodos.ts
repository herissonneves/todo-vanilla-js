"use client";

import { useCallback, useMemo, useState } from "react";
import { TODO_STORAGE_KEY } from "@/lib/storage";
import { createTodo, filterTodos, migrateTodo } from "@/lib/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Todo, TodoFilter, TodoId } from "@/types/todo";

function parseTodos(value: unknown): Todo[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const todo = migrateTodo(item);
    return todo ? [todo] : [];
  });
}

export function useTodos() {
  const [todos, setTodos, ready] = useLocalStorage<Todo[]>(
    TODO_STORAGE_KEY,
    [],
    parseTodos,
  );
  const [filter, setFilter] = useState<TodoFilter>("all");

  const visibleTodos = useMemo(() => filterTodos(todos, filter), [filter, todos]);
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      setTodos((current) => [...current, createTodo(trimmed)]);
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id: TodoId) => {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const updateTodo = useCallback(
    (id: TodoId, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, text: trimmed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: TodoId) => {
      setTodos((current) => current.filter((todo) => todo.id !== id));
    },
    [setTodos],
  );

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed));
    setFilter((current) => (current === "completed" ? "all" : current));
  }, [setTodos]);

  const clearAll = useCallback(() => {
    setTodos([]);
    setFilter("all");
  }, [setTodos]);

  return {
    todos,
    visibleTodos,
    filter,
    ready,
    completedCount,
    activeCount: todos.length - completedCount,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    clearAll,
    setFilter,
  };
}
