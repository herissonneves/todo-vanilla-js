"use client";

import { FormEvent, useState } from "react";
import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: Todo["id"]) => void;
  onUpdate: (id: Todo["id"], text: string) => void;
  onDeleteRequest: (todo: Todo) => void;
};

export function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDeleteRequest,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  function commitEdit() {
    const trimmed = text.trim();
    if (!trimmed) {
      setText(todo.text);
      setEditing(false);
      return;
    }

    onUpdate(todo.id, trimmed);
    setEditing(false);
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    commitEdit();
  }

  return (
    <li className="todo-item__container">
      <article className="todo-item">
        <div className="todo-item__checkbox-container">
          <div className="todo-item__checkbox-wrapper">
            <input
              className="todo-item__checkbox"
              type="checkbox"
              checked={todo.completed}
              aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "completed"}`}
              onChange={() => onToggle(todo.id)}
            />
            <span className="todo-item__checkbox-layer" aria-hidden="true">
              <svg className="todo-item__checkbox-icon" viewBox="0 0 12 10">
                <path
                  className="todo-item__checkbox-check"
                  d="M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1563 0L12.225 1.06875L4.275 9.01875Z"
                />
              </svg>
            </span>
          </div>
        </div>

        {editing ? (
          <form className="todo-item__edit-form" onSubmit={handleEditSubmit}>
            <label className="visually-hidden" htmlFor={`edit-${todo.id}`}>
              Edit task
            </label>
            <input
              id={`edit-${todo.id}`}
              className="todo-item__edit-input"
              value={text}
              autoFocus
              onChange={(event) => setText(event.target.value)}
              onBlur={commitEdit}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setText(todo.text);
                  setEditing(false);
                }
              }}
            />
          </form>
        ) : (
          <span
            className={`todo-item__text${todo.completed ? " todo-item__text--completed" : ""}`}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </span>
        )}

        <div className="todo-item__actions">
          <button
            className="todo-item__icon-btn"
            type="button"
            aria-label={`Edit ${todo.text}`}
            onClick={() => setEditing(true)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5 18.08V21h2.92L18.5 10.42 15.58 7.5 5 18.08zM20.71 8.21a1 1 0 000-1.42l-1.5-1.5a1 1 0 00-1.42 0l-1.15 1.15 2.92 2.92 1.15-1.15z"
              />
            </svg>
          </button>
          <button
            className="todo-item__icon-btn todo-item__icon-btn--danger"
            type="button"
            aria-label={`Delete ${todo.text}`}
            onClick={() => onDeleteRequest(todo)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM8 4l1-1h6l1 1h4v2H4V4h4z"
              />
            </svg>
          </button>
        </div>
      </article>
    </li>
  );
}
