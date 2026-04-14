import TodoItem from '@/features/todo/todo-item';
import { useTodoStore } from '@/features/todo/todo.store';

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div>
      {todos.length === 0 && <p className="text-xs">No todos yet</p>}
      <ul className="my-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
