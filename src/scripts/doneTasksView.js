import React from 'react'
import Header from './header'
import Task from './taskRender'

const DoneTasksView = React.createClass({
	// _addNewTask: function(task){
	// 	console.log('adding new task in task adder')
	// 	this.state.taskColl.add({
	// 		_taskName : task,
	// 		_status: 'Undone'
	// 	})
	// 	this.setState({
	// 		taskColl: this.state.taskColl
	// 	})
	// 	console.log(this.state.taskColl)

	// },

	getInitialState: function(){
		console.log('this in homeview',this.props.taskColl)
		return {
			taskColl: this.props.taskColl
		}
	},

	componentWillMount: function(){
		var self = this
		this.props.taskColl.on('update', function(){
			self.setState({
				taskColl: self.props.taskColl
			})
		})
	},

	_addNewTask: function(task){
		console.log('adding new task in task adder')
		this.state.taskColl.add({
			_taskName : task,
			_status: 'Undone'
		})
		this.setState({
			taskColl: this.state.taskColl
		})
		console.log(this.state.taskColl)

	},

	render: function(){
		return(
				<div id="done-tasks-container">
					<Header addNewTask={this._addNewTask}/>
					<ListWrapper doneTaskList = {this.props.taskColl}/>
				</div>
			)
	}
})

const ListWrapper = React.createClass({
	
	_doneJsxArray: function(doneTasks){
		// console.log('undone tasks jsx array >>> ', undoneTasks)
		var completeTasks = doneTasks.map(function (doneTask){
			return <Task done={doneTask}/>
		})
		return completeTasks
	},

	render: function(){
		return (
				<div id="done-list-wrapper">
					<div id="task-title-bar">
						<h5>Task</h5>
						<h5>Description</h5>
						<h5>Due Date</h5>
						<h5>Status</h5>
					</div>
					<div id="done-tasks">
						{this._doneJsxArray(this.props.doneTaskList.where({_status:'Done'}))}
					</div>
			</div>
			)
	}
})

// const Task = React.createClass({

// 	getInitialState: function(){
// 		console.log('initial state running>>>')
// 		var cbState = false
// 		if(this.props.task.attributes._status === "Done"){
// 			cbState = true
// 		}
// 		return {
// 			checkboxState: cbState
// 		}
// 	},

// 	_deleteTask: function(){
// 		console.log('this in delete task',this.props)
// 		this.props.task.destroy()
// },

// 	_changeStatus: function (){
// 		console.log('this in change status >>> ', this)
// 		var taskStatus = this.props.task.attributes._status

// 		if(taskStatus === "Undone"){
// 			this.props.task.attributes._status = "Done"
// 			this.state.checkboxState = true
// 			this.setState({
// 				checkboxState: this.state.checkboxState
// 			})
// 		}
// 		else{
// 			this.props.task.attributes._status = "Undone"
// 			this.state.checkboxState = false
// 			this.setState({
// 				checkboxState: this.state.checkboxState
// 			})
// 		}
// 		// console.log('this in change status after change>>> ', this.props.task._status)

// },

// 	render: function(){
// 	return(
// 			<div id="done-task">
// 				<div className="done-task-name"> {this.props.done.attributes._taskName} </div>
// 				<div className="task-status">{this.props.task.attributes._status}</div>
// 				<input type="checkbox" onClick={this._changeStatus} checked={this.state.checkboxState}/>
// 				<button className="delete" onClick={this._deleteTask}> Delete </button>
// 			</div>
// 		)
// 	}
// })

export default DoneTasksView
