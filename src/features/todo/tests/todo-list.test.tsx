import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { TodoList } from '@/features/todo/components/todo-list';
import { useTodoStore } from '@/features/todo/todo.store';

describe('TodoList', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    localStorage.clear();

    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Write tests',
          description: 'Cover filtering behavior',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2099-01-10'),
        },
        {
          id: '2',
          title: 'Deploy app',
          description: 'Ship the release',
          completed: true,
          priority: 'high',
          dueDate: new Date('2099-01-11'),
        },
      ],
      filter: 'all',
    });
  });

  it('renders all todos when the filter is all', () => {
    render(<TodoList />);

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy app')).toBeInTheDocument();
  });

  it('renders only active todos when the filter is active', () => {
    useTodoStore.setState({ filter: 'active' });

    render(<TodoList />);

    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Deploy app')).not.toBeInTheDocument();
  });

  it('renders only completed todos when the filter is completed', () => {
    useTodoStore.setState({ filter: 'completed' });

    render(<TodoList />);

    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    expect(screen.getByText('Deploy app')).toBeInTheDocument();
  });

  it('shows the empty message when there are no todos', () => {
    useTodoStore.setState({
      todos: [],
      filter: 'all',
    });

    render(<TodoList />);

    expect(
      screen.getByText('Your todo list is empty. Add some tasks to get started! 📝'),
    ).toBeInTheDocument();
  });

  it('shows the active empty-state message when there are no active todos', () => {
    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Deploy app',
          description: 'Ship the release',
          completed: true,
          priority: 'high',
          dueDate: new Date('2099-01-11'),
        },
      ],
      filter: 'active',
    });

    render(<TodoList />);

    expect(screen.getByText('No active todos. Time to relax! 🎉')).toBeInTheDocument();
  });

  it('shows the completed empty-state message when there are no completed todos', () => {
    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Write tests',
          description: 'Cover filtering behavior',
          completed: false,
          priority: 'medium',
          dueDate: new Date('2099-01-10'),
        },
      ],
      filter: 'completed',
    });

    render(<TodoList />);

    expect(screen.getByText('No completed todos yet. Keep going! 💪')).toBeInTheDocument();
  });
});
