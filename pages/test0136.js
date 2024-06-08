        // 프로미스
        // pizza 주문
        const pizzaOrder = ()=>{
            return new Promise(
                (resolve, reject)=>{
                    resolve("피자를 주문합니다.");
                }
            );
        }
        const step1 = (mes)=>{
            console.log(mes);
            return new Promise(
                (resolve, reject)=>{
                    setTimeout(()=>{
                        resolve("피자 도우 준비");
                    },3000);
                }
            )
        }

        // resolve('토핑 준비'); 1000ms
        const step2 = (mes)=>{
            console.log(mes);
            return new Promise(
                (resolve, reject)=>{
                    setTimeout(()=>{
                        resolve("토핑 준비 준비");
                    },2000);
                }
            )
        }
        // resolve('굽기 완료'); 2000ms
        const step3 = (mes)=>{
            console.log(mes);
            return new Promise(
                (resolve, reject)=>{
                    setTimeout(()=>{
                        resolve("굽기 완료 준비");
                    },1000);
                }
            )
        }
        
        pizzaOrder()
        .then((res)=>step1(res))
        .then((res)=>step2(res))
        .then((res)=>step3(res))
        .then((res)=>console.log(res));
        
