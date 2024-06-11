import CopyToCliborad from '../index'

export default () => {
  return <CopyToCliborad text="我是赋值文本">
    <div onClick={() => {
      alert('赋值成功')
    }}>复制</div>
  </CopyToCliborad>
}