import type { Meta, StoryObj } from '@storybook/react';
import Icon from '.'
import React from 'react';
import IconAdd from './demo/IconAdd'
import IconEmail from './demo/IconEmail'
import IconChristmars from './demo/IconChristmars'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // value: { control: 'date' },
    // locale: {
    //   control: 'radio',
    //   options: [
    //     'zh-CN',
    //     'en-US'
    //   ]
    // }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const IconAddCom: Story = {
  render: () => <IconAdd size={'40px'} />,
};

export const IconEmailCom: Story = {
  render: () => <IconEmail spin style={{ color: 'blue', fontSize: '50px' }} />,
};

export const IconChristmarsCom: Story = {
  render: () => <IconChristmars />,
};

