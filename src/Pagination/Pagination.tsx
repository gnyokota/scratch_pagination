import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  minPagesLimit,
  maxPagesLimit,
  onChangePage,
}: {
  currentPage: number;
  minPagesLimit: number;
  maxPagesLimit: number;
  onChangePage: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div className={styles.pageNumber}>
      {Array.from(
        {length: maxPagesLimit - minPagesLimit + 1},
        (_, i) => i + minPagesLimit
      ).map(
        (page: number) =>
          page < maxPagesLimit + 1 &&
          page > minPagesLimit - 1 && (
            <li
              key={page}
              id={page.toString()}
              onClick={onChangePage}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </li>
          )
      )}
    </div>
  );
};

export default Pagination;
