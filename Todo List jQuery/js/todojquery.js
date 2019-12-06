$(document).ready(function () {
    var todoList = $("#todo-list");
    var todoText = $("#new-todo-text");
    var validationMessage = $(".validation-message");
    var todoButton = $("#add-todo-button");

    todoButton.click(function () {
        var newText = todoText.val();

        if (newText === "") {
            validationMessage.show();
            return;
        }

        validationMessage.hide();

        var li = $("<li>");
        li.html("<span></span><button>Редактировать</button><button>Удалить</button>");

        var itemText = li.children().eq(0);
        var editButton = li.children().eq(1);
        var deleteButton = li.children().eq(2);

        itemText.text(newText);

        editButton.click(function () {
            itemText.html("<input type='text'><button>Отменить</button><button>Сохранить</button>");

            var editText = li.children().eq(0).children().eq(0);
            var cancelButton = li.children().eq(0).children().eq(1);
            var saveButton = li.children().eq(0).children().eq(2);

            editButton.hide();
            editText.val(newText);

            cancelButton.click(function () {
                itemText.text(newText);
                editButton.show();
                validationMessage.hide();
            });

            saveButton.click(function () {
                var editTextValue = editText.val();

                if (editTextValue === "") {
                    li.append(validationMessage);
                    validationMessage.show();
                    return;
                }

                validationMessage.hide();

                itemText.text(editTextValue);
                newText = itemText.text();
                editButton.show();
            });
        });

        todoList.append(li);

        deleteButton.click(function () {
            li.remove();
        });

        todoText.val("");
    });
});