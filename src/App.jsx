import { useState } from "react"
import { Outlet, useNavigation } from 'react-router-dom'

// Custom components
import Nav from './components/Nav'

// Loading gif
import Loading from './images/galaxy.gif'

export default function App() {

  const navigation = useNavigation()

  // State to be accessible to all children with useOutletContext
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