document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list");
    var todoText = document.getElementById("new-todo-text");
    var validationMessage = document.querySelector(".validation-message");

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

        li.children[0].textContent = newText;

        li.children[1].addEventListener("click", function () {
            li.children[0].innerHTML = "<input type='text'><button>Отменить</button><button>Сохранить</button>";
            li.children[1].style.display = "none";
            li.children[0].children[0].value = newText;

            li.children[0].children[1].addEventListener("click", function () {
                li.children[0].textContent = newText;
                li.children[1].style.display = "inline";

            });

            li.children[0].children[2].addEventListener("click", function () {
                li.children[0].textContent = li.children[0].children[0].value;
                newText = li.children[0].textContent;
                li.children[1].style.display = "inline";
            });
        });

        todoList.appendChild(li);

        li.children[2].addEventListener("click", function () {
            todoList.removeChild(li);
        });

        todoText.value = "";
    });
});