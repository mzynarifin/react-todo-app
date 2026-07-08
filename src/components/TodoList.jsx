import { useState } from "react";

function TodoList({
    todos,
    hapusTodo,
    toggleTodo,
    editTodo
}) {
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    function mulaiEdit(todo) {
        setEditId(todo.id);
        setEditText(todo.text);
    }

    function simpanEdit() {
        if (editText.trim() === "") {
            return;
        }

        editTodo(editId, editText);

        setEditId(null);
        setEditText("");
    }

    return (
        <div>
            {
                todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="todo-item"
                    >
                        <div className="todo-left">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => {
                                    toggleTodo(todo.id);
                                }}
                            />

                            {
                                editId === todo.id ? (
                                    <input
                                        value={editText}
                                        onChange={(e) => {
                                            setEditText(
                                                e.target.value
                                            );
                                        }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            textDecoration:
                                                todo.completed
                                                    ? "line-through"
                                                    : "none"
                                        }}
                                    >
                                        {todo.text}
                                    </span>
                                )
                            }
                        </div>

                        <div className="todo-actions">
                            {
                                editId === todo.id ? (
                                    <>
                                        <button
                                            onClick={simpanEdit}
                                        >
                                            💾
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditId(null);
                                                setEditText("");
                                            }}
                                        >
                                            ❌
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                mulaiEdit(todo);
                                            }}
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            onClick={() => {
                                                hapusTodo(todo.id);
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default TodoList;