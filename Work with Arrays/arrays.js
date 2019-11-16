var list = [2, 8, 5, 1, 7, 3, 12, 6, 9];
list.sort(function (e1, e2) {
    return e2 - e1;
});
console.log(list);

var subListFirst5 = list.slice(0, 5);
console.log(subListFirst5);

var sublistLast5 = list.slice(-5);
console.log(sublistLast5);

function getEvenSum(array) {
    var evenList = [];
    array.filter(function (e) {
        if (e % 2 === 0) {
            evenList.push(e);
        }
    });
    return evenList.reduce(function (sum, e) {
        return sum + e;
    });
}

console.log(getEvenSum(list));

var array = [];

for (var i = 0; i < 100; i++) {
    array[i] = i + 1;
}

function getEvenSquare(array) {
    var evenArray = [];
    array.filter(function (e) {
        if (e % 2 === 0) {
            evenArray.push(e);
        }
    });
    return evenArray.map(function (e) {
        return Math.pow(e, 2);
    });
}

console.log(getEvenSquare(array));