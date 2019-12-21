import React from 'react'
import {Link} from 'react-router-dom';

const Logo = ({showClear}) => {
  const headerLogo = showClear ? 'logo-header' : 'logo';
  const headerLogoImg = showClear ? 'logo-img-header' : 'logo-img';
  return (
    <Link to='/'>
      <div className='container'>
        <h1 className={headerLogo}>Bookhunt</h1>
        <img id={headerLogoImg} src='https://static.thenounproject.com/png/15134-200.png' alt='Bookhunt Symbol'/>
      </div>
   </Link>
  )
}

export default Logo
