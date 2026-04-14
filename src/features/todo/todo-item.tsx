import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/features/todo/todo.store';
import type { TodoItemsProps } from '@/features/todo/todo.types';
import { cn } from '@/lib/utils';

export default function TodoItem({ todo }: TodoItemsProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="flex items-center gap-2">
      <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
      <p className={cn('flex-1 text-sm', todo.completed && 'line-through opacity-30')}>
        {todo.title}
      </p>
      <Button size="icon-sm" variant={'destructive'} onClick={() => deleteTodo(todo.id)}>
        <Trash />
      </Button>
    </li>
  );
}
