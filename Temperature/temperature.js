document.addEventListener("DOMContentLoaded", function () {
    var tempCelsius = document.getElementById("temp-value");
    var button = document.getElementById("calc-button");
    var tempKelvin = document.getElementById("kel-temp");
    var tempFahrenheit = document.getElementById("fah-temp");
    var errorMessage = document.querySelector(".error-message");

    button.addEventListener("click", function () {
        var tempValue = Number(tempCelsius.value);

        if (isNaN(tempValue) || tempCelsius.value === "") {
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";

        tempKelvin.value = tempValue + 273.15;
        tempKelvin.style.display = "inline";

        tempFahrenheit.value = tempValue * 1.8 + 32;
        tempFahrenheit.style.display = "inline";
    });
});