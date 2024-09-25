import { useState } from "react"
import { Outlet, useNavigation } from 'react-router-dom'

// Custom components
import Nav from './components/Nav'

import Loading from './images/monsters.gif'

export default function App() {

  const navigation = useNavigation()

  const [token, setToken] = useState("");

  return (
    <>
    <Nav />
      <main>
        {
          navigation.state === 'idle' ?
            <Outlet context={[token, setToken]} />
            :
            <div>
              <img src={Loading} alt="monster loading gif" style={{ width: '20rem' }}/>
            </div>
        }
      </main>
    </>
  )
}