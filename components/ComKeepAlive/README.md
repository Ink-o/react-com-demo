组件缓存逻辑
来源：https://github.com/CJY0208/react-activation

# 核心逻辑
aliveScope 中包裹整个根组件，所有组件都将会在 alibeScope 中渲染，里面包含了缓存 dom 的逻辑

keepAlive 中可以拿到缓存的组件，创建成功后将会往 aliveScope 中注册节点（把虚拟 dom 给到 AliveScope），keepAlive 中只有一个容器，在 aliveScope 中渲染好 dom 后，容器的 ref 不断将 aliveScope 传回来的真实 dom 不断 append 进容器中