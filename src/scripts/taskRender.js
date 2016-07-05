import React from 'react'

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

export default Task