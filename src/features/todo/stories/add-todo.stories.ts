import type { Meta, StoryObj } from '@storybook/react-vite';

import { AddTodo } from '@/features/todo/add-todo';

const meta = {
  title: 'AddTodo',
  component: AddTodo,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AddTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    // Suppress storybook accessibility warning
    // This is from shadcn's or Radix's Select/Popover component
    // Storybook cannot resolve the dynamic portal based ids
    a11y: {
      config: {
        rules: [{ id: 'aria-valid-attr-value', enabled: false }],
      },
    },
  },
};
