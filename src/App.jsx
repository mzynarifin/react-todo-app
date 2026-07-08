import { useState, useEffect } from "react";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css"

function App() {
    const [todo, setTodo ] = useState("");

    const [todos, setTodos ] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [filter, setFilter ] = useState("all");

    const [darkMode, setDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem("darkMode");
            return savedTheme
                ? JSON.parse(savedTheme)
                : false;
        } catch {
            return false;
        }
    })

    const [search, setSearch] = useState("");

    console.log(todos);

    function tambahTodo() {
        if(todo.trim() === "") {
            return;
        }

        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                {
                    id: Date.now(),
                    text: todo,
                    completed: false
                }
            ];
        });

        setTodo("");
    }

    function hapusTodo(id) {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => {
                return todo.id !== id;
            });
        });
    }

    function toggleTodo(id) {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id) {
                    return {
                        ...todo, completed: !todo.completed
                    }
                }
                return todo;
            })
        })
    }

    function editTodo(id, newText) {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id ===  id) {
                    return {
                        ...todos, 
                        text: newText
                    }
                }
                return todo;
            })
        })
    }

    function hapusTodoSelesai() {
        const yakin = window.confirm(
            "Hapus semua todo yang selesai?"
        );

        if (!yakin) {
            return;
        }

        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => {
                return !todo.completed;
            });
        });
    }

    const filteredTodos = todos
        .filter((todo) => {
            switch (filter) {
                case "active":
                    return !todo.completed;

                case "completed":
                    return todo.completed;

                default:
                    return true;
            }
        })
        .filter((todo) => {
            return todo.text
                .toLowerCase()
                .includes(search.toLowerCase());
        });

    useEffect(() => {
        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );
    }, [todos]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode])

    useEffect(() => {
        if (darkMode) {
            document.body.style.background =
                "linear-gradient(135deg,#111827,#1f2937)";
        } else {
            document.body.style.background =
                "linear-gradient(135deg,#667eea,#764ba2)";
        }
    }, [darkMode]);

    const completedCount = todos.filter((todo) => {
        return todo.completed;
    }).length;

    return (
        <div className={darkMode ? "container dark" : "container"}>
            <Header 
                todos={todos}/>

            <button className="theme-btn" onClick={() => {
                setDarkMode(!darkMode);
            }}>
                {
                    darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"
                }
            </button>

            <TodoForm 
                todo={todo} 
                setTodo={setTodo} 
                tambahTodo={tambahTodo}/>

            <input
                type="text"
                placeholder="🔍 Cari todo..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                className="search-input"
            />

            <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>
                    Semua
                </button>

                <button onClick={() => setFilter("active")}>
                    Aktif
                </button>

                <button onClick={() => setFilter("completed")}>
                    Selesai
                </button>
            </div>

            {
                filteredTodos.length === 0
                    ? (
                        <p className="empty">
                            Tidak ada todo ditemukan 😢
                        </p>
                    )
                    : (
                        <TodoList
                            todos={filteredTodos}
                            hapusTodo={hapusTodo}
                            toggleTodo={toggleTodo}
                            editTodo={editTodo}
                        />
                    )
            }

            {
                completedCount > 0 && (
                    <button
                        className="clear-btn"
                        onClick={hapusTodoSelesai}
                    >
                        🗑️ Hapus Todo Selesai
                    </button>
                )
            }
        </div>
    );
}

export default App;