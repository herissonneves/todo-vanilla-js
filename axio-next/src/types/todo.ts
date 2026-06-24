export type TodoId = string;

export type Todo = {
  id: TodoId;
  text: string;
  completed: boolean;
  createdAt: string;
};

export type TodoFilter = "all" | "active" | "completed";
