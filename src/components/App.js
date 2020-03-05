import React from 'react'
import TaskListContextProvider from '../context/TaskListContext'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import Header from '../Header'
// importing a scroll component to scroll/not scroll

// importing style
import '../App.css'

const App = () => {
	return (
		<TaskListContextProvider>
			<Header />
			<div className='container'>
				<div className='app-wrapper'>
					<div className='main'>
						<TaskForm />
						<TaskList />
					</div>
				</div>
			</div>
		</TaskListContextProvider>
	)
}

export default App
