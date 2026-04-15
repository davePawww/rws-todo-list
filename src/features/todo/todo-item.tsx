import { Pencil, Trash } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodoStore } from '@/features/todo/todo.store';
import type { TodoItemsProps } from '@/features/todo/todo.types';
import { cn } from '@/lib/utils';

export default function TodoItem({ todo }: TodoItemsProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="flex h-24 items-stretch gap-2 rounded-md border p-2 shadow shadow-teal-500/30">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="mt-1 shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p
          className={cn(
            'truncate text-sm font-medium',
            todo.completed && 'line-through opacity-30',
          )}
        >
          {todo.title}
        </p>
        <p className="line-clamp-2 min-h-0 flex-1 overflow-hidden text-xs opacity-60">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. OptioLorem, ipsum dolor sit amet
          consectetur adipisicing elit. OptioLorem, ipsum dolor sit amet consectetur adipisicing
          elit. Optio
        </p>
        <div className="flex items-center justify-between">
          <div className="space-x-1">
            <Badge variant="secondary" className="text-[.6rem] font-light">
              Secondary
            </Badge>
            <Badge variant="outline" className="text-[.6rem] font-light">
              Outline
            </Badge>
          </div>
          <div className="space-x-0.5">
            <Button size="icon-xs" variant={'secondary'}>
              <Pencil />
            </Button>
            <Button size="icon-xs" variant={'destructive'} onClick={() => deleteTodo(todo.id)}>
              <Trash />
            </Button>
          </div>
        </div>
      </div>

      {/* <Button size="icon-sm" variant={'destructive'} onClick={() => deleteTodo(todo.id)}>
        <Trash />
      </Button> */}
    </li>
  );
}
