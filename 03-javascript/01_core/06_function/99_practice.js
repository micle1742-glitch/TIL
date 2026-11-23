const book = {
    title: '자바스크립트 입문',
    price: 15000
};

function calculateTotal(book, quantity) {
    return book.price * quantity;
}

const total = calculateTotal(book, 2);
console.log(total);

book.price = 18000;
console.log(calculateTotal(book, 2));
console.log(calculateTotal(book, 0));

const regularPrice = function(total) {
    return total;
}

const discountPrice = function(total) {
    if(total < 3000) {
        return 0;
    }
    return total - 3000;
}

function checkout(book, quantity, pricePolicy) {
    const total = calculateTotal(book, quantity);
    return pricePolicy(total);
}

console.log(checkout(book, 2, regularPrice));
console.log(checkout(book, 2, discountPrice));
console.log(checkout(book, 0, discountPrice));


