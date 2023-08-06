import React, { useState } from "react";
import "./todo.css";

const TodoList = () => {
  const [newtodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [showDelete, setShowDelete] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [editingText, setEditText] = useState("");

  const DragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const DragOver = (event) => {
    event.preventDefault();
  };

  const DragEnd = (event, index) => {
    const dragIndex = event.dataTransfer.getData("index");
    const newlist = [...todos];
    const dragtodo = newlist[dragIndex];
    newlist.splice(dragIndex, 1);
    newlist.splice(index, 0, dragtodo);
    setTodos(newlist);
    // console.log(setTodos);
  };

  const Additems = () => {
    if (newtodo.trim() !== "") {
      setTodos([...todos, newtodo]);
      setEditText("");
      setNewTodo("");
    }
    
  };

  const Removeitems = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
    console.log(setEditText);
  };

  const EndEditing = (index) => {
    const newTodos = [...todos];
    newTodos[index] = editingText;
    setTodos(newTodos);
    setEditIndex(null);
  };

  return (
    <div className="todo-list">
      <div>
        <h1>Todo List App</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Add items or names"
            value={newtodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="button" onClick={Additems}>
            Add
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              draggable={true}
              onDragStart={(event) => DragStart(event, index)}
              onDragOver={DragOver}
              onDrop={(event) => DragEnd(event, index)}
              // onMouseOver={() => setShowDelete(true)}
              // onMouseLeave={() => setShowDelete(false)}
              onDoubleClick={() => startEditing(index)}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(event) => setEditText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") EndEditing(index);
                  }}
                  onBlur={() => EndEditing(index)}
                  autoFocus
                />
              ) : (
                <span className="spn" onDoubleClick={() => startEditing(index)}>
                  {todo}
                </span>
              )}

              <button onClick={() => Removeitems(index)}>
                <i className="bi bi-x-circle red"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;


