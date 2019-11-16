var countries = [];

var moscow = {
    cityName: "Moscow",
    population: 2000000
};

var novosibirsk = {
    cityName: "Novosibirsk",
    population: 1000000
};

var sochi = {
    cityName: "Sochi",
    population: 500000
};

var saratov = {
    cityName: "Saratov",
    population: 250000
};

countries[0] = {
    countryName: "Russia",
    cities: [moscow, novosibirsk, sochi, saratov]
};

var paris = {
    cityName: "Paris",
    population: 1500000
};

var lion = {
    cityName: "Lion",
    population: 800000
};

countries[1] = {
    countryName: "France",
    cities: [paris, lion]
};

var kiev = {
    cityName: "Kiev",
    population: 1300000
};

var lvov = {
    cityName: "Lvov",
    population: 500000
};

var donetsk = {
    cityName: "Donetsk",
    population: 200000
};

countries[2] = {
    countryName: "Ukraine",
    cities: [kiev, lvov, donetsk]
};

function getMaxCitiesCountries(array) {
    var maxCitiesCountries = [];
    var max = 0;
    array.forEach(function (country) {
        if (country.cities.length >= max) {
            max = country.cities.length;
        }
    });
    array.filter(function (country) {
        if (max === country.cities.length) {
            maxCitiesCountries.push(country);
        }
    });
    return maxCitiesCountries;
}

console.log(getMaxCitiesCountries(countries));

function getCountriesPopulation(array) {
    var countryPopulation = {};
    array.forEach(function (country) {
        countryPopulation[country.countryName] = country.cities.reduce(function (sumPopulation, city) {
            return sumPopulation + city.population;
        }, 0);
    });
    return countryPopulation;
}

console.log(getCountriesPopulation(countries));