import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import HomeView from './homeView'
import UndoneTasksView from './undoneTasksView'
import DoneTasksView from './doneTasksView'


const app = function() {

	var TaskModel = Backbone.Model.extend({
		_taskName: '',
		_status: 'Undone'
	})

	var TaskCollection = Backbone.Collection.extend({
		model: TaskModel
	})

	var taskCollection = new TaskCollection()

	var ToDoRouter = Backbone.Router.extend({
		routes: {
			"tasks/:viewType": "_showTasks",
			"*default": "_routeToAll",
		},

		_routeToAll: function(){
			location.hash = 'tasks/all'
		},

		_showTasks: function(viewType){
			ReactDOM.render(<HomeView taskColl={taskCollection} viewType={viewType}/>,document.querySelector('.container'))
		},

		initialize: function(){
			Backbone.history.start()
		}
	})

	var router = new ToDoRouter()

}

app()