import React from 'react'
import Header from './header'

const HomeView = React.createClass({
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
		return (
				<div id="home-view">
					<Header addNewTask = {this._addNewTask}/>
					<ListWrapper taskList = {this.state.taskColl}/>
				</div>
			)
	}

})

const ListWrapper = React.createClass({

	_getJsxArray: function(tasks){
		var importTasks = tasks.map(function(singleTask) {
			console.log('single task in map func', singleTask)
			return <Task task={singleTask}/>
		})
		return importTasks
	},

	render: function(){
		console.log('listwrapper is rending>>> ',this.props.taskList.models)
		return (
				<div  id="list-wrapper">
					<div id="task-title-bar">
						<h5>Task</h5>
						<h5>Description</h5>
						<h5>Due Date</h5>
						<h5>Status</h5>
					</div>
					<div id="all-tasks">{this._getJsxArray(this.props.taskList.models)}</div>
				</div>
			)
	}
})

const Task = React.createClass({

	getInitialState: function(){
		console.log('initial state running>>>')
		var cbState = false
		if(this.props.task.attributes._status === "Done"){
			cbState = true
		}
		return {
			checkboxState: cbState
		}
	},

	_deleteTask: function(){
		console.log('this in delete task',this.props)
		this.props.task.destroy()
},

	_changeStatus: function (){
		console.log('this in change status >>> ', this)
		var taskStatus = this.props.task.attributes._status

		if(taskStatus === "Undone"){
			this.props.task.attributes._status = "Done"
			this.state.checkboxState = true
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
		else{
			this.props.task.attributes._status = "Undone"
			this.state.checkboxState = false
			this.setState({
				checkboxState: this.state.checkboxState
			})
		}
		// console.log('this in change status after change>>> ', this.props.task._status)

},

	render: function(){
		// console.log('creating new task')
		// console.log('delete method', this._deleteTask)
		console.log('checkboxstatus in new task >>  ', this.state.checkboxState)
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