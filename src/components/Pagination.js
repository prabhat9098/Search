import React from 'react';

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  
  const pages = isFinite(totalPage) ? Array.from({ length: totalPage }, (_, i) => i + 1) : [];

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
