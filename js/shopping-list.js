var shoppingApp = {
	init: function () {
		this.taskInput = document.getElementById("new-task"); //new-tasks
		this.addButton = document.getElementById("add-button"); //first-button
		this.incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
		this.completedTasksHolder = document.getElementById("completed-tasks"); //complete-tasks

		this.handleEvents();

		for ( var i = 0; i < this.incompleteTasksHolder.children.length; i++ ) {
			this.bindTaskEvents( this.incompleteTasksHolder.children[i], this.taskCompleted );
		}

		for ( var j = 0; j < this.completedTasksHolder.children.length; j++ ) { 
			this.bindTaskEvents( this.completedTasksHolder.children[j], this.taskIncomplete );
		}
	},

	handleEvents: function () {
		this.addButton.onclick = this.addTask;
		
	},

	bindTaskEvents: function (taskListItem, checkBoxEventHandler) {
		console.log("binding task events...");

		var checkBox = taskListItem.querySelector("input[type=checkbox");
		var deleteButton = taskListItem.querySelector("button.delete");

		checkBox.onchange = checkBoxEventHandler;
		deleteButton.onclick = this.deleteTask;
	},

	addTask: function () {
		console.log("Add task...");
		console.log(shoppingApp.taskInput.value);
		var listItem = shoppingApp.createNewTaskElement(shoppingApp.taskInput.value);
		
		shoppingApp.incompleteTasksHolder.appendChild(listItem);
		shoppingApp.bindTaskEvents(listItem, this.taskCompleted);
	},

	createNewTaskElement: function (taskString) {
		var listItem = document.createElement("li");
		var checkBox = document.createElement("input");
		var label = document.createElement("label");
		var deleteButton = document.createElement("button");

		checkBox.type = "checkbox";

		label.innerHTML = taskString;

		deleteButton.innerText = "Delete";
		deleteButton.className = "delete";

		// Appending each element
		listItem.appendChild(checkBox);
		listItem.appendChild(label);
		listItem.appendChild(deleteButton);


		return listItem;
	},

	deleteTask: function () {
		console.log("Delete task...");

		var listItem = this.parentNode;
		var ul = listItem.parentNode;

		ul.removeChild(listItem);
	},

	taskCompleted: function () {
		console.log("Completed task...");

		var listItem = this.parentNode;
		shoppingApp.completedTasksHolder.appendChild(listItem);
		shoppingApp.bindTaskEvents(listItem, shoppingApp.taskIncomplete);
	},

	taskIncomplete: function () {
		console.log("Incomplete task...");

		var listItem = this.parentNode;
		shoppingApp.incompleteTasksHolder.appendChild(listItem);
		shoppingApp.bindTaskEvents(listItem, shoppingApp.taskCompleted);
	}


};

window.onload = shoppingApp.init();