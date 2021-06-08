import React, { useState, useRef } from 'react';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { calculateAxleLoad } from '../services/calcService';

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
    setTimeout(function(){ 
      setShowBalance(false);
    }, 10);
  };

  const scrollTo = (ref) => {
    if (ref) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.car__image} ref={ showInputRef }>
        <img src='./rc-car.svg' alt='RC car' />
      </section>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.section__title}>Front</h2>
          <div className={styles.grid__container}>
            <div className={styles.input__container}>
              <label className={styles.label}>Front left</label>
              <input
                className={styles.input__value}
                placeholder='FL'
                {...register('frontLeft', { required: true })}
              />
              {errors.frontLeft && 'Front Left value is required!'}
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>Front right</label>
              <input
                className={styles.input__value}
                placeholder='FR'
                {...register('frontRight', { required: true })}
              />
              {errors.frontRight && 'Front Right value is required!'}
            </div>
          </div>
          <h2 className={styles.section__title}>Rear</h2>
          <div className={styles.grid__container}>
            <div className={styles.input__container}>
              <label className={styles.label}>Rear left</label>
              <input
                className={styles.input__value}
                placeholder='RL'
                {...register('rearLeft', { required: true })}
              />
              {errors.rearLeft && 'Rear Left value is required!'}
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>Front right</label>
              <input
                className={styles.input__value}
                placeholder='RR'
                {...register('rearRight', { required: true })}
              />
              {errors.rearRight && 'Rear Right value is required!'}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>

      { showBalance &&
      <section ref={ showBalanceRef }>
        <section className={styles.total__weight}>
          <h5>total weight</h5>
          <h2>{ balance.totalWeight }g</h2>
        </section>
        <section className={styles.weight__balance}>
          <h2 className={styles.section__title}>weight balance</h2>
          <div className={styles.grid__container}>
            <div className={styles.input__container}>
              <label className={styles.label}>Front</label>
              <h4 className={styles.weight__balance__value}>{ balance.frontBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.frontBalancePCT }%</h2>
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>rear</label>
              <h4 className={styles.weight__balance__value}>{ balance.rearBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.rearBalancePCT }%</h2>
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>left</label>
              <h4 className={styles.weight__balance__value}>{ balance.leftBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.leftBalancePCT }%</h2>
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>right</label>
              <h4 className={styles.weight__balance__value}>{ balance.rightBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.rightBalancePCT }%</h2>
            </div>
          </div>
        </section>
        <section className={styles.diagonal__balance}>
          <h2 className={styles.section__title}>diagonal balance</h2>
          <div className={styles.grid__container}>
            <div className={styles.input__container}>
              <label className={styles.label}>FL + RR</label>
              <h4 className={styles.weight__balance__value}>{ balance.flrrBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.flrrBalancePCT }%</h2>
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>FR + RL</label>
              <h4 className={styles.weight__balance__value}>{ balance.frrlBalance }g</h4>
              <h2 className={styles.weight__balance__percentage}>{ balance.frrlBalancePCT }%</h2>
            </div>
          </div>
        </section>
        <button type="button" onClick={() => resetValues()}>Reset Values</button>
      </section>
      }
    </main>
  );
}
