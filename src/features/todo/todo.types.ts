import { z } from 'zod';

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
  addTodo: (data: TodoFormData) => void;
  description?: string;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export type TodoItemsProps = {
  todo: Todo;
};

export const todoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    { message: 'Due date must be in the future' },
  ),
});

export type TodoFormValues = z.input<typeof todoSchema>;
export type TodoFormData = z.output<typeof todoSchema>;
