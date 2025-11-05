import cls from './LoadingState.module.css'

const LoadingState = () => {
  return (
    <div className={cls.loadingContainer}>
      <div className={cls.loader}>
        <div className={cls.spinner}></div>
        <div className={cls.loadingText}>
          Загрузка<span className={cls.dots}></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingState