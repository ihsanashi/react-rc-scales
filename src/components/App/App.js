import React from 'react';
import './App.css';
import {useForm} from 'react-hook-form';
import {calculateAxleLoad} from '../services/calcService';

export default function App() {

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    let result = calculateAxleLoad(data);
    console.log('result', result);
  }

  return (
    <div className="body">
      <div className="wrapper"></div>
      <h1>RC Scales</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Front Left' {...register("frontLeft", { required: true })}/>
        {errors.frontLeft && 'Front Left value is required!'}
        <input placeholder='Front Right' {...register("frontRight", { required: true })}/>
        {errors.frontRight && 'Front Right value is required!'}
        <input placeholder='Rear Left' {...register("rearLeft", { required: true })}/>
        {errors.rearLeft && 'Rear Left value is required!'}
        <input placeholder='Rear Right' {...register("rearRight", { required: true })}/>
        {errors.rearRight && 'Rear Right value is required!'}

        <input type="submit"/>
      </form>
    </div>
  )
}