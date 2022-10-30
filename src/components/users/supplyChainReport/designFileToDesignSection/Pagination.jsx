/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({
  pageNumbers,
  paginate,
  previousPage,
  nextPage,
  currentPage
}) => {
  

  return (
    <nav className="d-flex justify-content-center align-items-center mr-3">
      <div>
        <h5 className="mb-0 mr-1">{`showing page ${currentPage} of ${pageNumbers?.length}`}</h5>
      </div>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={previousPage} className="page-link">
            &#8249;
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

        <li className="page-item">
          <a onClick={nextPage} className="page-link">
            &#8250;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
