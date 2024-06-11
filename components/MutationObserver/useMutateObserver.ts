import { useEffect } from "react";

// MutationObserverInit 是 dom 里的类型
const defaultOptions: MutationObserverInit = {
  // 是否监听整个子树
  subtree: true,
  // 是否监听第一层子树
  childList: true,
  // 用来声明哪些属性名会被监听的数组，如果不声明该属性，所有属性的变化都会触发通知
  attributeFilter: ['style', 'class'],
};

const useMutationObserver = (
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!nodeOrList) return

    let instance: MutationObserver
    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList]

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback)

      // 批量监听 node
      nodeList.forEach(node => {
        instance.observe(node, options)
      })
    }

    return () => {
      // 从 mutationObserver 中删除所有待处理的通知
      instance?.takeRecords()
      // 阻止 mutationObserver 实例接收的通知
      instance?.disconnect()
    }
  }, [nodeOrList, options])
}

export default useMutationObserver