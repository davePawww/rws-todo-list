export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export type TodoStore = {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export type TodoItemsProps = {
  todo: Todo;
};
