import React from 'react'
import { NftsTrend, NftsMarket } from '../component'

function Nfts () {
    return(
        <div className='main-cont'>
            <NftsMarket />
            <NftsTrend />
        </div>
    )
}

export {Nfts}