import React from 'react';
import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { calculateAxleLoad } from '../services/calcService';

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let result = calculateAxleLoad(data);
    console.log('result', result);
  };

  return (
    <main className={styles.main}>
      <section className={styles.car__image}>
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
                placeholder='333.8g'
                {...register('frontLeft', { required: true })}
              />
              {errors.frontLeft && 'Front Left value is required!'}
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>Front right</label>
              <input
                className={styles.input__value}
                placeholder='325.6g'
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
                placeholder='334.7g'
                {...register('rearLeft', { required: true })}
              />
              {errors.rearLeft && 'Rear Left value is required!'}
            </div>
            <div className={styles.input__container}>
              <label className={styles.label}>Front right</label>
              <input
                className={styles.input__value}
                placeholder='335.5g'
                {...register('rearRight', { required: true })}
              />
              {errors.rearRight && 'Rear Right value is required!'}
            </div>
          </div>
        </form>
      </section>
      <section className={styles.total__weight}>
        <h5>total weight</h5>
        <h2>1329.6g</h2>
      </section>
      <section className={styles.weight__balance}>
        <h2 className={styles.section__title}>weight balance</h2>
        <div className={styles.grid__container}>
          <div className={styles.input__container}>
            <label className={styles.label}>Front</label>
            <h4 className={styles.weight__balance__value}>659.4g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
          <div className={styles.input__container}>
            <label className={styles.label}>rear</label>
            <h4 className={styles.weight__balance__value}>670.2g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
          <div className={styles.input__container}>
            <label className={styles.label}>left</label>
            <h4 className={styles.weight__balance__value}>668.5g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
          <div className={styles.input__container}>
            <label className={styles.label}>right</label>
            <h4 className={styles.weight__balance__value}>661.1g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
        </div>
      </section>
      <section className={styles.diagonal__balance}>
        <h2 className={styles.section__title}>diagonal balance</h2>
        <div className={styles.grid__container}>
          <div className={styles.input__container}>
            <label className={styles.label}>FL + RR</label>
            <h4 className={styles.weight__balance__value}>660.3g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
          <div className={styles.input__container}>
            <label className={styles.label}>FR + RL</label>
            <h4 className={styles.weight__balance__value}>669.3g</h4>
            <h2 className={styles.weight__balance__percentage}>50%</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
