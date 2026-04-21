import type { Meta, StoryObj } from '@storybook/react-vite';

import TodoItem from '@/features/todo/components/todo-item';

const meta = {
  title: 'TodoItem',
  component: TodoItem,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <ul className="m-0 list-none p-0">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Go to the gym',
      completed: false,
      priority: 'low',
      dueDate: new Date(),
    },
  },
};

export const Completed: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Go to the gym',
      completed: true,
      priority: 'low',
      dueDate: new Date(),
    },
  },
};
