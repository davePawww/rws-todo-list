export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: Date;
  description?: string;
};

export type Priority = 'low' | 'medium' | 'high';

export type TodoFilter = 'all' | 'active' | 'completed';

export type TodoStore = {
  todos: Todo[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string, priority: Priority, dueDate: Date, description?: string) => void;
  description?: string;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export type TodoItemsProps = {
  todo: Todo;
};
