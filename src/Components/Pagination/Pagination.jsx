import classes from "./Pagination.module.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
  const pageButtons = [];

  pageButtons.push(
    <button
      key={1}
      className={classes.page}
      onClick={() => setCurrentPage(1)}
      disabled={currentPage === 1}
    >
      1
    </button>,
  );

  if (currentPage > 3) {
    pageButtons.push(
      <span key="start-ellipsis" className={classes.page}>
        ...
      </span>,
    );
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(pageCount - 1, currentPage + 1);
    i++
  ) {
    pageButtons.push(
      <button
        key={i}
        className={classes.page}
        onClick={() => setCurrentPage(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>,
    );
  }

  if (currentPage < pageCount - 2) {
    pageButtons.push(
      <span key="end-ellipsis" className={classes.page}>
        ...
      </span>,
    );
  }

  if (pageCount > 1) {
    pageButtons.push(
      <button
        key={pageCount}
        className={classes.page}
        onClick={() => setCurrentPage(pageCount)}
        disabled={currentPage === pageCount}
      >
        {pageCount}
      </button>,
    );
  }

  return (
    <div className={classes.paginationWrapper}>
      <button
        className={classes.pageChange}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrPrevious />
      </button>
      {pageButtons}
      <button
        className={classes.pageChange}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
