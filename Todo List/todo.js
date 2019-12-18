document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list");
    var todoText = document.getElementById("new-todo-text");
    var validationMessage = document.querySelector(".validation-message");
    var inputForm = document.getElementById("input-form");

    var todoButton = document.getElementById("add-todo-button");
    todoButton.addEventListener("click", function () {
        var newText = todoText.value;

        if (newText === "") {
            validationMessage.style.display = "block";
            return;
        }

        validationMessage.style.display = "none";

        var li = document.createElement("li");
        li.innerHTML = "<span></span><button>Редактировать</button><button>Удалить</button>";

        var itemText = li.children[0];
        var editButton = li.children[1];
        var deleteButton = li.children[2];

        itemText.textContent = newText;

        editButton.addEventListener("click", function () {
            itemText.innerHTML = "<input type='text'><button>Отменить</button><button>Сохранить</button>";

            var editText = itemText.children[0];
            var cancelButton = itemText.children[1];
            var saveButton = itemText.children[2];

            validationMessage.style.display = "none";
            editButton.style.display = "none";
            editText.value = newText;

            cancelButton.addEventListener("click", function () {
                itemText.textContent = newText;
                editButton.style.display = "inline";
                if (validationMessage.style.display === "block") {
                    validationMessage.style.display = "none";
                    inputForm.appendChild(validationMessage);
                }
            });

            saveButton.addEventListener("click", function () {
                if (editText.value === "") {
                    li.appendChild(validationMessage);
                    validationMessage.style.display = "block";
                    return;
                }

                inputForm.appendChild(validationMessage);
                validationMessage.style.display = "none";

                itemText.textContent = editText.value;
                newText = itemText.textContent;
                editButton.style.display = "inline";
            });
        });

        todoList.appendChild(li);

        deleteButton.addEventListener("click", function () {
            validationMessage.style.display = "none";
            todoList.removeChild(li);
        });

        todoText.value = "";
    });
});