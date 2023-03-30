import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className='md:scale-[4] scale-[2] md:mt-96 mt-80'>
      <div className={`${styles.loader}`} />
    </div>
  );
}
