import type { Meta, StoryObj } from '@storybook/react';
import Portal from '.'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/Portal',
  component: Portal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   value: { control: 'date' },
  //   locale: {
  //     control: 'radio',
  //     options: [
  //       'zh-CN',
  //       'en-US'
  //     ]
  //   }
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    attach: 'body',
    children: <div>我将会被插入到body里面</div>
  }
}
