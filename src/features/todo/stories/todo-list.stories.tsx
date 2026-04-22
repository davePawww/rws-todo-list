import type { Meta, StoryObj } from '@storybook/react-vite';

import { TodoList } from '@/features/todo/components/todo-list';
import { useTodoStore } from '@/features/todo/todo.store';

const meta = {
  title: 'Todo/TodoList',
  component: TodoList,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => {
    useTodoStore.setState({ todos: [], filter: 'all' });
    return <TodoList {...args} />;
  },
};

export const WithActiveTodos: Story = {
  render: () => {
    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Learn Storybook',
          completed: false,
          priority: 'high',
          dueDate: new Date(),
        },
        {
          id: '2',
          title: 'Write tests',
          completed: false,
          priority: 'medium',
          dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Write more tests',
          completed: false,
          priority: 'medium',
          dueDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        },
      ],
      filter: 'active',
    });
    return <TodoList />;
  },
};
export const WithCompletedTodos: Story = {
  render: () => {
    useTodoStore.setState({
      todos: [
        {
          id: '1',
          title: 'Deploy app',
          completed: true,
          priority: 'high',
          dueDate: new Date(),
        },
        {
          id: '2',
          title: 'Refactor code',
          completed: true,
          priority: 'medium',
          dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Write more tests',
          completed: true,
          priority: 'medium',
          dueDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        },
      ],
      filter: 'completed',
    });
    return <TodoList />;
  },
};
