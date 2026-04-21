import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { AddTodo } from '@/features/todo/add-todo';
import { useTodoStore } from '@/features/todo/todo.store';

describe('AddTodo', () => {
  beforeEach(() => {
    localStorage.clear();

    useTodoStore.setState({
      todos: [],
      filter: 'all',
    });
  });

  it('adds a new todo when the form is submitted with valid data', async () => {
    render(<AddTodo />);

    fireEvent.click(screen.getAllByRole('button', { name: /create a new todo/i })[0]);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Todo' },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test todo item' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(useTodoStore.getState().todos).toHaveLength(1);
    });

    const [todo] = useTodoStore.getState().todos;

    expect(todo).toMatchObject({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
      priority: 'medium',
    });

    expect(todo.dueDate).toBeInstanceOf(Date);

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /creating a new todo item/i }),
      ).not.toBeInTheDocument();
    });
  });

  it('shows a validation error and does not add a todo when title is empty', async () => {
    render(<AddTodo />);

    fireEvent.click(screen.getAllByRole('button', { name: /create a new todo/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(useTodoStore.getState().todos).toHaveLength(0);
  });
});
