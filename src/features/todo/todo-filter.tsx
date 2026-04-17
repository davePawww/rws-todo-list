import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTodoStore } from '@/features/todo/todo.store';
import { capitalizeFirstLetter } from '@/utils/global-utils';

const filters = ['all', 'active', 'completed'] as const;

export function TodoFilter() {
  const todos = useTodoStore((state) => state.todos);
  const setFilter = useTodoStore((state) => state.setFilter);
  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <>
      <ToggleGroup variant="outline" type="single" defaultValue="all" aria-label="Todo filters">
        {filters.map((f) => (
          <ToggleGroupItem key={f} value={f} onClick={() => setFilter(f)}>
            {capitalizeFirstLetter(f)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className="text-sm opacity-50">Remaining todos: {remainingCount}</p>
    </>
  );
}
