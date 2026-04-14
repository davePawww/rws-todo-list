import type { Meta, StoryObj } from '@storybook/react-vite';

import Header from '@/components/layout/header';

const meta = {
  title: 'Header',
  component: Header,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '00-Project-X',
    projectLink: 'https://github.com/davePawww',
  },
};
