import PropTypes from "prop-types";
import checkmark from "../assets/icon-check.svg";
import cross from "../assets/icon-cross.svg";

function Todo({
	todo,
	toggleTodo,
	deleteTodo,
	handleDragStart,
	handleDragEnd,
}) {
	const classComplete = todo.isComplete ? "complete" : "";
	return (
		<div
			id={todo.id}
			className="todo"
			draggable
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="btn-toggle-todo">
				<input
					className="input-checkbox"
					type="checkbox"
					checked={todo.isComplete}
					onChange={() => toggleTodo(todo.id)}
				/>
				<div className="checkmark-container">
					{todo.isComplete && (
						<img
							className="todo__checkmark"
							src={checkmark}
							alt="A checkmark"
						/>
					)}
				</div>
			</div>
			<span className={`todo__title ${classComplete}`}>{todo.title}</span>
			<button className="btn-delete-todo" onClick={() => deleteTodo(todo.id)}>
				<img src={cross} alt="Delete todo" />
			</button>
		</div>
	);
}

Todo.propTypes = {
	todo: PropTypes.object.isRequired,
	toggleTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	handleDragStart: PropTypes.func.isRequired,
	handleDragEnd: PropTypes.func.isRequired,
};

export default Todo;
