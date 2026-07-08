function TodoForm({todo, setTodo, tambahTodo}) {
    return (
        <div className="todo-form">
            <input 
                type="text"
                placeholder="Masukkan todo...."
                value={todo}
                onChange={(event) => {
                    setTodo(event.target.value)
                }}
            />

            <button onClick={tambahTodo}>
                Tambah
            </button>
        </div>
    )
}

export default TodoForm;