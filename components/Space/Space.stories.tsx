import type { Meta, StoryObj } from '@storybook/react';
import Space from '.'
import React from 'react';
import './demo.scss'
import demoScss from './demo.scss?raw'
import { ConfigProvider } from './ConfigProvider'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/Space',
  component: Space,
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
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return  <Space
      className='container' 
      direction="horizontal"
      align="end" 
      wrap={true}
      size={['large', 'small']}
      split={<div>--</div>}
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
  },
  // scss 样式展示
  parameters: {
    docs: {
      description: {
        story: `
  ## 组件使用样式
  
  \`\`\`scss
  ${demoScss}
  \`\`\`
        `,
      },
    },
  }
}

export const ContextSpace: Story  = {
  // scss 样式展示
  parameters: {
    docs: {
      description: {
        story: `
  ## 组件使用样式
  
  \`\`\`scss
  ${demoScss}
  \`\`\`
        `,
      },
    },
  },
  render: () => {
    // ConfigProvider 中可以透传space相关属性
    return  <ConfigProvider space={{
      size: ['small', 'middle']
    }}>
        <Space
        className='container' 
        direction="horizontal"
        wrap={true}
      >
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space
        className='container' 
        direction="horizontal"
        wrap={true}
      >
        <div className="box"></div>
        <div className="box"></div>
      </Space>
    </ConfigProvider>
  },
}