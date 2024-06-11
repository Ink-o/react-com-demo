import type { Meta, StoryObj } from '@storybook/react';
import MutateObserver from '.'
import { useState, useEffect } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'REACT-COMPO/MutateObserver',
  component: MutateObserver,
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
} satisfies Meta<typeof MutateObserver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = () => {
  const [className, setClassName] = useState('aaa');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClassName('bbb')
      setIsChanged(true)
    }, 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };

  return (
    <MutateObserver onMutate={callback}>
      <div id="container">
        <div className={className}>
          {
            className === 'aaa' ? <div>aaa</div> : <div>
              <p>bbb</p>
            </div>
          }
        </div>
        <div>{isChanged ? '类名变更完成' : ''}</div>
      </div>
    </MutateObserver>
  )
}
