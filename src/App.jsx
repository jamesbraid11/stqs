import { useState } from "react"
import { Outlet, useNavigation } from 'react-router-dom'

// Custom components
import Nav from './components/Nav'

import Loading from './images/monsters.gif'

export default function App() {

  const navigation = useNavigation()

  const [agentData, setAgentData] = useState("");

  return (
    <>
    <Nav />
      <main>
        {
          navigation.state === 'idle' ?
            <Outlet context={[agentData, setAgentData]}/>
            :
            <div>
              <img src={Loading} alt="monster loading gif" style={{ width: '20rem' }}/>
            </div>
        }
      </main>
    </>
  )
}