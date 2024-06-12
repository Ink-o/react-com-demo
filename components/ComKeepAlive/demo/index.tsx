import { useState } from 'react'
import ComKeepAlive, { AliveScope } from '..'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      count: {count}
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  )
}

function App() {
  const [show, setShow] = useState(true)
  return (
    <AliveScope>
      <div>
        <button onClick={() => setShow((show) => !show)}>Toggle</button>
        <p>无 KeepAlive</p>
        {show && <Counter />}
        <p>有 KeepAlive</p>
        {show && (
          <ComKeepAlive id="Test">
            <Counter />
          </ComKeepAlive>
        )}
      </div>
    </AliveScope>
  )
}

export default App