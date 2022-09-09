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
  const itemsPerPage = 5;

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

  return (
    <div className="App">
      <h1 className="title">Todo list</h1>
      <ol className="todosList">
        {currentItems.map((item) => (
          <TodoItem data={item} />
        ))}
      </ol>

      <ul className="pagination">
        <li>Previous</li>
        <Pagination pageNumber={getPagesNumber} currentPage={currentPage} onChangePage={onChangePage} />
        <li>Next</li>
      </ul>
    </div>
  );
}

export default App;
