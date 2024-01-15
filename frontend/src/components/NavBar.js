import React, { useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './NavBar.css'
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom'
import useOutsideClick from '../hooks/useOutsideClick';


const NavBar = () => {
  const isVerified = window.localStorage.getItem('accessToken')
  const wrapperRef = useRef(null)
  const {isVisible,setIsVisible} = useOutsideClick(wrapperRef);

  const onFocus = (e) => {
    return () => {
      setIsVisible(true)
    }
  }
  const onBlur = (e) => {
    return () => {
      setIsVisible(false)
    }
  }
  return (
    <div id='navbar' ref={wrapperRef}>
      <div className='navBar-closed' onClick={onFocus()}>
        <MenuIcon sx={{ fontSize: '2.5rem' }} />
        <label>D Y S H .</label>
      </div>

      <div className={isVisible ? `navBar-hide navBar-open` : 'navbar-dark navBar-open'}>
        <Icon className='navBar-close-icon' onClick={onBlur()}>
          <CloseIcon></CloseIcon>
        </Icon>
        <h1> <Link className='item-link' to='/'>D Y S H .</Link></h1>
        <div className='navBar-items'>
          <Link className='item-link navBar-item' to='/recipe/'>
            <SearchIcon />
            <label>Find Recipes</label>
          </Link>
          <Link className='item-link navBar-item' to='/history'>
            <HistoryIcon />
            <label>History</label>
          </Link>
          <Link className='item-link navBar-item' to='/favorites'>
            <FavoriteBorderIcon />
            <label>Favorites</label>
          </Link>
          <Link className='item-link navBar-item' to='/about'>
            <InfoOutlinedIcon />
            <label>About</label>
          </Link>
          {isVerified ?
            <Link className='item-link navBar-item' to='/logout'>
              <AccountCircleOutlinedIcon />
              <label>Logout</label>
            </Link>
            :
            <Link className='item-link navBar-item' to='/register'>
              <AccountCircleOutlinedIcon />
              <label>Register/login</label>
            </Link>
          }
          <Link className='item-link navBar-item' style={{ backgroundColor: 'grey' }}>
            <AssignmentOutlinedIcon />
            <label>Orders</label>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar