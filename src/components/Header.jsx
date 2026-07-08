function Header({todos}) {
    const totalTodo = todos.length;

    const completedTodo = todos.filter((todo) => {
        return todo.completed;
    }).length

    const pendingTodo = totalTodo - completedTodo;

    return (
        <header>
            <h1>📝 Todo List</h1>
            <p>Belajar React bersama Muzayin</p>
            <div className="todo-info">
                <h3>Total Todo: {totalTodo} </h3>
                <h3>Todo Selesai: {completedTodo} </h3>
                <h3>Todo Belum: {pendingTodo}</h3>
            </div>
        </header>
    );
}

export default Header;