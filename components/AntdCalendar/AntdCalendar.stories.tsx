import type { Meta, StoryObj } from '@storybook/react';
import AntdCalendar from '.'
import dayjs from 'dayjs'
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/AntdCalendar',
  component: AntdCalendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: 'date' },
    locale: {
      control: 'radio',
      options: [
        'zh-CN',
        'en-US'
      ]
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof AntdCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 使用 render 自定义渲染函数来处理 date 情况的处理
const renderCalendar = (args: any) => {
  if(typeof args.value === 'number') {
      return <AntdCalendar {...args} value={dayjs(new Date(args.value))}/>
  }

  return <AntdCalendar {...args}/>
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    value: dayjs('2023-11-08'),
    locale: 'en-US'
  },
  render: renderCalendar,
};
