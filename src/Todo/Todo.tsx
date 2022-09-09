import {Todo} from "../App";

const TodoItem = ({data}: {data: Todo}) => {
  return (
    <li>
      <h3>{data.title}</h3>
      <p>Completed? {data.completed.toString()}</p>
    </li>
  );
};

export default TodoItem;
