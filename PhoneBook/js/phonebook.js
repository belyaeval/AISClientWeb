$(document).ready(function () {
    var table = $("#phone-table");
    var surname = $("#surname");
    var name = $("#name");
    var phoneNumber = $("#phone-number");
    var addButton = $("#add-button");
    var validationMessage = $(".validation-message");
    var inputData = $("input");
    var i = 0;

    addButton.click(function () {
            if (surname.val() === "" || name.val() === "" || phoneNumber.val() === "") {
                $(inputData).addClass("validation-help");
                $(validationMessage).text("Не заполнены обязательные поля");
                validationMessage.show();

                if (surname.val() !== "") {
                    $(surname).removeClass("validation-help");
                }

                if (name.val() !== "") {
                    $(name).removeClass("validation-help");
                }

                if (phoneNumber.val() !== "") {
                    $(phoneNumber).removeClass("validation-help");
                }

                return;
            }

            if (isNaN(phoneNumber.val())) {
                $(phoneNumber).addClass("validation-help");
                $(validationMessage).text("Неверно заполен номер телефона");
                validationMessage.show();
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
                    .append($("<button type='button'>X</button>"))
                    .click(function () {
                        newRow.remove();

                        $("tr:has(td)").each(function (index) {
                            var currentNumber = $(this).children().eq(0);
                            var currentNumberValue = Number(currentNumber.text()) - 1;

                            if (index < currentNumberValue) {
                                currentNumber.text(currentNumberValue);
                            }
                        });
                        i--;
                    })
                );

            $(inputData).val("");
            table.append(newRow);
        }
    );
});