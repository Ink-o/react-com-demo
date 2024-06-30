import { useEffect, useRef, useState } from 'react';
import { WatermarkProps } from '.';
import { merge } from 'lodash-es'
console.log('merge: ', merge);

export type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>;

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  getContainer: () => document.body,
};

export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj;
}

const toNumber = (value?: string | number, defaultValue?: number) => {
  if (value === undefined) {
    return defaultValue;
  }
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const getMergeOptions = (o: Partial<WatermarkOptions>) => {
  const options = o || {}
  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined)!,
    gap: options.gap || defaultOptions.gap,
    fontStyle: {
      ...defaultOptions.fontStyle,
      ...options.fontStyle
    },
    getContainer: defaultOptions.getContainer,
  } as Required<WatermarkOptions>;

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)
  const mergedOffsetY = toNumber(mergedOptions.offset?.[1] || mergedOptions.offset?.[0], 0)

  mergedOptions.offset = [mergedOffsetX!, mergedOffsetY!]

  return mergedOptions
}

const getCanvasData = async (options: Required<WatermarkOptions>) => {
  const { rotate, image, content, fontStyle, gap } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // 当前显示设备的物理像素分辨率与CSS 像素分辨率之比
  const ratio = window.devicePixelRatio;

  /**
   * 画布绘画图像
   * @returns 
   */
  function drawImage() {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'
      img.src = image
      img.onload = () => {
        let { width, height } = options
        // 宽高有一个不存在的时候，另外一个根据比例来缩放
        if (!width || !height) {
          if (width) {
            // (img.height / img.width) = height / width
            // height = (img.height / img.width) * width
            height = (img.height / img.width) * +width;
          } else {
            width = (img.width / img.height) * +height;
          }
        }

        // 画布/画笔调整
        configCanvas({ width, height });

        // 现在画笔位置处于画布中间，为了保证绘画出来的图片居中在画布
        // 这里画笔的xy轴得往左往上偏移图片的宽高
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({
          base64Url: canvas.toDataURL(),
          width,
          height
        })
      }
      img.onerror = () => {
        return drawText()
      }
    })
  }

  /**
   * 测量文本宽度
   * @param ctx 
   * @param content 
   * @param rotate 
   * @returns 
   */
  function measureTextSize(ctx: CanvasRenderingContext2D, content: string[], rotate: number) {
    let width = 0
    let height = 0
    const lineSize: Array<{ width: number, height: number }> = []
    content.forEach((item) => {
      // fontBoundingBoxAscent：文本基线到顶部的距离
      // fontBoundingBoxDescent：文本基线到底线的距离
      // 上面两者相加为文本高度
      const {
        width: textWidth,
        fontBoundingBoxAscent,
        fontBoundingBoxDescent,
      } = ctx.measureText(item);
      const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
      if (textWidth > width) {
        // 更新行最大高度
        width = textWidth;
      }
      // 高度累加
      height += textHeight;
      lineSize.push({ height: textHeight, width: textWidth });
    })
    // 角度计算
    const angle = (rotate * Math.PI) / 180;

    return {
      originWidth: width,
      originHeight: height,
      // 计算n行二维文本翻转后的宽高度
      // 这里有一个矩阵来计算的
      width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
      height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
      lineSize,
    };
  }

  /**
   * 开始绘画文本
   * @returns 
   */
  function drawText() {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle
    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(ctx, [...content], rotate);

    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    // 根据配置/测量出来的宽高度来设置画布
    configCanvas({ width, height });

    // 设置画笔颜色与风格
    ctx.fillStyle = color!
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';

    [...content].forEach((item, index) => {
      const {
        height: lineHeight,
        width: lineWdidth,
      } = measureSize.lineSize[index];

      // x画布起点位置往左移动一半当前文本宽度
      const xStartPoint = -lineWdidth / 2
      // y画布起点位置往上移动一半宽度
      // 判断当前在第几行，需要加上一层级的高度
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;

      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      );
    })
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  }

  /**
   * 画笔相关配置
   * @param size 
   */
  const configCanvas = (size: { width: number, height: number }) => {
    // 画布宽度高需要加上水印之间的间隙（size 为用户配置的size或者根据图片生成的等比例宽高）
    const canvasWidth = gap[0] + size.width
    const canvasHeight = gap[1] + size.height

    canvas.setAttribute('width', `${canvasWidth * ratio}px`);
    canvas.setAttribute('height', `${canvasHeight * ratio}px`);
    // canvas画笔移动到画布中央
    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2)
    // 绘画点缩小/放大，满足当前css像素对应的物理像素
    ctx.scale(ratio, ratio)

    // 角度转成弧度
    const rotateAngle = (rotate * Math.PI) / 180
    // 画笔旋转角度
    ctx.rotate(rotateAngle)
  }

  return image ? drawImage() : drawText();
}

const useWatermark = (params: WatermarkOptions) => {
  const [options, setOptions] = useState(params)
  const mergedOptions = getMergeOptions(options)
  const watermarkDiv = useRef<HTMLDivElement>()
  const mutationObserver = useRef<MutationObserver>()

  const container = mergedOptions.getContainer()
  const { zIndex, gap } = mergedOptions

  async function drawWatermark() {
    if (!container) return
    const { base64Url, width, height } = await getCanvasData(mergedOptions)
    console.log('base64Url: ', base64Url);
    const offsetLeft = mergedOptions.offset[0] + 'px';
    const offsetTop = mergedOptions.offset[1] + 'px';

    const wmStyle = `
    width:calc(100% - ${offsetLeft});
    height:calc(100% - ${offsetTop});
    position:absolute;
    top:${offsetTop};
    left:${offsetLeft};
    bottom:0;
    right:0;
    pointer-events: none;
    z-index:${zIndex};
    background-position: 0 0;
    background-size:${gap[0] + width}px ${gap[1] + height}px;
    background-repeat: repeat;
    background-image:url(${base64Url})`;
    if (!watermarkDiv.current) {
      const div = document.createElement('div')
      watermarkDiv.current = div
      container.append(div)
      container.style.position = 'relative'
    }
    watermarkDiv.current?.setAttribute('style', wmStyle.trim());
  }

  useEffect(() => {
    drawWatermark();
  }, []);

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions))
    }
  }
}

export default useWatermark