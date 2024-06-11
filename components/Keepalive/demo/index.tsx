import { useEffect, useState } from 'react'
import { Link, useLocation, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import KeepAliveLayout, { useKeepOutlet } from '..'

const Layout = () => {
  const { pathname } = useLocation()

  // 更换成这个
  const element = useKeepOutlet()
  return (
    <div>
      <div>当前路由：{pathname}</div>
      {/* <Outlet /> */}
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

export const router = createBrowserRouter(routes)

const App = () => {
  return <KeepAliveLayout keepPaths={[/bbb/]}>
    <RouterProvider router={router} />
  </KeepAliveLayout>

  // return <RouterProvider router={router} />
}

export default App