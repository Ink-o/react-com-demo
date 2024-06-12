import type { Meta } from '@storybook/react';
import ComKeepAlive from '.'
import Demo from './demo'
import DemoText from './demo/index?raw'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/ComKeepAlive',
  component: ComKeepAlive,
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
} satisfies Meta<typeof ComKeepAlive>;

export default meta;

export const Default = () => {
  return <Demo />
}
Default.parameters = {
  docs: {
    description: {
      story: `
  ## demo源码
  
  \`\`\`tsx
  ${DemoText}
  \`\`\`
        `,
    },
  },
}
