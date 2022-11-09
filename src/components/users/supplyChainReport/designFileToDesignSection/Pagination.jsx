/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({
  pageNumbers,
  paginate,
  previousPage,
  nextPage,
  gotoFirstPage,
  gotoLastPage,
  currentPage
}) => {
  

  return (
    <nav className="d-flex justify-content-center align-items-center mr-3">
      <div>
        <h5 className="mb-0 mr-1">{`showing page ${currentPage} of ${pageNumbers?.length}`}</h5>
      </div>
      <ul className="pagination">
        {/* move to 1st page */}
        <li className="page-item">
          <a onClick={gotoFirstPage} className="page-link">
            <i class="fa-solid fa-angles-left"></i>
          </a>
        </li>
        {/* move to before page */}
        <li className="page-item">
          <a onClick={previousPage} className="page-link">
            <i class="fa-solid fa-angle-left"></i>
          </a>
        </li>
        {pageNumbers?.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? "page-item active" : "page-item"
            }
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        {/* move to next page  */}
        <li className="page-item">
          <a onClick={nextPage} className="page-link">
            <i class="fa-solid fa-angle-right"></i>
          </a>
        </li>
        {/* move to last page */}
        <li className="page-item">
          <a onClick={gotoLastPage} className="page-link">
            <i class="fa-solid fa-angles-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
