import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { calculateAxleLoad } from '../services/calcService';
import './App.css';

export default function App() {
  let result = {};
  const [balance, setBalanceObj] = useState(result);
  const [showBalance, setShowBalance] = useState(false);

  const showInputRef = useRef();
  const showBalanceRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Calculate balance values
    result = calculateAxleLoad(data);
    setBalanceObj(result);
    setShowBalance(true);
    scrollTo(showBalanceRef);
  };

  const resetValues = () => {
    // Scroll to weight input
    scrollTo(showInputRef);
    // Reset form
    reset();
    // Hide balance displays
    // 500ms timeout to enable scroll to work properly
    setTimeout(function () {
      setShowBalance(false);
    }, 200);
  };

  const scrollTo = (ref) => {
    if (ref) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <section className='top__inputs' ref={showInputRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid__container'>
            <h2 className='section__title front__title'>Front</h2>
            <div className='input__container front__left'>
              <label className='label'>Front left</label>
              <input
                autoFocus
                type='number'
                step='any'
                inputMode='decimal'
                pattern='\d*'
                className='input__value'
                placeholder='FL'
                {...register('frontLeft', { required: true })}
              />
              {errors.frontLeft && (
                <small className='error-msg'>
                  Front Left value is required!
                </small>
              )}
            </div>
            <div className='car__body'>
              <img src='./rc-car.svg' alt='RC car' />
            </div>
            <div className='input__container front__right'>
              <label className='label'>Front right</label>
              <input
                type='number'
                step='any'
                inputMode='decimal'
                pattern='\d*'
                className='input__value'
                placeholder='FR'
                {...register('frontRight', { required: true })}
              />
              {errors.frontRight && (
                <small className='error-msg'>
                  Front Right value is required!
                </small>
              )}
            </div>
            <div className='input__container rear__left'>
              <label className='label'>Rear left</label>
              <input
                type='number'
                step='any'
                inputMode='decimal'
                pattern='\d*'
                className='input__value'
                placeholder='RL'
                {...register('rearLeft', { required: true })}
              />
              {errors.rearLeft && (
                <small className='error-msg'>
                  Rear Left value is required!
                </small>
              )}
            </div>
            <h2 className='section__title rear__title'>Rear</h2>
            <div className='input__container rear__right'>
              <label className='label'>Rear right</label>
              <input
                type='number'
                step='any'
                inputMode='decimal'
                pattern='\d*'
                className='input__value'
                placeholder='RR'
                {...register('rearRight', { required: true })}
              />
              {errors.rearRight && (
                <small className='error-msg'>
                  Rear Right value is required!
                </small>
              )}
            </div>
          </div>
          <button className='btn submit full-width' type='submit'>
            Calculate
          </button>
        </form>
      </section>

      {showBalance && (
        <section ref={showBalanceRef}>
          <section className='total__weight'>
            <h5>total weight</h5>
            <h2>{balance.totalWeight}g</h2>
          </section>
          <section className='weight__balance'>
            <h2 className='section__title'>weight balance</h2>
            <div className='grid__container'>
              <div className='input__container'>
                <label className='label'>Front</label>
                <h4 className='weight__balance__value'>
                  {balance.frontBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.frontBalancePCT}%
                </h2>
              </div>
              <div className='input__container'>
                <label className='label'>rear</label>
                <h4 className='weight__balance__value'>
                  {balance.rearBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.rearBalancePCT}%
                </h2>
              </div>
              <div className='input__container'>
                <label className='label'>left</label>
                <h4 className='weight__balance__value'>
                  {balance.leftBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.leftBalancePCT}%
                </h2>
              </div>
              <div className='input__container'>
                <label className='label'>right</label>
                <h4 className='weight__balance__value'>
                  {balance.rightBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.rightBalancePCT}%
                </h2>
              </div>
            </div>
          </section>
          <section className='diagonal__balance'>
            <h2 className='section__title'>diagonal balance</h2>
            <div className='grid__container'>
              <div className='input__container'>
                <label className='label'>FL + RR</label>
                <h4 className='weight__balance__value'>
                  {balance.flrrBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.flrrBalancePCT}%
                </h2>
              </div>
              <div className='input__container'>
                <label className='label'>FR + RL</label>
                <h4 className='weight__balance__value'>
                  {balance.frrlBalance}g
                </h4>
                <h2 className='weight__balance__percentage'>
                  {balance.frrlBalancePCT}%
                </h2>
              </div>
            </div>
          </section>
          <button
            className='btn reset full-width'
            type='button'
            onClick={() => resetValues()}
          >
            Reset Values
          </button>
        </section>
      )}
    </main>
  );
}
