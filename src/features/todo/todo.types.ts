export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggle: (id: string) => void;
};

export type TodoItemsProps = {
  todo: Todo;
};
