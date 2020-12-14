window.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('addList'),
        input = document.getElementById('List'),
        wrap = document.querySelector('.todo-list'),
        form = document.getElementById('form');
    let lists =  [
            {task: 'Сгенерировть проект', status: false, createDate: '10.11.2020', important: false},
            {task: 'Создать компоненты', status: false, createDate: '10.11.2020', important: false},
            {task: 'Описать роутинг', status: false, createDate: '10.11.2020', important: false},
            {task: 'Завершить приложение', status: false, createDate: '10.11.2020', important: false},
        ],
        local = localStorage.getItem('arr');


    local == undefined? lists:  lists = JSON.parse(local);

    domList(lists);

    btn.addEventListener('click', (e)=> {
        e.preventDefault();
        if (!input.value == '') {
            let data = new Date().toLocaleDateString('ko-KR'),
                obj = {
                    task: input.value,
                    status: false,
                    createDate: `${data}`,
                    important: false
                };

            lists.push(obj);
            form.reset();
            domList(lists);
            localStorage.setItem('arr', JSON.stringify(lists));
        }

    })

    function btnLists () {
        wrap.addEventListener('click', (e) => {
            let li = wrap.children;
            for (let ind = 0; ind < lists.length; ind++) {
                //delete
                if (e.target == li[ind].children[4]) {
                    lists.splice(ind,1);
                }
                 // Status
                else if(e.target == li[ind].children[1]) {
                    if (lists[ind].status == true){
                        lists[ind].status = false;
                    }else {
                        lists[ind].status = true;
                    }
                }
                // Important
                else if (e.target == li[ind].children[3]) {
                    if (lists[ind].important == true){
                        lists[ind].important = false
                    } else {
                        lists[ind].important = true
                    }
                    lists = [
                        ...lists.filter(item => item.important == true),
                        ...lists.filter(item => item.important != true)
                    ];
                }
            }
            domList(lists);
            localStorage.setItem('arr', JSON.stringify(lists));
        })
    }

    function domList (arr) {
        let out = '';
        wrap.innerHTML = out;
        arr.forEach((item, ind) => {
            out += `
                <li class="${item.important? 'important': ''}">
                    <span class="${item.status? 'status':''}">${ind + 1})</span>
                    <span class="${item.status? 'status':''}">${item.task}</span>
                    <span class="${item.status? 'status':''}">${item.createDate}</span>
                    <button class="btn">Important</button>
                    <button class="btn">Delete</button>
                </li>
            `;
        })
        wrap.insertAdjacentHTML('beforeend', out);
        btnLists();
    }
})