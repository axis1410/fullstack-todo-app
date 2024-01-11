import { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {

  const handleTodoChange = () => {
    
  }

  return (
    <div className="flex flex-col min-w-max">
      {todos.map((todo: Todo) => (
        <div className="border-[1px] border-black w-full mt-1 mx-2 px-5 py-5" key={todo._id}>
          <h1>{todo.title}</h1>
          {todo.isComplete ? <button>✅ Completed</button> : <button>❌ Mark complete</button>}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
