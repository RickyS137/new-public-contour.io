import React from 'react'

const Pagination = ({
  totalItems = 0,
  pageSize = 10,
  currentPage = 1,
  onPageChange = () => {},
  maxVisiblePages = 5 // maximum number of page links to show (including current)
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

  // Calculate visible page range with ellipses support
  const half = Math.floor(maxVisiblePages / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, start + maxVisiblePages - 1)

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="pagination" aria-label="Пагинация">
      <button
        className="page-btn prev"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        ‹ Предыдущая
      </button>

      {start > 1 && (
        <>
          <button className={`page-btn ${1 === currentPage ? 'active' : ''}`} onClick={() => goTo(1)}>
            1
          </button>
          {start > 2 && <span className="pagination-dots">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => goTo(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pagination-dots">…</span>}
          <button className={`page-btn ${totalPages === currentPage ? 'active' : ''}`} onClick={() => goTo(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className="page-btn next"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        Следующая ›
      </button>
    </nav>
  )
}

export default Pagination