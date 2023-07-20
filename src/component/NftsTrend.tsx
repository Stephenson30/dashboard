import React,{useState, useEffect, useMemo } from 'react'


const NftsTrend = () => {
  const[data, setData] = useState([])

  useEffect(() => {
    
    async function caller() {
      const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
      const data = await res.json()

      setData(pre => { 
        return pre = data.nfts.map( (page:any) =>{
          return(
            <tr className="nft" key={page.id}> 
              <td className='trend-img-cont-nft'>
                <img src={page.thumb} alt='crypto' className='trend-img-nft'/>
                <p className='name'>{page.name.toUpperCase()}</p>
              </td>
              <td >{page.nft_contract_id}</td>
              <td >{page.symbol}</td>
            </tr>
          )
        })
  })
    }
    caller()

  },  );


  return (
    <div className='Trend'>
      <h2>Trending 
        <span id='one'>.</span>
        <span id='two'>.</span>
        <span id='three'>.</span>
      </h2>
      <div>
      <div className='table-cont' > 
          <table className='trend-table'>
            <thead>
              <tr className='trend-head-nft '>
                <th className=''>Name</th>
                <th>Nft Contract Id</th>
                <th>Symbol</th>
              </tr>
            </thead>
          </table>
        <tbody >{data}</tbody>
      </div>
      </div>
    </div>
  )
}

export {NftsTrend}