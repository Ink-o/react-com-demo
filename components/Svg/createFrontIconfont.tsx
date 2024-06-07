import React from "react";
import Icon, { IconProps } from '.'
import { forwardRef } from "react";

const loadedSet = new Set<string>()

export function createFromIconfont(scriptUrl: string) {
  // 加载 svg 资源
  if (typeof scriptUrl === 'string' &&
    scriptUrl.length > 0 &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement('script')
    script.setAttribute('src', scriptUrl)
    script.setAttribute('data-namespace', scriptUrl)
    document.body.appendChild(script)

    loadedSet.add(scriptUrl)
  }

  const Iconfont = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const {
      type,
      ...rest
    } = props
    return <Icon {...rest} ref={ref}>
      {/* 根据 type 去链接特定的 svg */}
      {type ? <use xlinkHref={`#${type}`} /> : null}
    </Icon>
  })

  return Iconfont
}