import React, { createContext, useState, useEffect } from 'react'

// package that helps create ids for properties
// weird syntax but you have to follow this for destructuring
import { v4 as uuid } from 'uuid'

export const TaskListContext = createContext()

// this creates a "context" state for us
const TaskListContextProvider = (props) => {
	// initial state will be the items "tasks" set into the local storage OR a blank array
	const initialState = localStorage.getItem('tasks') || []
	// destructuring from the useState context
	// create initial object state for the "tasks" object
	const [ tasks, setTasks ] = useState(initialState)

	const [ editItem, setEditItem ] = useState(null)

	// usEffect to save into local storage
	useEffect(
		() => {
			localStorage.setItem('task', JSON.stringify(tasks))
		},
		[ tasks ]
	)

	// this function adds to the task view
	const addTask = (title) => {
		setTasks([ ...tasks, { title, id: uuid() } ])
	}

	// this function removes from the task view
	const removeTask = (id) => {
		// instead of "deleting" a task, we just filter out all TASKS
		// that are NOT matching the input's id
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const clearList = () => {
		setTasks([])
	}

	const findItem = (id) => {
		const item = tasks.find((task) => task.id === id)
		// setTasks([ ...tasks, { title: newMsg } ])
		// by setting this an "edit" item, you're saying that this will be the object that you can edit
		setEditItem(item)
	}

	// using context in order to return object to be manipulated
	const editTask = (title, id) => {
		const newTasks = tasks.map((task) => (task.id === id ? { title, id } : task))

		console.log(newTasks)

		setTasks(newTasks)
		setEditItem(null)
	}

	// the reason why you want to spread out the previous tasks is so it knows that you want to add a NEW state onto the whole previous object
	// value is the stuff you're basically "destructuring out from the state to be used, so be specific with the specific props you're passing down

	return (
		<TaskListContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				clearList,
				findItem,
				editTask,
				editItem
			}}
		>
			{props.children}
		</TaskListContext.Provider>
	)
}

export default TaskListContextProvider
