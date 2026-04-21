import type { Meta, StoryObj } from '@storybook/react-vite';

import { TodoFilter } from '@/features/todo/components/todo-filter';

const meta = {
  title: 'TodoFilter',
  component: TodoFilter,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TodoFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
