import PropTypes from "prop-types";
import Todo from "./Todo";

function TodoList({
	listRef,
	todos,
	toggleTodo,
	deleteTodo,
	filter,
	setFilter,
	handleDragStart,
	handleDragEnd,
	handleDragOver,
	numComplete,
	clearCompletedTodos,
}) {
	return (
		<>
			<section ref={listRef} className="todo-list" onDragOver={handleDragOver}>
				{todos.length === 0 ? (
					<div className="no-list-container">
						<span className="no-list">No items.</span>
					</div>
				) : (
					todos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							toggleTodo={toggleTodo}
							deleteTodo={deleteTodo}
							handleDragStart={handleDragStart}
							handleDragEnd={handleDragEnd}
						/>
					))
				)}
			</section>
			<section className="toolbar">
				<div className="toolbar__top">
					<span className="completed-todos-counter">
						{numComplete} item{numComplete !== 1 ? "s" : ""} left
					</span>
					<button className="btn-clear-todos" onClick={clearCompletedTodos}>
						Clear Completed
					</button>
				</div>
				<div className="toolbar__bottom">
					<button
						className={`btn-filter ${filter === "all" ? "active" : ""}`}
						onClick={() => setFilter("all")}
					>
						All
					</button>
					<button
						className={`btn-filter ${filter === "active" ? "active" : ""}`}
						onClick={() => setFilter("active")}
					>
						Active
					</button>
					<button
						className={`btn-filter ${filter === "completed" ? "active" : ""}`}
						onClick={() => setFilter("completed")}
					>
						Completed
					</button>
				</div>
			</section>
		</>
	);
}

TodoList.propTypes = {
	listRef: PropTypes.any.isRequired,
	todos: PropTypes.array.isRequired,
	toggleTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
	handleDragStart: PropTypes.func.isRequired,
	handleDragEnd: PropTypes.func.isRequired,
	handleDragOver: PropTypes.func.isRequired,
	numComplete: PropTypes.number.isRequired,
	clearCompletedTodos: PropTypes.func.isRequired,
};

export default TodoList;
