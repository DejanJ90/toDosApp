var todosList = {
    todos: [],
    //This is method for adding todos in store
    addTodo: function (todo) {
        var newTodo = {
            todoText: todo,
            todoCompletedStatus: false
        }

        if (todo === "") {
            alert("You need to enter value!");
        } else {
            this.todos.push(newTodo);
            view.createDeleteButtonForTodo()
            view.createDropDownList();
        }
    },
    //This is method for editing selected todo
    changeTodo: function (newText, position) {
        if (Boolean(newText) === false) {
            alert("You need to enter value!");
        } else {
            this.todos.forEach(function (todo, index) {
                this.todos[position].todoText = newText;
            }, this);
        }
    },
    //This is method for deleting selected todo
    deleteTodo: function (position) {
        var NumberOfElementsToDelete = 1;
        this.todos.splice(position, NumberOfElementsToDelete);
    },
    //This is method for toggle completed todo
    toggleCompeted: function (position) {
        var status = false;

        if (status === this.todos[position].todoCompletedStatus) {
            status = true
        } else {
            status = false
        }

        this.todos[position].todoCompletedStatus = status;
    },
    //This is method for uncheck all or check all todos
    toggleAll: function () {
        var totalCompleted = 0;

        if (this.todos.length === 0) {
            alert("Todos list is empty")
        }
        this.todos.forEach(function (todo, index) {
            if (todo.todoCompletedStatus === true) {
                totalCompleted++;
            }
        });

        this.todos.forEach(function (todo) {
            if (totalCompleted === this.todos.length) {
                todo.todoCompletedStatus = false;
            } else {
                todo.todoCompletedStatus = true;
            }
        }, this)
    }
}

var handlers = {
    displayTodosButton: function () {
        view.displayTodosList()
    },
    addTodoButton: function () {
        var addTodoInput = document.getElementById("addTodoValue");
        var inputValue = addTodoInput.value;
        todosList.addTodo(inputValue);
        addTodoInput.value = "";
        view.displayTodosList()
    },
    changeTodoButton: function () {
        var changeTodoText = document.getElementById("changeTodoText");
        var changeTodoSelected = document.getElementById("select")
        var changeTodoSelectedValue = changeTodoSelected.value
      
        todosList.changeTodo(changeTodoText.value, changeTodoSelectedValue);
        changeTodoText.value = "";
   
        view.displayTodosList()
    },
    deleteTodoButton: function (position) {
        todosList.deleteTodo(position);
        view.displayTodosList()
    },
    toggleCompletedButton: function () {
        var toggleCompetedPosition = document.getElementById("toggleCompletedPosition");
        var toggleCompetedValue = toggleCompetedPosition.valueAsNumber;

        if (typeof toggleCompetedValue === "number" && toggleCompetedValue !== NaN ) {
            todosList.toggleCompeted(toggleCompetedValue);
        } else {
            alert("You need to enter position");
        }

        toggleCompetedPosition.value = "";
        view.displayTodosList()
    },
    toggleAllButton: function () {
        todosList.toggleAll()
        view.displayTodosList()
    },
}

var view = {
    displayTodosList: function () {
        var displayTodosList = document.getElementById("displayTodosList");
        displayTodosList.innerHTML = "";

        todosList.todos.forEach(function (todo, index) {
            var todoList = document.createElement("li");
            var todoTextWithCompletion;


            if (todo.todoCompletedStatus === false) {
                todoTextWithCompletion = "[ ] " + todo.todoText;
            } else {
                todoTextWithCompletion = "[X] " + todo.todoText;
            }
            todoList.className = "list-group-item-action input-group mb-1 checkbox"
            todoList.id = index;
            todoList.textContent = todoTextWithCompletion;
            todoList.appendChild(this.createDeleteButtonForTodo());
            displayTodosList.appendChild(todoList);
        }, this);

    },
    createDeleteButtonForTodo: function () {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.id = "deleteButton"
        deleteButton.className = "btn btn-danger";
        return deleteButton;
    },
    setUpEventListener: function () {
        var todosUl = document.querySelector("ul");

        todosUl.addEventListener("click", function (event) {
            //Get element that was clicked on.
            var elementClicked = event.target;
            //Check is delete button clicked on.
            if (elementClicked.id === "deleteButton") {
                handlers.deleteTodoButton(parseInt(elementClicked.parentNode.id))
            }
        });
    },
    createDropDownList: function () {
        var select = document.getElementById("select")
        select.innerHTML = "";

        todosList.todos.forEach(function (todo, index) {
            var option = document.createElement("option");
            var text = document.createTextNode(index);

            option.appendChild(text);
            option.setAttribute("value", index);
            select.insertBefore(option, select.lastChild);
        });
    },
}
view.setUpEventListener();
