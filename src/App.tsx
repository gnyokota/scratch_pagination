import {useEffect, useState} from "react";
import "./App.css";
import Pagination from "./Pagination/Pagination";
import TodoItem from "./Todo/Todo";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPagesLimit, setMinPagesLimit] = useState(1);
  const [maxPagesLimit, setMaxPagesLimit] = useState(10);

  const itemsPerPage = 8;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
    };
    getData();
  }, []);

  const getPagesNumber = todos.length / itemsPerPage;
  const getLastIndexPerPage = currentPage * itemsPerPage;
  const getFirstIndexPerPage = getLastIndexPerPage - itemsPerPage;
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

  return (
    <div className="app">
      <h1 className="title">TODO LIST</h1>
      <ol className="todosList">
        <span>
          {currentItems.map((item) => (
            <TodoItem data={item} />
          ))}
        </span>
      </ol>

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
    </div>
  );
}

export default App;
