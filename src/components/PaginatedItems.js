import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ storeValue, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(storeValue);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffSet, setItemOffSet] = useState(0);

  useEffect(() => {
    const endOffSet = itemOffSet + itemsPerPage;
    console.log(`Loading items from ${itemOffSet} to ${endOffSet}`);
    setCurrentItems(storeValue.slice(itemOffSet, endOffSet));
    setPageCount(Math.ceil(storeValue.length / itemsPerPage));
  }, [itemOffSet, storeValue, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffSet = (e.selected * itemsPerPage) % storeValue.length;
    setItemOffSet(newOffSet);
  };

  return (
    <>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
