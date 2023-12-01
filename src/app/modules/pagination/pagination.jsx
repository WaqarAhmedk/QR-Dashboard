import React, {useState, useEffect} from 'react'
import {Pagination} from 'antd'

const PaginationComponent = ({totalItems, itemsPerPage, onPageChange}) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // When the current page changes, calculate the offset and notify the parent component
    const offset = (currentPage - 1) * itemsPerPage
    onPageChange(offset)
  }, [currentPage, itemsPerPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{width: '100%', display: 'flex', marginTop: '20px', justifyContent: 'flex-end'}}>
      <div>
        {totalItems > 0 && (
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            style={{width: '100%'}}
          />
        )}
      </div>
    </div>
  )
}

export default PaginationComponent
