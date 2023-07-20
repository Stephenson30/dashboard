import React,{useEffect, useState, useMemo} from 'react'
import './style/market.css'


const CryptoTrend = () => {
  const[data, setData] = useState([])

  useEffect(() => {
    
    async function caller() {
      const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
      const data = await res.json()
      setData(pre => { 
        return pre = data.coins.map( (page:any) =>{
          return(
            <tr>
              <td className='trend-img-cont' key={page.item.id}>
                <img src={page.item.small} alt='crypto' className=' trend-img'/>
                <p className='name'>{page.item.symbol.toUpperCase()}</p>
              </td>
              <td key={page.item.id}>{page.item.market_cap_rank}</td>
              <td key={page.item.id}>{page.item.id}</td>
            </tr>
          )
        })
  })
    }
    caller()

    console.log(data)
  },  );




  return (
    <div className='Trend'>
      <h2>Trending 
        <span id='one'>.</span>
        <span id='two'>.</span>
        <span id='three'>.</span>
      </h2>
      <div>

      </div>
      <div className='table-cont' > 
          <table className='trend-table'>
            <thead>
              <tr className='trend-head'>
                <th className=''>Name</th>
                <th className='cap-rank'>Market Cap rank</th>
                <th>Network</th>
              </tr>
            </thead>
          </table>
        <tbody >{data}</tbody>
      </div>
    </div>
  )
}

export  {CryptoTrend}