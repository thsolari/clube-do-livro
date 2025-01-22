//import Image from 'next/image'
import React from 'react'
//import capaLivro from '../../public/capaLivro.jpg'
import "@/styles/globals.css";
import Link from 'next/link';

const Card = ({ book }) => {
  // console.log(book)
  return (
    <>    
      { 
        book.map((item)=>{
          const thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
          const language=item.volumeInfo.language;
          const magazine=item.volumeInfo.printType;
          const description=item.volumeInfo.description;
          const title=item.volumeInfo.title;
          const authors=item.volumeInfo.authors;
          const subtitle=item.volumeInfo.subtitle;
          const publishedDate=item.volumeInfo.publishedDate;
          const bookId=item.id
          
          if(thumbnail != undefined && language == "pt" && magazine == "BOOK") 
            { return (
                <>
                  <Link href={{
                    pathname: '/clube/livro',
                    query: {
                      description,
                      title,
                      authors,
                      thumbnail,
                      subtitle,
                      publishedDate,
                      bookId                   
                    }
                  }} >

                    <div className='card' key={book.id}>
                      <img src={thumbnail} width={250} height={350} alt='capa' />
                      <div>
                        <h3 className='title p-3'>{item.volumeInfo.title}</h3>
                      </div>
                    </div>
                  
                  </ Link>
                </>              
              )           
            }
        })
      }
    </>
  )
}

export default Card