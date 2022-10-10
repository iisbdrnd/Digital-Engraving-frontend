/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({ reportsPerPage, totalReports, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReports / reportsPerPage ); i++) {
    pageNumbers.push(i);
  }

  // console.log("pdfFile", reportsPerPage, totalReports, paginate);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
