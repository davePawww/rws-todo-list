import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/features/todo/todo.store';
import type { TodoItemsProps } from '@/features/todo/todo.types';
import { cn } from '@/lib/utils';

export default function TodoItem({ todo }: TodoItemsProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  return (
    <li className="flex gap-2">
      <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
      <p className={cn('flex-1 text-xs', todo.completed && 'line-through opacity-30')}>
        {todo.title}
      </p>
    </li>
  );
}
