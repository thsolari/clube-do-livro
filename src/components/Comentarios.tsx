import React, { useState } from 'react'
import "@/styles/globals.css";
import { Button } from './ui/button';


const Comentarios = () => {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  return (
    <>
    <div className='main-container'>
      <div className='comment-flexbox'>
        <h3 className='comment-text'>Comentários</h3>
        <textarea
          value={comment}
          onChange={onChangeHandler}
          className='input-box'
          />
        <Button onClick={onClickHandler} className=' mt-6' type="submit">
          Enviar
        </Button>
          {comments.map((text) => (
            <div className='comment-container'>{text}</div>
          ))}
      </div>
    </div>
    </>
    )
}

export default Comentarios