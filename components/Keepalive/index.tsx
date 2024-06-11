import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { useLocation, useOutlet, matchPath } from "react-router-dom";

interface KeepAliveLayoutProps extends PropsWithChildren {
  keepPaths: Array<string | RegExp>,
  keepElements?: Record<string, ReactNode>,
  dropByPath?: (path: string) => void,
}

// contextType
type KeepAliveContextType = Omit<Required<KeepAliveLayoutProps>, 'children'>

// 缓存 reactNode
const keepElements: KeepAliveLayoutProps['keepElements'] = {}

export const KeepAliveContext = createContext<KeepAliveContextType>({
  keepPaths: [],
  keepElements,
  dropByPath: (path: string) => {
    keepElements[path] = null
  },
})

// 判断是否为缓存的路径
const isKeepPath = (keepPaths: KeepAliveLayoutProps['keepPaths'], path: string) => {
  for (let i = 0; i < keepPaths.length; i++) {
    let item = keepPaths[i]
    if (item === path) return true
    if (item instanceof RegExp && item.test(path)) return true
    if (typeof item === 'string' && item.toLowerCase() === path.toLowerCase()) return true
  }
  return false
}

export function useKeepOutlet() {
  const location = useLocation()
  // 获取当前 url 应该展示的组件，这是一个虚拟 dom
  const element = useOutlet()

  const {
    keepElements,
    keepPaths
  } = useContext(KeepAliveContext)

  // 判断当前路由是否为缓存的路由
  const isKeep = isKeepPath(keepPaths, location.pathname)

  // 判断是否为缓存的路径来执行缓存操作（每次路由切换的时候，都会执行到这个 hooks）
  if (isKeep) {
    // element 直接引用到 keepElements 中了
    keepElements[location.pathname] = element
  }

  // ⭐️不能这样缓存组件在 js 中，因为存的虚拟dom无法同步html上的组件状态
  // const matchCom = Object.entries(keepElements).map(([pathname, element]) => {
  //   return <div
  //     key={pathname}
  //     style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }}
  //     className="keep-alive-page"
  //     // 如果当前路由不匹配组件，则隐藏，放在 html 上隐藏
  //     hidden={!matchPath(location.pathname, pathname)}
  //   >
  //     {/* element 是虚拟 dom */}
  //     {element}
  //   </div>
  // })
  // if (matchPath(location.pathname, pathname) && matchCom) {
  //   return matchCom
  // }

  // 核心原理，一旦需要缓存的组件打开后就一直保留在 html 上，状态那些也一直保留在html中
  // fiber diff 的时候，直接复用之前的 真实 DOM，达到缓存的目的
  return <>
    {/* 渲染所有的 keepElements，不匹配则隐藏 */}
    {
      Object.entries(keepElements).map(([pathname, element]) => {
        return <div
          key={pathname}
          style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' }}
          className="keep-alive-page"
          // 如果当前路由不匹配组件，则隐藏，放在 html 上隐藏
          hidden={!matchPath(location.pathname, pathname)}
        >
          {/* element 是虚拟 dom */}
          {element}
        </div>
      })
    }
    {/* 当前路由不在 keepPaths 内，直接渲染对应组件 */}
    {
      !isKeep && element
    }
  </>
}

const KeepAliveLayout = (props: KeepAliveLayoutProps) => {
  const {
    keepPaths,
    ...others
  } = props
  const {
    keepElements,
    dropByPath
  } = useContext(KeepAliveContext)

  return <KeepAliveContext.Provider
    value={{
      keepPaths,
      keepElements,
      dropByPath,
    }}
    {...others}
  />
}

export default KeepAliveLayout