import { useState } from 'react'
import { Link } from 'react-router-dom'

// Bootstrap Components
import Modal from 'react-bootstrap/Modal'

export default function Nav() {

  // State
  const [show, setShow] = useState(false)

  return (
    <>
      <header className='p-2 p-md-3 p-lg-4'>
        <button onClick={() => setShow(true)}>
          Game Navigation
        </button>
      </header>
      {/* Display links to other game components and a link to the SpaceTraders guide website when game navigation button clicked */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <nav onClick={() => setShow(false)}>
            <Link to="https://docs.spacetraders.io/quickstart/new-game" target="_blank"><i>Game Info</i></Link>
            <Link to="/"><i>New Game</i></Link>
            <Link to="/continueGame"><i>Continue Game</i></Link>
            <Link to="/contracts">Contracts</Link>
          </nav>
        </Modal.Header>
      </Modal>
    </>
  )
}