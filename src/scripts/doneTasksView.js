import React from 'react'
import Header from './header'
import Task from './taskRender'

const DoneTasksView = React.createClass({
	getInitialState: function(){
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

export default DoneTasksView
