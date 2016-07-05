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
			"done": "_showDone",
			"undone": "_showUndone",
			"all" : "_showAll",
			"*default": "_routeToAll",
		},

		_routeToAll: function(){
			location.hash = 'all'
		},

		_showAll: function(){
			ReactDOM.render(<HomeView taskColl = {taskCollection}/>,document.querySelector('.container'))
		},

		_showUndone: function(){
			// console.log('here comes task collection in undone view',taskCollection)
			ReactDOM.render(<UndoneTasksView taskColl={taskCollection}/>, document.querySelector('.container'))
		},

		_showDone: function(){
			ReactDOM.render(<DoneTasksView taskColl={taskCollection}/>, document.querySelector('.container'))
		},

		initialize: function(){
			Backbone.history.start()
		}
	})

	var router = new ToDoRouter()

}

app()