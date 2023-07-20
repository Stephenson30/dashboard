import { Header } from '../src/component/Header';
import { Crypto, Nfts } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CellTowerRoundedIcon from '@mui/icons-material/CellTowerRounded';
import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='App-sub-container'>
        <CellTowerRoundedIcon className='live'/>
        <h1>Real Time Oracle</h1>
      </div>
      <div style={{paddingTop: '10rem', width: '100%'}}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element= {<Header />}>
                <Route index element = {<Crypto />}/>
                <Route path='/nfts' element = {<Nfts />}/>
              </Route>
          </Routes>
        </BrowserRouter>  
      </div>
    </div>
  );
}

export default App;
