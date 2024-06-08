let items = [];

items.push(10);
items.push(20);
items.push(30);   // 10,20,30 요소 추가
console.log(items); // [10, 20, 30]
console.log(items.pop()); // 30
console.log(items.pop()); // 20
console.log(items.pop()); // 10   items를 stack으로 사용

items.push(10);
items.push(20);
items.push(30);
console.log(items) // [10, 20, 30]

console.log(items.shift()); // 10
console.log(items.shift()); // 20
console.log(items.shift()); // 30   items 를 queue로 사용


