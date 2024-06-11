// App.js

import React, { useState } from 'react'
import KeepAlive, { AliveScope } from 'react-activation'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count => count + 1)}>Add</button>
    </div>
  )
}

function Counter2() {
  const [count, setCount] = useState(18)

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count => count + 1)}>Add</button>
    </div>
  )
}

function App() {
  const [show, setShow] = useState(true)

  return (
    <AliveScope>
      <div>
        <button onClick={() => setShow(show => !show)}>Toggle</button>
        {show && (
          <>
            <KeepAlive>
              <Counter />
              {/* <Counter2 /> */}
            </KeepAlive>
          </>
        )}
      </div>
    </AliveScope>
  )
}

export default App