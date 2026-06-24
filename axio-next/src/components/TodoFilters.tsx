"use client";

import type { TodoFilter } from "@/types/todo";

const labels: Record<TodoFilter, string> = {
  all: "All",
  active: "Active",
  completed: "Completed",
};

type TodoFiltersProps = {
  filter: TodoFilter;
  completedCount: number;
  totalCount: number;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
};

export function TodoFilters({
  filter,
  completedCount,
  totalCount,
  onFilterChange,
  onClearCompleted,
  onClearAll,
}: TodoFiltersProps) {
  const filters = Object.keys(labels) as TodoFilter[];

  return (
    <section className="todo-page__filters">
      <nav className="todo-filters" aria-label="Task filters">
        {filters.map((item) => {
          const active = filter === item;

          return (
            <div className="todo-filters__button-wrapper" key={item}>
              <button
                className={`todo-filters__button${active ? " todo-filters__button--active" : ""}`}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(item)}
              >
                {active ? (
                  <span className="todo-filters__button-icon-wrapper" aria-hidden="true">
                    <svg
                      className="todo-filters__check-icon"
                      width="13"
                      height="10"
                      viewBox="0 0 13 10"
                    >
                      <path d="M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1563 0L12.225 1.06875L4.275 9.01875Z" />
                    </svg>
                  </span>
                ) : null}
                {labels[item]}
              </button>
            </div>
          );
        })}
      </nav>

      <div className="todo-clear">
        <button
          className="todo-clear__button"
          type="button"
          disabled={completedCount === 0}
          onClick={onClearCompleted}
        >
          Clear Completed
        </button>
        <button
          className="todo-clear__button"
          type="button"
          disabled={totalCount === 0}
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>
    </section>
  );
}
