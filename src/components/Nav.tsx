import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

  // State to track dropdown visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <header>
        {/* Display links to other game components and a link to the SpaceTraders guide website when game navigation dropdown clicked */}
        <div className="dropdown">
          {/* Button to toggle the dropdown */}
          <button onClick={toggleDropdown}>
            Game Navigation
          </button>
          {/* Dropdown menu shown when isOpen is true */}
          {isOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="https://docs.spacetraders.io/quickstart/new-game" target="_blank"><i>Game Info</i></Link>
              </li>
              <li>
                <Link to="/"><i>New Game</i></Link>
              </li>
              <li>
                <Link to="/continueGame"><i>Continue Game</i></Link>
              </li>
              <li>
                <Link to="/contracts">Contracts</Link>
              </li>
            </ul>
          )}
        </div>
      </header>
    </>
  )
}