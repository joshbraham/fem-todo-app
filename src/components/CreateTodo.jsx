import PropTypes from "prop-types";

function CreateTodo({ title, handleChange, addTodo }) {
	return (
		<section className="create-todo">
			<div className="checkbox"></div>
			<input
				className="todo-input"
				type="text"
				placeholder="Create a new todo..."
				onChange={handleChange}
				onKeyUp={addTodo}
				value={title}
			/>
		</section>
	);
}

CreateTodo.propTypes = {
	title: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	addTodo: PropTypes.func.isRequired,
};

export default CreateTodo;
