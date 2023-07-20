import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './style/header.css'

const Header = () => {
  return (
    <div className='header-container'>
        <div >
            <div >
                <ul>
                    <Link to='/' className='Link'>
                        <li>
                            Cryptocurrencies
                        </li>
                    </Link>
                    <Link to='/nfts' className='Link'>
                        <li>
                            Nfts
                        </li>
                    </Link>
                </ul>
            </div>
            <Outlet />
        </div>
    </div>   
  )
}

export {Header}