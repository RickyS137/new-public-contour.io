import React from 'react'
import cls from './Pagination.module.css'

const Pagination = ({
  totalItems = 0,
  pageSize = 10,
  currentPage = 1,
  onPageChange = () => {},
  maxVisiblePages = 5
}) => {
  const totalPages = Math.max(0, Math.ceil(totalItems / pageSize))

  if (totalPages <= 1) return null

  const goTo = (p) => {
    if (!p) return
    if (p < 1) p = 1
    if (p > totalPages) p = totalPages
    if (p === currentPage) return
    onPageChange(p)
  }

  const half = Math.floor(maxVisiblePages / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, start + maxVisiblePages - 1)

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className={cls.pagination} aria-label="Пагинация">
      <button
        className={`${cls.pageBtn} ${cls.prev}`}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        Предыдущая
      </button>

      {start > 1 && (
        <>
          <button
            className={`${cls.pageBtn} ${1 === currentPage ? cls.active : ''}`}
            onClick={() => goTo(1)}
          >
            1
          </button>
          {start > 2 && <span className={cls.paginationDots}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`${cls.pageBtn} ${p === currentPage ? cls.active : ''}`}
          onClick={() => goTo(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={cls.paginationDots}>…</span>}
          <button
            className={`${cls.pageBtn} ${totalPages === currentPage ? cls.active : ''}`}
            onClick={() => goTo(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`${cls.pageBtn} ${cls.next}`}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        Следующая
      </button>
    </nav>
  )
}

export default Pagination