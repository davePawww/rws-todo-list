import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@/components/ui/input';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'What do you need to do?',
    className: 'w-48 placeholder:text-xs',
  },
};
