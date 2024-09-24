import { useState } from "react"
import { Outlet, useNavigation } from 'react-router-dom'

// Custom components

import Loading from './images/monsters.gif'

function App() {

  const navigation = useNavigation()

  const [agentData, setAgentData] = useState("");

  return (
    <>
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

export default App;