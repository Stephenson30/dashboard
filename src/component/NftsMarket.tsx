import React,{useState, useEffect, useMemo} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import './style/market.css'

const NftsMarket = () => {
   // states
   const[data, setData] = useState([])
   const[searchData, setSearchData] = useState(<></>)
   const[input, setInput] = useState({
    contract: '',
    select: ''
  })
   const [chooseLink, setChooseLink] = useState(false)
   const [done, setdone] = useState(true)
    
 // useEffect hook for Restful API
   useEffect(()=> {
     async function caller() {
       const res = await fetch(`https://api.coingecko.com/api/v3/nfts/list?asset_platform_id=ethereum&per_page=100&page=1`)
       const data = await res.json()

       setData(pre => { 
             return pre = data.map( (page:any) =>{
               return(
                 <tr key={page.id}>
                   <td className='name-img-cont' >
                      <p className='name'>{page.name.toUpperCase()}</p>
                   </td>
                   <td >{page.asset_platform_id}</td>
                   <td>
                      {page.contract_address}
                   </td>
                 </tr>
               )
             })
       })
     }
     caller()
   }, [chooseLink])
 
 
 // useEffect hook for Restful API
   useEffect(()=>{
     async function getCoin(){
       const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${input.select? input.select : 'ethereum'}/contract/${!input.contract? '0x36F379400DE6c6BCDF4408B282F8b685c56adc60': input.contract}`)
       const resultData = await res.json()

       setSearchData(pre => {
 
         if (resultData?.contract_address === input.contract){
           return pre = (
           <div className='search-result fade'>
                <div className='search-result'>
                  <div className='flex'>
                    <div className='flex'>
                    <img src={resultData?.image?.small} alt='crypto' className='trend-img-nft'/>
                    <p className='name name-th'>{resultData?.name.toUpperCase()}</p>
                    </div>
                    <p>Network: {resultData?.asset_platform_id}</p>
                    <p>Floor Price: {resultData?.floor_price.native_currency}{resultData?.native_currency_symbol}</p>
                    <p>Total Supply: {resultData?.total_supply}</p>
                  </div>
                  <div className='flex'>
                    <p>Unique Addresses: {resultData?.number_of_unique_addresses}</p>
                    <p>Market Cap: {resultData?.market_cap.usd}</p>
                    <p>Market Cap 24h Change%: {resultData?.market_cap_24h_percentage_change.usd}</p>
                    <p>24h Change%: {resultData?.volume_24h_percentage_change.usd}</p>
                  </div>
                  <div className='flex'>
                    <a 
                      href={resultData?.explorers[0]?.link? resultData?.explorers[0]?.link : resultData?.explorers[1]?.link} 
                      target='_blank'>
                        View on {resultData?.explorers[0]?.name? resultData?.explorers[0]?.name : resultData?.explorers[1]?.name}
                    </a>
                    {resultData?.links?.discord? <a href={resultData?.links?.discord} target='_blank'>Discord</a> : <> </>}
                    {resultData?.links?.homepage? <a href={resultData?.links?.homepage} target='_blank'>Website</a> : <> </>}
                    {resultData?.links?.twitter? <a href={resultData?.links?.twitter} target='_blank'>Twitter</a> : <> </>}
                  </div>
                  {resultData?.description? <h3>Description: </h3> : <></>}
                  {resultData?.description? <p>{resultData?.description}</p> : <></>}
                  <br />
                  {resultData?.contract_address? <p>Contract Address: {resultData?.contract_address}</p> : <></>}
                </div>
             </div>
           )
         }else{
           return  pre = (
              
                resultData?.error?
                <p className='fade p'>Nft Collection Not Found</p>
                :
                <p className='fade p'>Searching...</p>
              
           )
         }
       })
     }
     getCoin()
     console.log(searchData)
 }, [chooseLink] )
 
 
 // handle function for getting input values
   const handleChange: any = ( e:any ) => {
       setInput(pre =>({
         ...pre,
         [e.target.name] : e.target.value
       }))
   }
 
 
 //  search function that calls useEffect hook for searching
   const onSearch = () => {
     if(input.contract.length === 0){
       setChooseLink(false)
     }else{
       setChooseLink(true)
     }
     setdone(false)
   }
 
 //  clear function that clears input value and do some reset
 const onClear = () => {
     setInput(pre => ({
       ...pre,
       contract: ''
     }))
     setChooseLink(false)
     setdone(true)
 }
 
 //  reset function that calls clear function when input value is been deleted to zero
 const reset = () => {
   if(input.contract.length === 0){
     onClear()
   }
 }
  return (
    <div className='Market-cont'>
      <div className='search-cont nft'>
        <input 
          placeholder='contract address...' 
          className='search-input nft-input'
          name='contract'
          onChange={handleChange}
          value={input.contract}
          onKeyUp={reset}
          />

          <select 
            name="select" 
            id="select"
            onChange={handleChange}
            value={input.select}
          >
              <option value="ethereum">ethereum</option>
              <option value="solana">solana</option>
          </select>

        {done ?
          <button
            onClick={onSearch}
            className='btn'

            disabled = {input.contract.length === 0? true : false}
          >
          <SearchIcon className='SearchIcon' />
        </button>
        :
        <button
          onClick={onClear}
          className='btn-red'
        >
          <DeleteSweepIcon className='DeleteSweepIcon' />
        </button>
        }
      </div>
      <div className='table-cont'>
              
          {
            chooseLink?
              searchData
            :
            data && !chooseLink? 

            <table>
              <tr className='table-head'>
                <th className='name-th'>Name</th>
                <th>Asset Platform</th>
                <th>Contract Address</th>
              </tr>
              {data}
            </table>
            : 
            <>
              <p>
                check network
              </p>
            </>
          }
        

       </div>
    </div>
  )
}

export  {NftsMarket}