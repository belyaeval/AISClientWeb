var russia = {
    countryName: "Russia",
    cities: [
        {cityName: "Moscow", population: 2000000},
        {cityName: "Novosibirsk", population: 1000000},
        {cityName: "Sochi", population: 500000},
        {cityName: "Saratov", population: 250000}
    ]
};

var france = {
    countryName: "France",
    cities: [
        {cityName: "Paris", population: 1500000},
        {cityName: "Lion", population: 800000}
    ]
};

var ukraine = {
    countryName: "Ukraine",
    cities: [
        {cityName: "Kiev", population: 1300000},
        {cityName: "Lvov", population: 500000},
        {cityName: "Donetsk", population: 200000}
    ]
};

var countries = [russia, france, ukraine];

function getMaxCitiesCountries(array) {
    var maxCitiesCount = array.reduce(function (max, country) {
        return Math.max(country.cities.length, max);
    }, 0);

    return array.filter(function (country) {
        return maxCitiesCount === country.cities.length;
    });
}

console.log(getMaxCitiesCountries(countries));

function getCountriesPopulation(array) {
    var countriesPopulation = {};

    array.forEach(function (country) {
        countriesPopulation[country.countryName] = country.cities.reduce(function (sumPopulation, city) {
            return sumPopulation + city.population;
        }, 0);
    });

    return countriesPopulation;
}

console.log(getCountriesPopulation(countries));