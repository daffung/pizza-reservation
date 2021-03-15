import React from 'react';
import Navbar from './components/Navbar'
import {useState} from 'react'
import Main from './components/Main'
import Book from './components/Book'
import Thankyou from './components/Thankyou'

function App() {
  const [page,setPage]=useState(0)
  return (
  <div>
    
    <Navbar setPage={setPage}/>
    
    {page === 0? <Main key={page} setPage={setPage}/>:null}
    {page === 1? <Book key={page} setPage={setPage}/>:null}
    {page === 2? <Thankyou key={page} setPage={setPage}/>:null}
    
    
    </div>
  )

}

export default App;
