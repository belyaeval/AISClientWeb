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

        var item = $("<li>")
            .append($("<span></span>"));

        var buttons = $("<div></div>")
            .append($("<div class='btn-group btn-group-sm buttons'></div>")
                .append($("<button class='btn btn-outline-secondary' type='button'>Редактировать</button>"))
                .append($("<button class='btn btn-outline-secondary' type='button'>Удалить</button>")));

        item
            .append(buttons);

        var itemText = item.children().eq(0);
        var editButton = buttons.children().eq(0).children().eq(0);
        var deleteButton = buttons.children().eq(0).children().eq(1);

        itemText.text(newText);

        editButton.click(function () {
            itemText.html("<input type='text'>");

            var saveEditButtons = buttons.children().eq(0);

            saveEditButtons
                .prepend($("<button class='btn btn-outline-secondary' type='button'>Отменить</button>"))
                .prepend($("<button class='btn btn-outline-secondary' type='button'>Сохранить</button>"));

            var editText = item.children().eq(0).children().eq(0);
            var saveButton = saveEditButtons.children().eq(0);
            var cancelButton = saveEditButtons.children().eq(1);

            validationMessage.hide();
            $(this).hide();
            editText.val(newText);

            cancelButton.click(function () {
                itemText.text(newText);
                editButton.show();
                $(this).hide().prev().hide();
                if (validationMessage.show()) {
                    validationMessage.hide();
                    validationMessage.insertBefore($("#todo-list"));
                }
            });

            saveButton.click(function () {
                if (editText.val() === "") {
                    item.append(validationMessage);
                    validationMessage.show();
                    return;
                }

                validationMessage.insertBefore($("#todo-list"));
                validationMessage.hide();

                itemText.text(editText.val());
                newText = itemText.text();
                editButton.show();
                $(this).hide().next().hide();
            });
        });

        todoList.append(item);

        deleteButton.click(function () {
            item.remove();
            validationMessage.hide();
        });

        todoText.val("");
    });
});