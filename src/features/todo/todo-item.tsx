import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/features/todo/todo.store';
import type { TodoItemsProps } from '@/features/todo/todo.types';
import { cn } from '@/lib/utils';
import { capitalizeFirstLetter, getDueDateLabel } from '@/utils/global-utils';

export default function TodoItem({ todo }: TodoItemsProps) {
  const [onHover, setOnHover] = useState(false);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li
      className="flex h-26 flex-col gap-1 rounded-md border p-2 shadow shadow-teal-500/30"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className="flex items-center gap-2">
        <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
        <p className={cn('truncate text-sm', todo.completed && 'line-through opacity-30')}>
          {todo.title}
        </p>
      </div>

      <p className="line-clamp-2 min-h-0 flex-1 overflow-hidden text-xs font-light opacity-60">
        {todo.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-0.5">
          <Badge
            variant={getDueDateLabel(todo.dueDate) === 'Expired' ? 'destructive' : 'secondary'}
            className="text-[.6rem] font-light"
          >
            {getDueDateLabel(todo.dueDate)}
          </Badge>
          <Badge
            variant={todo.priority === 'high' ? 'destructive' : 'outline'}
            className="text-[.6rem] font-light"
          >
            {capitalizeFirstLetter(todo.priority)}
          </Badge>
        </div>

        <div className="flex h-6 items-center space-x-0.5">
          {onHover && (
            <>
              <Button size="icon-xs" variant={'secondary'}>
                <Pencil />
              </Button>
              <Button size="icon-xs" variant={'destructive'} onClick={() => deleteTodo(todo.id)}>
                <Trash />
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
