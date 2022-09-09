import styles from "./Pagination.module.css";

const Pagination = ({
  pageNumber = 1,
  currentPage,
  onChangePage,
}: {
  pageNumber: number;
  currentPage: number;
  onChangePage: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div className={styles.pageNumber}>
      {Array.from({length: pageNumber}, (_, k) => k + 1).map((page: number) => (
        <li
          key={page}
          id={page.toString()}
          onClick={onChangePage}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {page}
        </li>
      ))}
    </div>
  );
};
//14:25

export default Pagination;
