import React, { forwardRef, PropsWithChildren } from "react";
import cs from 'classnames'

import './index.scss'

type BaseIconProps = {
  className?: string,
  style?: React.CSSProperties,
  size?: string | string[],
  spin?: boolean
}

// 使用 BaseIconProps 中定义好的属性覆盖 SVGAttributes
export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGSVGElement>, keyof BaseIconProps>

export const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }
  const width = size as string || '1em'
  const height = size as string || '1em'

  return [width, height]
}

const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const {
    className,
    style,
    size = '1em',
    spin,
    children,
    ...rest
  } = props

  const [width, height] = getSize(size)

  const cn = cs(
    'icon',
    {
      'icon-spin': spin
    },
    className
  )

  return (
    // 如果 currentcolor用于color属性的值,那么会给元素继承color属性的值
    // svg 的 size 默认为 1em，也就是使用相对父元素的字体大小
    <svg ref={ref} className={cn} width={width} height={height} style={style} fill="currentColor" {...rest}>
      {children}
    </svg>
  );
})
export default Icon