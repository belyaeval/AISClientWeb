var countries = [];

countries[0] = {
    countryName: "Russia",
    cities: [
        {cityName: "Moscow", population: 2000000},
        {cityName: "Novosibirsk", population: 1000000},
        {cityName: "Sochi", population: 500000},
        {cityName: "Saratov", population: 250000}
    ]
};

countries[1] = {
    countryName: "France",
    cities: [
        {cityName: "Paris", population: 1500000},
        {cityName: "Lion", population: 800000}
    ]
};

countries[2] = {
    countryName: "Ukraine",
    cities: [
        {cityName: "Kiev", population: 1300000},
        {cityName: "Lvov", population: 500000},
        {cityName: "Donetsk", population: 200000}
    ]
};

function getMaxCitiesCountries(array) {
    var maxCitiesCount = array.reduce(function (max, country) {
        if (country.cities.length >= max) {
           return country.cities.length;
        } else {
            return max;
        }
    }, 0);
    return array.filter(function (country) {
        return maxCitiesCount === country.cities.length;
    });
}

console.log(getMaxCitiesCountries(countries));

function getCountriesPopulation(array) {
    var countriesPopulation = {};
    array.map(function (country) {
        countriesPopulation[country.countryName] = country.cities.reduce(function (sumPopulation, city) {
            return sumPopulation + city.population;
        }, 0);
    });
    return countriesPopulation;
}

console.log(getCountriesPopulation(countries));