import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './NavBar.css'
import { Icon } from '@mui/material';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div id='navbar'>
      <div className='navBar-closed' onClick={() => { setOpen(!open) }}>
        <MenuIcon sx={{ fontSize: '2.5rem' }} />
        <label>D Y S H </label>
      </div>

      <div className={ open ? `navBar-open navBar-hide` : 'navBar-open'}>
        <Icon className='navBar-close-icon' onClick={() => setOpen(false)}>
          <CloseIcon></CloseIcon>
        </Icon>
        <h1>D Y S H .</h1>
        <ul className='navBar-items'>
          <li className='navBar-item'>
            <SearchIcon />
            <label>Find Recipes</label>
          </li>
          <li className='navBar-item'>
            <HistoryIcon />
            <label>History</label>
          </li>
          <li className='navBar-item'>
            <FavoriteBorderIcon />
            <label>Favorites</label>
          </li>
          <li className='navBar-item'>
            <AssignmentOutlinedIcon />
            <label>Orders</label>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar