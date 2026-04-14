import type { Meta, StoryObj } from '@storybook/react-vite';

import Footer from '@/components/layout/footer';

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
