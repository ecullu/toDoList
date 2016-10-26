import React from 'react'

const Header = React.createClass({

	_addTask: function(e){
		if(e.keyCode === 13){
			var taskStr = e.target.value
			this.props.addNewTask(taskStr)
			e.target.value = ''
		}


	},

	render: function(){
		return(
			<div id="header">
				<div id="app-title">Don't miss a thing</div> 
				<div id="add-new-task">
					<input onKeyDown={this._addTask} placeholder="Enter a task"/>
				</div>
				<div id="nav-bar">
					<a href="#tasks/all"><div>All</div></a>
					<a href="#tasks/done"><div>Done</div></a>
					<a href="#tasks/undone"><div>Undone</div></a>
				</div>
			</div>
		)
	}
})

export default Header