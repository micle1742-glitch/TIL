const book = {
    title: "자바스크립트입문",
    price: 15000
};

function colculatorTotal(book, quantity) {
    return book.price*quantity;

}
const total = colculatorTotal(book,2)
console.log(total);

book.price = 18000;

console.log(colculatorTotal(book,2))
console.log(colculatorTotal(book,0))

const regularPrice = function(total) { 
    return total;
 };

const discount =function(total) {
    if(total < 3000){
        return 0
    }
    return total -3000
}

function checkout(book, quantity, pricePolicy)
{
    const total = colculatorTotal(book, quantity);
    return pricePolicy(total);

}

console.log(checkout(book,2,regularPrice))
console.log(checkout(book,2,discount))
console.log(checkout(book,0,discount))



