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
    return array.filter(function (e) {
        return e % 2 === 0;
    }).reduce(function (sum, e) {
        return sum + e;
    }, 0);
}

console.log(getEvenSum(list));

var array = [];

for (var i = 1; i <= 100; i++) {
    array.push(i);
}

function getEvenSquares(array) {
    return array.filter(function (e) {
        return e % 2 === 0;
    }).map(function (e) {
        return Math.pow(e, 2);
    });
}

console.log(getEvenSquares(array));