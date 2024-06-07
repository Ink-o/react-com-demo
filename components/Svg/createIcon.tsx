import Icon, { IconProps } from ".";
import React, { forwardRef } from "react";

interface CreateIconOptions {
  content: React.ReactNode,
  iconProps?: IconProps,
  viewBox?: string
}

export function createIcon(options: CreateIconOptions) {
  const {
    content,
    iconProps,
    viewBox = '0 0 1024 1024'
  } = options

  // SVGSVGElement 与 SVGElement 的联系
  // SVG 元素的原型对象为 SVGSVGElement
  // SVGSVGElement 的原型对象为 SVGElement
  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return <Icon viewBox={viewBox} ref={ref} {...iconProps} {...props}>
      {content}
    </Icon>
  })
}