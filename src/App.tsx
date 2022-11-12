import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import useFetch from "./hooks/useFetch";
import Pagination from "./Pagination/Pagination";
import TodoItem from "./Todo/Todo";

import "./App.css";
import SearchField from "./search/SearchField";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPagesLimit, setMinPagesLimit] = useState(1);

  const ITEMS_PER_PAGE = 8;
  const getPagesNumber = todos.length / ITEMS_PER_PAGE;
  const [maxPagesLimit, setMaxPagesLimit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const data = useFetch("https://jsonplaceholder.typicode.com/todos");
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get("search_query");

  useEffect(() => {
    const filteredData = data.filter((item: Todo) =>
      item.title.includes(searchTerm)
    );
    setTodos(filteredData);
    setMaxPagesLimit(getPagesNumber > 10 ? 10 : getPagesNumber);
  }, [data, searchTerm, getPagesNumber]);

  useEffect(() => {
    const handleSearchTerm = () =>
      setSearchTerm(searchString?.split(",")[0] ?? "");
    handleSearchTerm();
  }, [searchString]);

  const getLastIndexPerPage = currentPage * ITEMS_PER_PAGE;
  const getFirstIndexPerPage = getLastIndexPerPage - ITEMS_PER_PAGE;
  const currentItems = todos.slice(getFirstIndexPerPage, getLastIndexPerPage);

  const onChangePage = (event: React.MouseEvent<HTMLElement>) => {
    setCurrentPage(+event.currentTarget.id);
  };

  const handlePrevious = (event: React.MouseEvent<HTMLElement>) => {
    if (minPagesLimit > 1) {
      setMinPagesLimit((prev) => prev - 1);
      setMaxPagesLimit((prev) => prev - 1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLElement>) => {
    if (maxPagesLimit < getPagesNumber) {
      setMinPagesLimit((prev) => prev + 1);
      setMaxPagesLimit((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSearchOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <div className="app">
      <h1 className="title">TODO LIST</h1>
      <SearchField
        searchTerm={searchTerm}
        handleSearchOnChange={handleSearchOnChange}
      />
      <ol className="todosList">
        <span>
          {currentItems.map((item) => (
            <TodoItem key={item.id} data={item} />
          ))}
        </span>
      </ol>

      {getPagesNumber > 1 && (
        <ul className="pagination">
          <li onClick={handlePrevious}>PREVIOUS</li>
          <Pagination
            currentPage={currentPage}
            minPagesLimit={minPagesLimit}
            maxPagesLimit={maxPagesLimit}
            onChangePage={onChangePage}
          />
          <li onClick={handleNext}>NEXT</li>
        </ul>
      )}
    </div>
  );
}

export default App;
