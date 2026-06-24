"use client";

import { FormEvent, useRef, useState } from "react";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="todo-page__form todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__input-wrapper">
        <label className="todo-form__label visually-hidden" htmlFor="todo-input">
          Task description
        </label>
        <input
          ref={inputRef}
          id="todo-input"
          className="todo-form__input"
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="todo-form__button-wrapper">
        <button className="todo-form__button" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
}
