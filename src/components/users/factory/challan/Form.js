import React from 'react'
import { useParams } from 'react-router-dom';

const Form = () => {


  const { id } = useParams();
  console.log(id)
  return (
    <div>Form</div>
  )
}

export default Form