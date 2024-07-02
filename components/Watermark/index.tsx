import { PropsWithChildren, CSSProperties, useRef, useCallback, useEffect } from "react"
import useWatermark from './useWatermark';

export interface WatermarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  zIndex?: string | number;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  // 水印内容
  content?: string | string[];
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  // 水印间隙
  gap?: [number, number];
  // 水印容器偏移值
  offset?: [number, number];
  // 外层容器 dom 元素获取
  getContainer?: () => HTMLElement | null;
}

export default (props: WatermarkProps) => {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset
  } = props
  const containerRef = useRef(null)
  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current
  }, [props.getContainer, containerRef.current])

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  })

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ]);

  return props.children ? <div ref={containerRef} className={className} style={style}>
    {props.children}
  </div> : null
}