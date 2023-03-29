import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className='scale-[4] mt-40'>
      <div className={`${styles.loader}`} />
    </div>
  );
}
