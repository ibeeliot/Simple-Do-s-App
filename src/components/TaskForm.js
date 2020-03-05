import React, { useContext, useState, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'

const TaskForm = () => {
	// useContext for the task List Context context model
	const { addTask, clearList, editItem, editTask } = useContext(TaskListContext)
	const [ title, setTitle ] = useState('')

	// write your helper functions here for submit and for onchange
	const handleChange = (e) => {
		e.preventDefault()
		setTitle(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!editItem) {
			addTask(title)
			setTitle('')
		} else {
			editTask(title, editItem.id)
		}
	}

	// runs every time editItem gets updated
	useEffect(
		() => {
			if (editItem) {
				setTitle(editItem.title)
			} else {
				setTitle('')
			}
		},
		[ editItem ]
	)

	// the value is title because we're using hooks to save our title state & to also add it as a visible task
	return (
		<form className='form' onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={handleChange}
				type='text'
				className='task-input'
				placeholder='Add Task...'
				required
			/>
			<div className='buttons'>
				<button type='submit' className='btn add-task-btn'>
					{/* if editItem is true, useEffect() will run b/c it's in its 2nd parameter*/}
					{editItem ? 'Edit Task' : 'Add Task'}
				</button>
				<button onClick={clearList} className='btn clear-btn'>
					Clear Tasks
				</button>
			</div>
		</form>
	)
}

export default TaskForm
