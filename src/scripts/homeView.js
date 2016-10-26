import React from 'react'
import Header from './header'

const HomeView = React.createClass({
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
		this.state.taskColl.add({
			_taskName : task,
			_status: 'undone'
		})
		this.setState({
			taskColl: this.state.taskColl
		})
	},

	render: function(){
		return (
				<div id="home-view">
					<Header addNewTask = {this._addNewTask}/>
					<ListWrapper taskList = {this.state.taskColl} viewType={this.props.viewType}/>
				</div>
			)
	}

})

const ListWrapper = React.createClass({

	_getJsxArray: function(tasks){
		var importTasks = tasks.map(function(singleTask) {
			return <Task task={singleTask}/>
		})
		return importTasks
	},

	render: function(){
		var handleView = this.props.taskList.models
		if(this.props.viewType !== 'all'){
			handleView = this.props.taskList.where({_status: this.props.viewType})
		}


		return (
				<div  id="list-wrapper">
					<div id="task-title-bar">
						<h5>Task</h5>
						<h5>Description</h5>
						<h5>Due Date</h5>
						<h5>Status</h5>
					</div>
					<div className="tasks">{this._getJsxArray(handleView)}</div>
				</div>
			)
	}
})

const Task = React.createClass({

	getInitialState: function(){
		if(this.props.task.attributes._status === "done"){
			var cbState = true
		}
		else {
			var cbState = false
		}
		return {
			checkboxState: cbState
		}
	},

	_deleteTask: function(){
		this.props.task.destroy()
},

	_changeStatus: function (){
		var taskStatus = this.props.task.attributes._status

		if(taskStatus === "undone"){
			this.props.task.attributes._status = "done"
			this.state.checkboxState = true
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
		else{
			this.props.task.attributes._status = "undone"
			this.state.checkboxState = false
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
},

	render: function(){
		return (
				<div className="task-box">
					<div className="task-name">{this.props.task.attributes._taskName}</div>
					<div className="task-status">{this.props.task.attributes._status}</div>
					<input type="checkbox" onClick={this._changeStatus} checked={this.state.checkboxState}/>
					<button className="delete" onClick={this._deleteTask}> Delete </button>
				</div>
			)
	}
})

export default HomeView