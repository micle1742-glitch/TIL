'use strict';

const prices = [1000,2000,3000];
const regularPrices = prices.map(function(구멍가격){
    return 구멍가격*2;
})

console.log(regularPrices)

const arrowPrices = prices.map(구멍가격 => 구멍가격*2)
console.log(arrowPrices)

const 영화관 = {

    상점 : '청량리역점',
    제목 : ['오딧세이','옵세션'],
    무비리스트:function() {
        // console.log('this')

        //화살표 자신 this 없음 바깥 this 사용
        this.제목.forEach(제목 => {
            console.log(this.상점 + ':' +제목);
        });
        
            // this.제목.forEach(function(제목) {
            //     console.log(this.상점 + ':'+제목)
            // })
        
    }
}
영화관.무비리스트();