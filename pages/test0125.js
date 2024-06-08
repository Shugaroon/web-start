// // 명령형, 절차 지향 프로그래밍
// 모든 절차를 묘사

// const numbers = [1,2,3,4]
// const eventNumbers = []
// for(let i = 0; i< numbers.length, i++){
//     const num = numbers[i];
//     if(num%2==0) eventNumbers.push(num); 
// }



// // 선언형 프로그래밍
// 결과를 묘사

// <img...>

// const numbers = [1,2,3,4]
// const eventNumber = numbers.filter(num=>num%2==0);

// // 프로그래밍 패러다임





// // 객체 지향 프로그래밍

// 구조적 -> 조직화

// 제품 product (제품 자체)
// 상품 goods (판매 가능여부)


// let book = {
//     title : "front tech",
//     totalPages : 300,
//     nowPage : 1,
//     read : function(){
//         console.log(`${this.title}을 읽습니다.
//     if(this.nowPage >= this.totalPages){console.log("다 읽었어요")};
//     지금 ${this.nowPage}를 읽고 있습니다.`);
//     this.nowPage++;
// }
// }

// book.read();
// book.read();


// 복사

let num1 = 100;
let num2 = num1;
console.log(num1);
console.log(num2);

num2 = 200;
console.log(num1)
console.log(num2)

// 객체 복사
let car1 = {
    name : "Avante",
    color: "blue",
    engineSize: 1.6, 
    
}
let car2 = car1;
console.log("car1 :" , car1);
console.log("car1 :" , car2);

car2.color = "red"
console.log("car1:", car1);
console.log("car1:", car2);