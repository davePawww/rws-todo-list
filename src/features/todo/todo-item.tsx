import type { TodoItemsProps } from '@/features/todo/todo.types';

export default function TodoItem({ todo }: TodoItemsProps) {
  return <li className="text-xs">{todo.title}</li>;
}
