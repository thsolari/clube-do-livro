'use client'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import "@/styles/globals.css";
import Link from 'next/link';
import Comentarios from '@/components/Comentarios';
//import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';

function page({ params, searchParams }) {
  // params: Promise<{ livro: string }>;
  // const livro = (await params).livro;
  const id = React.use(searchParams);

  
  function convertDate(date_string) {
    let a = new Date(date_string);
    let b = a.toLocaleDateString().split("/");
    return b[1] + "/" + b[0] + "/" + b[2]
  }
  const dataLivro = ".data-livro"

  console.log(convertDate(dataLivro))
  
  return (
    <>
      <div className='pagina-livro '>
        <button className='voltar'>
          <Link href={'/clube'}>
            <ArrowLeft />
          </Link>
        </button>

        {/* <h1>{livro}</h1> */}

        <div className="info-com-capa">
          <Image src={id.thumbnail} alt="capa" priority={true} width={0} height={0} sizes='100vw' style={{ width:'200px', height: 'auto' }} />
          <div className="info">
            <h1>{id.title}</h1>
            <h2>{id.subtitle}</h2>
            <br />
            <h4>{id.authors} <span className='data-livro'>{id.publishedDate}</span></h4><br />
            <br />

            <h4 className='description'>{id.description}</h4>
          </div>
        </div>
        <br />
        <div className='comentarios'>
          <Comentarios />
        </div>
      </div>
      
    </>
  );
}

export default page