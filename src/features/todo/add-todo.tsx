import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('');

  // TODO: Clear input after adding, Save new Todo

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
      <Button size="icon" onClick={() => console.log(newTodo)}>
        <PlusIcon />
      </Button>
    </div>
  );
}
