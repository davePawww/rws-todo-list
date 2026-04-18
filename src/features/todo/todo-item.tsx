import { Trash } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldLabel, FieldDescription } from '@/components/ui/field';
import { useTodoStore } from '@/features/todo/todo.store';
import type { TodoItemsProps } from '@/features/todo/todo.types';
import { UpdateTodo } from '@/features/todo/update-todo';
import { capitalizeFirstLetter, getDueDateLabel } from '@/utils/global-utils';

export default function TodoItem({ todo }: TodoItemsProps) {
  const [onHover, setOnHover] = useState(false);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li
      className="flex min-h-26 flex-col gap-1 rounded-md border p-2 shadow shadow-teal-500/30"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Field orientation="horizontal">
        <Checkbox
          id={`todo-checkbox-${todo.id}`}
          name={`todo-checkbox-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />
        <FieldContent>
          <FieldLabel
            htmlFor={`todo-checkbox-${todo.id}`}
            className={todo.completed ? 'text-muted-foreground line-through' : ''}
          >
            {todo.title}
          </FieldLabel>
          <FieldDescription
            className={`line-clamp-2 leading-5 ${todo.completed ? 'text-muted-foreground line-through' : ''}`}
          >
            {todo.description}
          </FieldDescription>
        </FieldContent>
      </Field>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center space-x-0.5">
          <Badge
            variant={getDueDateLabel(todo.dueDate) === 'Expired' ? 'destructive' : 'secondary'}
            className="text-xs font-light"
          >
            {getDueDateLabel(todo.dueDate)}
          </Badge>
          <Badge
            variant={todo.priority === 'high' ? 'destructive' : 'outline'}
            className="text-xs font-light"
          >
            {capitalizeFirstLetter(todo.priority)}
          </Badge>
        </div>

        <div className="flex h-6 items-center space-x-0.5">
          {onHover && (
            <>
              <UpdateTodo todo={todo} />
              <Button size="icon-sm" variant={'destructive'} onClick={() => deleteTodo(todo.id)}>
                <Trash />
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
