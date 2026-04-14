import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useTodoStore } from '@/features/todo/todo.store';

const filters = ['all', 'active', 'completed'] as const;

export function TodoFilter() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <ButtonGroup className="my-2">
      {filters.map((f) => (
        <Button
          key={f}
          variant={filter === f ? 'outline' : 'secondary'}
          size="sm"
          onClick={() => setFilter(f)}
        >
          {f}
        </Button>
      ))}
    </ButtonGroup>
  );
}
