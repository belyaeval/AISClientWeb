$(document).ready(function () {
    var table = $("#phone-table");
    var surname = $("#surname");
    var name = $("#name");
    var phoneNumber = $("#phone-number");
    var addButton = $("#add-button");
    var validationMessage = $(".validation-message");
    var i = 0;

    addButton.click(function () {
        if (surname.val() === "") {
            $(validationMessage).text("Не заполнена строка \"Фамилия\"");
            validationMessage.show();
            $(surname).addClass("validation-help");
            return;
        }

        $(surname).removeClass("validation-help");

        if (name.val() === "") {
            $(validationMessage).text("Не заполнена строка \"Имя\"");
            validationMessage.show();
            $(name).addClass("validation-help");
            return;
        }

        $(name).removeClass("validation-help");

        if (phoneNumber.val() === "" || isNaN(phoneNumber.val())) {
            $(validationMessage).text("Не заполнена или неверно заполнена строка \"Номер телефона\"");
            validationMessage.show();
            $(phoneNumber).addClass("validation-help");
            return;
        }

        validationMessage.hide();
        $(phoneNumber).removeClass("validation-help");

        i++;

        var newRow = $("<tr>")
            .append($("<td>").text(i))
            .append($("<td>").text(surname.val()))
            .append($("<td>").text(name.val()))
            .append($("<td>").text(phoneNumber.val()))
            .append($("<td>")
                .append($("<button>X</button>").attr("type", "button"))
                .click(function () {
                    newRow.remove();

                    $("tr:has(td)").each(function (index) {
                        var currentNumber = Number($(this).children().eq(0).text()) - 1;

                        if (index < currentNumber) {
                            $(this).children().eq(0).text(currentNumber);
                        }
                    });
                    i--;
                })
            );
        $("input").val("");
        table.append(newRow);
    });
});