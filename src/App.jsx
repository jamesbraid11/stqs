import { Outlet, useNavigation } from 'react-router-dom'

// Custom components

import Loading from './images/monsters.gif'

function App() {
  const navigation = useNavigation()
  return (
    <>
      <main>
        {
          navigation.state === 'idle' ?
            <Outlet />
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