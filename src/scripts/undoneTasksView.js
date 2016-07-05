import React from 'react'
import Header from './Header'

const UndoneTasksView = React.createClass({
	render: function(){
		return(
				<div id="undone-tasks-container">
					<Header />
					<ListWrapper undoneTaskList = {this.props.taskColl}/>
				</div>
			)
	}
})

const ListWrapper = React.createClass({
	
	_undoneJsxArray: function(undoneTasks){
		console.log('undone tasks jsx array >>> ', undoneTasks)
		var incompleteTasks = undoneTasks.map(function (undoneTask){
			return <Task undone={undoneTask}/>
		})
		return incompleteTasks
	},

	render: function(){
		return (
			<div id="undone-tasks">
				{this._undoneJsxArray(this.props.undoneTaskList.where({_status:'Undone'}))}
			</div>
			)
	}
})

const Task = React.createClass({
	render: function(){
		console.log(this.props.undone)
	return(
			<div id="undone-task">
				<div className="undone-task-name"> {this.props.undone.attributes._taskName} </div>
			</div>
		)
	}
})

export default UndoneTasksView