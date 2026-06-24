"use client";

import { useEffect } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="todo-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <button className="todo-dialog__overlay" type="button" aria-label="Close dialog" onClick={onCancel} />
      <div className="todo-dialog__container">
        <h2 className="todo-dialog__title" id="confirm-dialog-title">
          {title}
        </h2>
        <p className="todo-dialog__content">{message}</p>
        <div className="todo-dialog__actions">
          <button
            className="todo-dialog__button todo-dialog__button--secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="todo-dialog__button todo-dialog__button--primary"
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
