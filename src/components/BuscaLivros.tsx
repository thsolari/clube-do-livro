'use client'

import { Search } from 'lucide-react'
import React, { useState } from 'react'
import Card from './Card'
import "@/styles/globals.css";
import axios from "axios"

const BuscaLivros = () => {
  const [search, setSearch]=useState("");
  const [bookData, setData]=useState([]);
  const searchBook=(event: { key: string })=>{
    if(event.key==="Enter") 
    {
      axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAJ6kuTPh14SLqo4k2M1UfFhZEsik1hwXs'+'&maxResults=40')
      .then(res=>setData(res.data.items))
      .catch(err=>console.log(err))
    }
  }
  return (
    <>
      <div className='pagina-pesquisa'>
        
        <div className='caixa-pesquisa'>
          <div className='font'>
          <h1 >Qual livro deseja conhecer?</h1>

          </div>
          <br />
            <div className='search bg-slate-200 p-5 rounded-md'>
              <input type="text"
                value={search}
                onChange={e=>setSearch(e.target.value)}
                onKeyDown={searchBook}
              />             
              <Search className='lupa bg-slate-200 ' />
            </div>
        </div>

          <div className='containerCards'>
            {<Card book={bookData} />}
          </div>
      </div>

    </>
  )
}

export default BuscaLivros