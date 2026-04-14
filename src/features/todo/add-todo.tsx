import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodoStore } from '@/features/todo/todo.store';

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="What do you need to do?"
        className="text-xs placeholder:text-xs"
        aria-label="Add Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button size="icon" onClick={() => addTodo(newTodo)}>
        <PlusIcon />
      </Button>
    </div>
  );
}
