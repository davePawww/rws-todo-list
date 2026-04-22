import type { Meta, StoryObj } from '@storybook/react-vite';

import { UpdateTodo } from '@/features/todo/components/update-todo';

const meta = {
  title: 'Todo/UpdateTodo',
  component: UpdateTodo,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof UpdateTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Go to the gym',
      completed: false,
      priority: 'low',
      dueDate: new Date(),
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-valid-attr-value', enabled: false }],
      },
    },
  },
};
