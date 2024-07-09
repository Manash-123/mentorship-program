const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert('Input field cannot be blank. Please write something');
    } else {
        let newData = localStorage.getItem("data2");
        if (newData) {
            let existData = JSON.parse(newData);
            existData.push({ task_name: inputBox.value, task_status: 0 })
            localStorage.setItem("data2", JSON.stringify(existData));
        } else {
            let newAddData = [];
            newAddData.push({ task_name: inputBox.value, task_status: 0 });
            localStorage.setItem('data2', JSON.stringify(newAddData));
            console.log("first", newAddData)
        }

    }
    inputBox.value = '';
    getData();
}


listContainer.addEventListener('click', function (e) {
    let newData = localStorage.getItem("data2");
    if (newData) {
        let getAllData = JSON.parse(newData);
        if (e.target.tagName === 'SPAN') {
            let filterData = getAllData.filter(item => {
                return item.task_name !== e.target.parentElement.getAttribute('data-value')
            })
            localStorage.setItem("data2", JSON.stringify(filterData))
            getData();
        } else if(e.target.tagName === 'LI') {
            let statusComplete = getAllData.map(item => {
                if(item.task_name === e.target.getAttribute('data-value')){
                    if(item.task_status === 0){
                        item.task_status = 1;
                    }else{
                        item.task_status = 0;
                    }
                }
                return item;
            })
            localStorage.setItem("data2", JSON.stringify(statusComplete));
            getData();
          
        }
    }
})

function getData() {
    if (localStorage.getItem("data2")) {
        listContainer.innerHTML = "";
        let getData = JSON.parse(localStorage.getItem("data2"));
        for (let i = 0; i < getData.length; i++) {
            if (getData[i].task_status === 0) {
                let li = document.createElement('li');
                li.innerHTML = getData[i].task_name;
                listContainer.appendChild(li);
                let span = document.createElement('span');
                span.innerHTML = 'X';
                li.appendChild(span)
                li.setAttribute('data-value', getData[i].task_name);
            } else {
                let li = document.createElement('li');
                li.innerHTML = getData[i].task_name;
                listContainer.appendChild(li);
                let span = document.createElement('span');
                span.innerHTML = 'X';
                li.appendChild(span)
                li.setAttribute("style", "text-decoration: line-through");
                li.setAttribute('data-value', getData[i].task_name);
            }
        }
    }

}
getData();