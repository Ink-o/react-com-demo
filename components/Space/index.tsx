import React, { useContext, useMemo } from "react";
import classNames from 'classnames'
import './index.scss'
import { ConfigContext } from './ConfigProvider'

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  // 这里的 size 表示为 row-gap 和 column-gap
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

function getNumberSize(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0
}

const Space = (props: SpaceProps) => {

  const {
    space
  } = useContext(ConfigContext)

  const {
    className,
    style,
    children,
    size = space?.size || 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props


  // align 默认为 center
  const mergeAlign = direction === 'horizontal' && align === undefined ? 'center' : align

  const cn = classNames(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergeAlign}`]: mergeAlign
    },
    className
  )

  // children 拍平处理
  const childNodes = React.Children.toArray(children)
  // 所有 children 中包上一层 div
  const nodes = childNodes.map((child: any, i) => {
    const key = child && child.key || `space-item-${i}`
    return <>
      <div className="space-item" key={key}>
        {child}
      </div>
      {/* split 参数处理 */}
      {i < childNodes.length && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  })

  const otherStyles: React.CSSProperties = {}

  const [horizontalSize, verticalSize] = useMemo(() => {
    const sizeArr = Array.isArray(size) ? size : [size, size]
    return sizeArr.map(item => getNumberSize(item))
  }, [size])

  // space 不设置宽度，所以这里使用 gap 来进行间隔
  // 设置 space 的 行列 gap
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  // 添加 wrap 属性
  if (wrap) {
    otherStyles.flexWrap = 'wrap'
  }

  return <div
    className={cn}
    style={{
      ...style,
      ...otherStyles
    }}
    {...otherProps}
  >
    {nodes}
  </div>
}

export default Space