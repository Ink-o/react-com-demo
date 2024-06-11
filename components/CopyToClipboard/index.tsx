import React from "react"
import copy from 'copy-to-clipboard';
import { cloneElement } from "react";

interface CopyToCliboradProps {
  children: React.ReactElement,
  /**
   * 需要复制的文本
   */
  text: string,
  /**
   * 复制结果回调
   * @param args 
   * @returns 
   */
  onCopy?: (text: string, result: boolean) => void;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  }
}

const CopyToCliborad = (props: CopyToCliboradProps) => {
  const {
    children,
    text,
    onCopy,
    options,
  } = props

  // 强制 elm 一定为单个元素
  const elem = React.Children.only(children)

  return cloneElement(children, {
    onClick: (event: MouseEvent) => {
      const result = copy(text, options)
      onCopy?.(text, result)

      // 透传 event
      elem.props.onClick?.(event)
    }
  })
}

export default CopyToCliborad