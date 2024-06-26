const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert('Input field cannot be blank. Please write something');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = 'X';
        li.appendChild(span)
        // console.log("3333333333333", listContainer)
    }
    inputBox.value = '';
    setData();
}

listContainer.addEventListener('click', function(e){
    // console.log(e.target.tagName)
    if(e.target.tagName === 'SPAN') {
        // console.log('22222',e.target.parentElement)
        e.target.parentElement.remove('li')
    }
    setData();
})

function setData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function getData(){
    listContainer.innerHTML = localStorage.getItem('data');
}
getData();