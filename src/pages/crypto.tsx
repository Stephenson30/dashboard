import React from 'react'
import { CryptoMarket, CryptoTrend } from '../component'
import './styles/crypto.css'

function Crypto () {
    return(
        <div className='main-cont'>
            <CryptoMarket />
            <CryptoTrend />
        </div>
    )
}

export {Crypto}