import { useEffect, useState } from 'react'
import { Link, useLocation, RouterProvider, createHashRouter } from 'react-router-dom'
import RouterKeepAlive, { useKeepOutlet } from '..'

const Layout = () => {
  const { pathname } = useLocation()
  console.log('pathname: ', pathname);

  // 当前匹配到的虚拟dom
  const element = useKeepOutlet()
  return (
    <div>
      <div>当前路由：{pathname}</div>
      {element}
    </div>
  )
}

const Aaa = () => {
  const [count, setCount] = useState(0)

  return <div>
    <p>{count}</p>
    <p>
      <button onClick={() => setCount(count + 1)}>加一</button>
    </p>
    <Link to='/bbb'>去 Bbb 页面</Link><br />
    <Link to='/ccc'>去 Ccc 页面</Link>
  </div>
}

const Bbb = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('bbb组件初始化执行');
  }, [])

  return <div>
    <p>{count}</p>
    <p><button onClick={() => setCount(count => count + 1)}>加一</button></p>
    <p><input type="text" /></p>
    <Link to='/'>去首页</Link>
  </div>
};

const Ccc = () => {
  return <div>
    <p>ccc</p>
    <Link to='/'>去首面</Link>
  </div>
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Aaa />
      },
      {
        path: '/bbb',
        element: <Bbb />
      },
      {
        path: '/ccc',
        element: <Ccc />
      }
    ]
  }
]

export const router = createHashRouter(routes)

const App = () => {
  // 外面包一层 KeepAliveLayout 获取组件渲染
  return <RouterKeepAlive keepPaths={[/bbb/]}>
    <RouterProvider router={router} />
  </RouterKeepAlive>
}

export default App