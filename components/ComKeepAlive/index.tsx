import { PropsWithChildren, ReactElement, createContext, useContext, useEffect, useRef, useState } from 'react'

const Context = createContext<{
  keep?: (...args: any[]) => any
}>({})

const nodes: Record<string, HTMLElement> = {}
export const AliveScope = (props: PropsWithChildren) => {
  const [state, setState] = useState<Record<string, {
    id: string,
    children: ReactElement | ReactElement[]
  }>>({})
  const keep = (id: string, children: ReactElement | ReactElement[]) =>
    new Promise(resolve => {
      // state 注册需要缓存的组件
      setState({
        ...state,
        [id]: { id, children }
      });
      // 等待组件渲染完毕
      setTimeout(() => {
        resolve(nodes[id])
      });
    })

  return <Context.Provider value={{ keep }}>
    {/* 传进去的children全部渲染 */}
    {props.children}
    {/* 将缓存的组件渲染出来，虽然这里是渲染在最后面，但是后面 dom appendChild 就会把对应的 dom 给剪切走 */}
    {Object.values(state).map(({ id, children }) => (
      <div
        key={id}
        ref={node => {
          if (!node) return

          // node 缓存起来
          nodes[id] = node
        }}
      >
        {children}
      </div>
    ))}
  </Context.Provider>
}

const KeepAlive = (props: {
  id: string,
  children: ReactElement | ReactElement[]
}) => {
  const context = useContext(Context)
  const placeholder = useRef<HTMLDivElement>(null)
  const init = async ({ id, children }: {
    id: string,
    children: ReactElement | ReactElement[]
  }) => {
    // 调用 keep 获取真实 dom
    const realContent = await context.keep?.(id, children)
    console.log('realContent: ', realContent);
    if (!realContent) return
    // ref 统一添加真实 dom，实现剪切
    placeholder.current?.appendChild(realContent)
  }

  useEffect(() => {
    init(props)
  }, [])

  return <div
    ref={placeholder}
  />
}

export default KeepAlive
