import Portal from '..'

const PortalDefault = () => {
  return <Portal attach={'body'}>
    <div>我将会被插入到body里面</div>
  </Portal>
}

export default PortalDefault