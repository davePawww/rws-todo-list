import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { format } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { UpdateTodo } from '@/features/todo/components/update-todo';
import { useTodoStore } from '@/features/todo/todo.store';

describe('UpdateTodo', () => {
  const seedTodo = {
    id: '1',
    title: 'Write tests',
    description: 'Cover dialog behavior',
    completed: false,
    priority: 'medium' as const,
    dueDate: new Date(2099, 0, 10),
  };

  function renderComponent() {
    render(<UpdateTodo todo={useTodoStore.getState().todos[0]} />);
  }

  function openDialog() {
    fireEvent.click(screen.getByRole('button', { name: /update todo/i }));
  }

  beforeEach(() => {
    localStorage.clear();

    useTodoStore.setState({
      todos: [seedTodo],
      filter: 'all',
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('pre-populates the form with the current todo values', () => {
    renderComponent();
    openDialog();

    expect(screen.getByRole('heading', { name: /update todo item/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('Write tests');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Cover dialog behavior');
    expect(screen.getByRole('combobox')).toHaveTextContent('Medium');
    expect(
      screen.getByRole('button', { name: format(seedTodo.dueDate, 'PPP') }),
    ).toBeInTheDocument();
  });

  it('updates the todo title, description, priority and due date', async () => {
    const targetDate = new Date(2099, 0, 15);
    renderComponent();
    openDialog();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Write better tests' } });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: ' Cover more tests' },
    });

    const prioritySelect = screen.getByRole('combobox');
    fireEvent.click(prioritySelect);
    fireEvent.click(screen.getByRole('option', { name: /high/i }));
    expect(prioritySelect).toHaveTextContent('High');

    fireEvent.click(screen.getByRole('button', { name: format(seedTodo.dueDate, 'PPP') }));
    fireEvent.click(
      screen.getByRole('button', { name: new RegExp(format(targetDate, 'PPP'), 'i') }),
    );
    expect(screen.getByRole('button', { name: format(targetDate, 'PPP') })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      const updatedTodo = useTodoStore.getState().todos[0];

      expect(updatedTodo).toMatchObject({
        id: '1',
        title: 'Write better tests',
        description: 'Cover more tests',
        completed: false,
        priority: 'high',
      });

      expect(updatedTodo.dueDate.getTime()).toBe(targetDate.getTime());
    });

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /update todo item/i })).not.toBeInTheDocument();
    });
  });

  it('shows a validation error and does not update when title is empty', async () => {
    renderComponent();
    openDialog();

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(useTodoStore.getState().todos[0]).toMatchObject(seedTodo);
  });

  it('resets unsaved changes when the dialog is canceled', () => {
    const changedDate = new Date(2099, 0, 15);

    renderComponent();
    openDialog();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Unsaved title' } });

    const prioritySelect = screen.getByRole('combobox');
    fireEvent.click(prioritySelect);
    fireEvent.click(screen.getByRole('option', { name: /low/i }));

    fireEvent.click(screen.getByRole('button', { name: format(seedTodo.dueDate, 'PPP') }));
    fireEvent.click(
      screen.getByRole('button', {
        name: new RegExp(format(changedDate, 'PPP'), 'i'),
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    openDialog();

    expect(screen.getByLabelText(/title/i)).toHaveValue('Write tests');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Cover dialog behavior');
    expect(screen.getByRole('combobox')).toHaveTextContent('Medium');
    expect(
      screen.getByRole('button', { name: format(seedTodo.dueDate, 'PPP') }),
    ).toBeInTheDocument();
  });
});
