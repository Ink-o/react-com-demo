import { useRef } from 'react'
import useMutationObserver from './useMutateObserver'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { cloneElement } from 'react'

interface MutationObserverProps {
  options?: MutationObserverInit,
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void,
  children: React.ReactElement
}

export default function MutateObserver(props: MutationObserverProps) {
  const {
    options,
    onMutate = (mutations: MutationRecord[], observer: MutationObserver) => { },
    children,
  } = props

  const elementRef = useRef<HTMLElement>(null)
  const [target, setTarget] = useState<HTMLElement>()

  // target 不存在时，hook 不生效
  useMutationObserver(target!, onMutate, options)

  // 获取到 dom，赋值 target
  useLayoutEffect(() => {
    setTarget(elementRef.current!)
  }, [])

  if (!children) return

  // ⭐️重写 Children，赋值 ref
  return cloneElement(children, { ref: elementRef })
}