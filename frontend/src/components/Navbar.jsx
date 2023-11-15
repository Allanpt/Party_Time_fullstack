import { NavLink } from 'react-router-dom'

import './Navbar.css'

function Navbar() {
  return (
    <nav id='navbar'>
        <h2>
            <NavLink to="/">Party Time</NavLink>
        </h2>
        <ul className='links'>
            <li>
                <NavLink to="/">Minhas festas</NavLink>
            </li>
            <li>
                <NavLink to="/party/new" className="btn">Criar festas</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar