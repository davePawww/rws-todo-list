import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { TodoFilter } from '@/features/todo/todo-filter';
import { useTodoStore } from '@/features/todo/todo.store';

describe('TodoFilter', () => {
  beforeEach(() => {
    localStorage.clear();

    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Write tests',
          description: 'Cover the todo filter',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2099-01-10'),
        },
        {
          id: '2',
          title: 'Ship feature',
          description: 'Deploy to production',
          completed: true,
          priority: 'high',
          dueDate: new Date('2099-01-11'),
        },
      ],
      filter: 'all',
    });
  });

  it('shows the number of remaining todos', () => {
    render(<TodoFilter />);

    expect(screen.getByText('Remaining todos: 1')).toBeInTheDocument();
  });

  it('updates the selected filter in the store when a filter is clicked', () => {
    render(<TodoFilter />);

    const activeFilter = screen.getAllByRole('radio', { name: /active/i })[0];
    const completedFilter = screen.getAllByRole('radio', { name: /completed/i })[0];
    const allFilter = screen.getAllByRole('radio', { name: /^all$/i })[0];

    fireEvent.click(activeFilter);
    expect(useTodoStore.getState().filter).toBe('active');
    expect(activeFilter).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(completedFilter);
    expect(useTodoStore.getState().filter).toBe('completed');
    expect(completedFilter).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(allFilter);
    expect(useTodoStore.getState().filter).toBe('all');
    expect(allFilter).toHaveAttribute('aria-checked', 'true');
  });
});
