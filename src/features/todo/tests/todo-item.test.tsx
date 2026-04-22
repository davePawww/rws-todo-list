import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import TodoItem from '@/features/todo/components/todo-item';
import { useTodoStore } from '@/features/todo/todo.store';

describe('TodoItem', () => {
  beforeEach(() => {
    localStorage.clear();

    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Write tests',
          description: 'Cover checkbox behavior',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2099-01-10'),
        },
        {
          id: '2',
          title: 'Ship release',
          description: 'Deploy production build',
          completed: true,
          priority: 'high',
          dueDate: new Date('2099-01-11'),
        },
      ],
      filter: 'all',
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders an unchecked checkbox for an active todo', () => {
    const todo = useTodoStore.getState().todos[0];

    render(<TodoItem todo={todo} />);

    expect(screen.getByRole('checkbox', { name: /write tests/i })).not.toBeChecked();
  });

  it('renders a checked checkbox for a completed todo', () => {
    const todo = useTodoStore.getState().todos[1];

    render(<TodoItem todo={todo} />);

    expect(screen.getByRole('checkbox', { name: /ship release/i })).toBeChecked();
  });

  it('toggles the todo i nteh store when the checkbox is clicked', () => {
    const todo = useTodoStore.getState().todos[0];

    render(<TodoItem todo={todo} />);

    fireEvent.click(screen.getByRole('checkbox', { name: /write tests/i }));

    expect(useTodoStore.getState().todos[0].completed).toBe(true);
  });

  it('shows the action buttons on hover and deletes the todo', () => {
    const todo = useTodoStore.getState().todos[0];
    const { container } = render(<TodoItem todo={todo} />);

    fireEvent.mouseEnter(container.querySelector('li')!);

    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons[1];

    fireEvent.click(deleteButton);

    expect(useTodoStore.getState().todos).toHaveLength(1);
  });
});
