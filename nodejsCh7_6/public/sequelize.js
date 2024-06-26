// html과 연동되는 코드

document.querySelectorAll('#user-list tr').forEach(
    (el)=>{
    el.addEventListener('click', function(){
        const id = el.querySelector('td'); //.textContent;
        getComment(id); // id별 댓글 조회
    });
});

async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        users.map(function(user){
            const row = document.createElement('tr');
            row.addEventListener('click', ()=>{getComment(user.id);});

            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);
            
            tbody.appendChild(row);
        });
    } catch(err){
        console.error(err);
    }
}

// 사용자 등록 버튼 핸들링
document.getElementById('user-form').addEventListener('submit', 
    async (e)=>{
        e.preventDefault();
        const name = e.target.username.value;
        const age = e.target.age.value;
        const married = e.target.married.checked;
        // console.log("post, married:", married);
        try{
            await axios.post('/users', {name, age, married});
            getUser();
        }catch(err){
            console.error(err);
        }        
        e.target.username.value = '';
        e.target.age.value = '';
        e.target.married.checked = false;
    }
);

async function getComment(id){
    try{
        const res = await axios.get(`/users/${id}/comments`); // 127.0.0.1:3000/users/${id}/comments
        const comments = res.data;
        
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';

        comments.map(function (comment){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);
      
            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async ()=>{
                const newComment = prompt('댓글을 어떻게 바꾸실거죠?');
                if(!newComment){return alert('내용을 적어주세요.')}
                try{
                    await axios.patch(`/comments/${comment.id}`, {comment:newComment});
                    getComment(id);
                }catch(err){
                    console.error(err);
                }
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);

            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.delete(`/comments/${comment.id}`);
                    getComment(id);
                }catch(err){
                    console.error(err);
                }
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);

            tbody.appendChild(row);
        });

    }catch(err){
        console.error(err);
    }        
}