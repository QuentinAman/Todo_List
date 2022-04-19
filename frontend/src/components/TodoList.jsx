import React, { useEffect, useState } from "react";
import { TodoItem } from "./";

export const TodoList = () => {
	const [newTodo, setNewTodo] = useState({
		text: "",
		priority: "medium",
		status: "waiting",
	});

	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async (url, method = "GET", body = {}) => {
		setLoading(true);
		setError(null);
		try {
			const options = {
				method,
				body:
					method === "HEAD" || method === "GET"
						? undefined
						: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(
				`http://localhost:3500/${url}`,
				options
			);
			const json = await response.json();
			return json;
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const addTodo = async () => {
		if (newTodo.text === "") {
			setError("Text field is empty");
			return;
		}
		const data = await fetchData("todos", "POST", newTodo);

		setNewTodo({
			text: "",
			priority: "medium",
			status: "waiting",
		});
		setTodos(data);
	};

	const removeTodo = async (id) => {
		const data = await fetchData(`todos/${id}`, "DELETE");

		setTodos(data);
	};

	const updateTodo = async (id, todo) => {
		const data = await fetchData(`todos/${id}`, "PUT", todo);

		setTodos(data);
	};

	const getTodos = async () => {
		const data = await fetchData("todos");

		setTodos(data);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<div className="container-h1">
				<h1>Todo List</h1>
			</div>
			<div className="container-new-todo">
				<label htmlFor="new-todo">New task</label>
				<input
					id="new-todo"
					type="text"
					value={newTodo.text}
					onChange={(e) =>
						setNewTodo({ ...newTodo, text: e.target.value })
					}
				/>
				<select
					value={newTodo.priority}
					onChange={(e) =>
						setNewTodo({ ...newTodo, priority: e.target.value })
					}
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>

				<select
					value={newTodo.status}
					onChange={(e) =>
						setNewTodo({ ...newTodo, status: e.target.value })
					}
				>
					<option value="waiting">Waiting</option>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
				</select>

				<button disabled={loading} onClick={addTodo}>
					Add todo
				</button>
			</div>

			<ul className="list-todo">
				{todos.map((todo) => (
					<TodoItem
						key={todo._id}
						removeTodo={() => removeTodo(todo._id)}
						updateTodo={(t) => updateTodo(todo._id, t)}
						item={todo}
					/>
				))}
			</ul>

			<p>{error}</p>
		</div>
	);
};
