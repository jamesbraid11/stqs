import { Outlet, useNavigation } from 'react-router-dom'

// Custom components
import Nav from './components/Nav'

// Loading gif
import Loading from './images/galaxy.gif'

export default function App() {

  const navigation = useNavigation()

  return (
    <>
    <Nav />
      <main>
        {
          navigation.state === 'idle' ?
            <Outlet />
            :
            <div>
              <img src={Loading} alt="monster loading gif" style={{ width: '25rem' }}/>
            </div>
        }
      </main>
    </>
  )
}