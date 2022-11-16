import { useRecoilState, useRecoilValue } from "recoil";
import {TodoListStates, filteredTodoListState} from "./recoil";
import TodoItemCreater from "./TodoItemCreater";
import TodoItem from "./TodoItem";
import TodoListFilters from "./TodoListFilters";

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState)

  return (
    <>
      <TodoListStates />
      <TodoListFilters />
      <TodoItemCreater />
    
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

export default TodoList;