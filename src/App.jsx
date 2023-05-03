import { useRef, useState } from "react";
import CreateTodo from "./components/CreateTodo.jsx";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

import "./styles/App.css";

// const hardCodedTodos = [
// 	{ id: 0, isComplete: true, title: "Complete online JavaScript course" },
// 	{ id: 1, isComplete: true, title: "10 minutes meditation" },
// 	{ id: 2, isComplete: false, title: "Pick up groceries" },
// 	{ id: 3, isComplete: false, title: "Finish essays" },
// 	{ id: 4, isComplete: false, title: "Frontend mentor challenge" },
// 	{ id: 5, isComplete: false, title: "Read for 1 hour" },
// ];

function App() {
	const [theme, setTheme] = useState(() =>
		window.matchMedia("(prefers-color-scheme: light").matches ? "light" : "dark"
	);

	const [title, setTitle] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState("all");
	const todoListRef = useRef(null);
	const order = useRef(todos.map((todo) => todo.id));

	const filteredTodos = (() => {
		const orderedTodos = order.current
			.filter((id) => todos.find((todo) => todo.id === id))
			.map((id) => todos.find((todo) => todo.id === id));
		switch (filter) {
			case "all":
				return orderedTodos;
			case "active":
				return orderedTodos.filter((todo) => !todo.isComplete);
			case "completed":
				return orderedTodos.filter((todo) => todo.isComplete);
		}
	})();

	const handleChange = ({ target }) => {
		setTitle(target.value);
	};

	const handleDragStart = ({ target }) => {
		target.classList.add("dragging");
	};

	const handleDragEnd = ({ target }) => {
		target.classList.remove("dragging");
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		const y = event.clientY;
		const todoList = todoListRef.current;
		const dragged = todoList.querySelector(".dragging");
		const closest = event.target.closest(".todo");

		if (closest == null) {
			const todoListRect = todoList.getBoundingClientRect();
			if (todoListRect.top > y) {
				todoList.prepend(dragged);
			} else if (todoListRect.bottom < y) {
				todoList.append(dragged);
			} else {
				return;
			}
		} else {
			const closestRect = closest.getBoundingClientRect();
			if (
				closestRect.top > y ||
				(closestRect.top + closestRect.bottom) / y > 2
			) {
				todoList.insertBefore(dragged, closest);
			} else if (
				closestRect.bottom < y ||
				(closestRect.top + closestRect.bottom) / y < 2
			) {
				todoList.insertBefore(dragged, closest.nextSibling);
			}
		}

		if (filter === "all") {
			order.current = [...todoList.querySelectorAll(".todo")].map((todo) =>
				Number(todo.id)
			);
		}
	};

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.body.classList.remove(theme);
		document.body.classList.add(newTheme);
	};

	const addTodo = (event) => {
		if (event.key === "Enter") {
			const id = Date.now();
			order.current.push(id);
			setTodos((currentTodos) => [
				...currentTodos,
				{ id, isComplete: false, title: event.target.value },
			]);
			setTitle("");
		}
	};

	const toggleTodo = (id) => {
		setTodos((currentTodos) =>
			currentTodos.map((todo) => {
				return todo.id === id
					? { ...todo, isComplete: !todo.isComplete }
					: todo;
			})
		);
	};

	const deleteTodo = (id) => {
		setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
	};

	const clearCompletedTodos = () => {
		setTodos((currentTodos) => currentTodos.filter((todo) => !todo.isComplete));
	};

	const dragHandlers = {
		handleDragStart,
		handleDragEnd,
		handleDragOver,
	};

	return (
		<>
			<Header theme={theme} toggleTheme={toggleTheme} />
			<main role="main">
				<CreateTodo
					title={title}
					handleChange={handleChange}
					addTodo={addTodo}
				/>
				<TodoList
					{...dragHandlers}
					listRef={todoListRef}
					todos={filteredTodos}
					toggleTodo={toggleTodo}
					deleteTodo={deleteTodo}
					filter={filter}
					setFilter={setFilter}
					numComplete={todos.reduce(
						(count, todo) => count + !todo.isComplete,
						0
					)}
					clearCompletedTodos={clearCompletedTodos}
				/>
			</main>
			<Footer />
		</>
	);
}

export default App;
