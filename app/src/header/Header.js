import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ ...props }) => {
  return (
    <header className='header'>
      <ul className='nav container'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/' activeClassName='active'>Containers</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/container/create' activeClassName='active'>Create container</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/image/build' activeClassName='active'>Build image</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header
