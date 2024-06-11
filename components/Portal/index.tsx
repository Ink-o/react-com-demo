import React from "react"
import { useImperativeHandle } from "react"
import { useMemo } from "react"
import { useEffect } from "react"
import { forwardRef } from "react"
import { createPortal } from "react-dom"

export interface ProtalProps {
  attach?: HTMLElement | string,
  children: React.ReactNode
}

const Portal = forwardRef((props: ProtalProps, ref) => {
  const {
    attach = document.body,
    children
  } = props

  // 自定义一个容器
  const container = useMemo(() => {
    const el = document.createElement('div')
    el.className = 'protal-wrapper'
    return el
  }, [])

  useEffect(() => {
    // 获取外层容器
    const parentElement = getAttach(attach)
    // 外层容器插入自定义 container
    parentElement?.appendChild(container)

    // 函数销毁时，parentElement 自动移除 container
    return () => {
      parentElement?.removeChild(container)
    }
  }, [attach, children])

  // ref 暴露当前 container
  useImperativeHandle(ref, () => container)

  // 将 children 插入到 container 中
  return createPortal(children, container)
})

// 兼容 attach 为 string 的情况
export function getAttach(attach: ProtalProps['attach']) {
  if (typeof attach === 'string') {
    return document.querySelector(attach)
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    return attach
  }
  return document.body
}

export default Portal