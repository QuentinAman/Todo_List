import React, { useState } from "react";

export const TodoItem = ({ item, removeTodo, updateTodo }) => {
	const [todo, setTodo] = useState(item);

	return (
		<li>
			<input
				value={todo.text}
				onChange={(e) =>
					setTodo({ ...todo, text: e.currentTarget.value })
				}
			/>
			<select
				value={todo.priority}
				onChange={(e) =>
					setTodo({ ...todo, priority: e.currentTarget.value })
				}
			>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<select
				value={todo.status}
				onChange={(e) =>
					setTodo({ ...todo, status: e.currentTarget.value })
				}
			>
				<option value="waiting">Waiting</option>
				<option value="pending">Pending</option>
				<option value="completed">Completed</option>
			</select>

			<img src="/edit.svg" alt="edit" onClick={() => updateTodo(todo)} />
			<img src="/delete.svg" alt="delete" onClick={removeTodo} />
		</li>
	);
};
