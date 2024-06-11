import type { Meta, StoryObj } from '@storybook/react';
import CopyToClipboard from '.'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/CopyToClipboard',
  component: CopyToClipboard,
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
} satisfies Meta<typeof CopyToClipboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div onClick={() => { console.log('copy 点击成功') }}>Copy</div>,
    text: '复制文案',
    onCopy: (text, result) => {
      console.log('Copy success', text, result)
    }
  },
}
