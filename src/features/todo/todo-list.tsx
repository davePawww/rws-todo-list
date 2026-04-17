import TodoItem from '@/features/todo/todo-item';
import { useTodoStore } from '@/features/todo/todo.store';

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      {filteredTodos.length === 0 && (
        <p className="flex items-center justify-center text-sm opacity-30">
          {filter === 'active'
            ? 'No active todos. Time to relax! 🎉'
            : filter === 'completed'
              ? 'No completed todos yet. Keep going! 💪'
              : 'Your todo list is empty. Add some tasks to get started! 📝'}
        </p>
      )}
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
