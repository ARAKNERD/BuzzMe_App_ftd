import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Handle previous button
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  // Handle next button
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Render page numbers
  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((page) => (
      <button
        key={page}
        className={`btn ${currentPage === page ? "btn-primary" : "btn-dark"}`}
        style={{ borderRight: "1px solid yellow" }}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="pagination">
      {/* Prev Button */}
      <button
        className="btn btn-dark"
        style={{ borderRight: "1px solid yellow" }}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <i className="fa fa-angle-left mr-2"></i> Prev
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className="btn btn-dark"
        style={{ borderRight: "1px solid yellow" }}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next <i className="fa fa-angle-right ml-2"></i>
      </button>
    </div>
  );
};

export default Pagination;
