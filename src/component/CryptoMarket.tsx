import React,{useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import './style/market.css'


const CryptoMarket = () => {
  // states
  const[data, setData] = useState([])
  const[searchData, setSearchData] = useState(<></>)
  const[input, setInput] = useState({
    search: '',
  })
  const [chooseLink, setChooseLink] = useState(false)
  const [done, setdone] = useState(true)
  const key:string = (input.search.replace(/\s+/g, ' ').trim()).toLowerCase()

   
// useEffect hook for Restful API
  useEffect(()=> {
    async function caller() {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=11&page=1&sparkline=false&locale=en`)
      const data = await res.json()

      setData(pre => { 
            return pre = data.map( (page:any) =>{
              return(
                <tr key={page.id}>
                  <td className='name-img-cont' >
                  <img src={page.image} alt='crypto' className='img'/>
                  <p className='name'>{page.symbol.toUpperCase()}</p>
                  </td>
                  <td >{page.current_price.toFixed(2)}</td>
                  <td >{page.market_cap}</td>
                  <td>
                  <span className={JSON.stringify(page.price_change_percentage_24h).includes('-')? 'red' : 'green'}>
                  {JSON.stringify(page.price_change_percentage_24h).includes('-')? '' : '+'}
                  {page.price_change_percentage_24h.toFixed(2)}%
                  </span>
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
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${key}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const resultData = await res.json()
      const object:any = Object.keys(resultData)
      
      setSearchData(pre => {
        if (resultData[key]?.usd && object.length !== 0){
          return pre = (
          <div className='search-result fade'>
            <tr className='table-head-search'>
              <th className='name-th'>Name</th>
              <th className='Last-Price'>Last Price</th>
              <th>Market Cap</th>
              <th>24h Change%</th>
            </tr>
              <tr>
                <td className='name-img-cont name-th'>
                  <p className='name name-th'>{key.toUpperCase()}</p>
                </td>
                <td >{resultData[key]?.usd}</td>
                <td>{resultData[key]?.usd_market_cap}</td>
                <td>
                <span className={JSON.stringify(resultData[key]?.usd_24h_change)?.includes('-')? 'red' : 'green'}>
                {JSON.stringify(resultData[key]?.usd_24h_change)?.includes('-')? '' : '+'}
                {resultData[key]?.usd_24h_change?.toFixed(2)}% 
                </span>
                </td>
              </tr>
            </div>
          )

        }else{
          return pre = (

            !resultData[key]?.usd && object.length === 0?
              <p className='fade p'>Searching...</p>
            :
              <p className='fade p'>Invaild Token Input Or Check Your Network Connectivity</p>   
          )
        }
      })
    }
    getCoin()
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
    if(key.length === 0){
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
      search: ''
    }))
    setChooseLink(false)
    setdone(true)
}

//  reset function that calls clear function when input value is been deleted to zero
const reset = () => {
  if(key.length === 0){
    onClear()
  }
}
  return (
    <div className='Market-cont'>
      <div className='search-cont'>
        <input
          placeholder='Input token full name...'
          className='search-input'
          name='search'
          onChange={handleChange}
          value={key} 
          onKeyUp={reset}
          autoComplete='none'
          autoFocus
          />
        {done ?
          <button
            onClick={onSearch}
            className='btn'
            disabled = {key.length === 0? true : false}
        >
        <SearchIcon className='SearchIcon' />
        <span>Search</span>
      </button>
      :
      <button
        onClick={onClear}
        className='btn-red'
      >
        <DeleteSweepIcon className='DeleteSweepIcon' />
        <span>Clear</span>
      </button>
      }

    </div>
    <div className='table-cont'>
        <table>      
          {
            chooseLink?
              searchData
            :
            data && !chooseLink? 

            <>
            <tr className='table-head'>
              <th className='name-th'>Name</th>
              <th>Last Price</th>
              <th>Market Cap</th>
              <th>24h Change%</th>
            </tr>
            {data}
            </>
            : 
            <>
              <tr>
                <td>check network</td>
              </tr>
            </>
          }
        </table>

    </div>
  </div>
  )
}

export  {CryptoMarket}