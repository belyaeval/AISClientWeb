(function () {
    var people = [{age: 20, name: "Ivan", lastName: "Ivanov"}, {age: 25, name: "Petr", lastName: "Petrov"},
        {age: 22, name: "Alexandr", lastName: "Sidorov"}, {age: 35, name: "Evgenia", lastName: "Smirnova"},
        {age: 33, name: "Valentina", lastName: "Sharova"}, {age: 15, name: "Dmitry", lastName: "Dibrov"},
        {age: 18, name: "Anna", lastName: "Ivanova"}, {age: 46, name: "Tatiana", lastName: "Titova"},
        {age: 40, name: "Kristina", lastName: "Petrova"}, {age: 51, name: "Boris", lastName: "Krasnov"}];

    var averageAge = _.reduce(people, function (sum, p) {
        return sum + p.age;
    }, 0) / _.size(people);

    console.log("average age is: " + averageAge);

    var filteredPeople = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30
        })
        .sortBy("age")
        .value();

    console.log(filteredPeople);

    var addedField = _.each(people, function (p) {
        p.fullName = p.lastName + " " + p.name;
    });

    console.log(addedField);
}());
