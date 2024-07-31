const apiURL = 'https://dogapi.dog/api/v2/breeds';
const tableData = document.getElementById('table-data');

let originalData = [];
let filterData = [];
fetch(apiURL)
.then(response => {
    if(response.ok){
        return response.json();
    } else {
        throw new Error('API request failed');
    }
})
.then(data => {
    if(data.data.length > 0){
        originalData = data.data;
        filterData = data.data;
        renderUI();
    }
})
.catch(err => {
    console.error('Err',err);
})

function renderUI() {
    let temp = "";
    filterData.forEach((itemData => {
            temp += `<tr>
             <td> ${itemData.attributes.name} </td>
             <td> ${itemData.attributes.description} </td>
             <td> ${itemData.attributes.life.min} - ${itemData.attributes.life.max} </td>
             <td> ${itemData.attributes.female_weight.min} - ${itemData.attributes.female_weight.max} </td>
             <td> ${itemData.attributes.male_weight.min} - ${itemData.attributes.male_weight.max} </td>
             </tr>`
        }))
        tableData.innerHTML = temp;
}

let sortBy = -1;
let sortRule = "";
let breedName = document.getElementById('Breed');
let ageRange = document.getElementById('Age');
let maleWeight = document.getElementById('maleWeight');
let femaleWeight = document.getElementById('femaleWeight');
let dataTable = document.getElementById('data-table');

function sortTable(n){
    console.log('dataTable',dataTable)
    if(sortBy === n){
        if(sortRule === "ASC"){
            sortRule = "DESC";
            if(n === 0){
            breedName.innerHTML = '&#x2193';
            document.getElementById('dogBreed').style.backgroundColor = "aqua";
            filterData = originalData.sort(function(a,b){
                return a.attributes.name.localeCompare(b.attributes.name)
            })
            }
            if(n === 1){
            ageRange.innerHTML = '&#x2193';
            document.getElementById('ageBreed').style.backgroundColor = "aqua";
            filterData = originalData.sort(function(a,b){
                return a.attributes.life.min - b.attributes.life.min
            })
            }
            if(n === 2){
            maleWeight.innerHTML = '&#x2193';
            document.getElementById('maleBreed').style.backgroundColor = "aqua";
            filterData = originalData.sort(function(a,b){
                return a.attributes.female_weight.min - b.attributes.female_weight.min
            })
            }
            if(n === 3){
            femaleWeight.innerHTML = '&#x2193';
            document.getElementById('femaleBreed').style.backgroundColor = "aqua";
            filterData = originalData.sort(function(a,b){
                return a.attributes.male_weight.min - b.attributes.male_weight.min
            })
            }
            renderUI();
        }else{
            sortRule = 'ASC';
            if(n === 0){
            breedName.innerHTML = '&#x2191;';
            document.getElementById('dogBreed').style.backgroundColor = "lightblue";
            filterData = originalData.sort(function(a,b){
                return b.attributes.name.localeCompare(a.attributes.name)
            })
            }
            if(n === 1){
            ageRange.innerHTML = '&#x2191;';
            document.getElementById('ageBreed').style.backgroundColor = "lightblue";
            filterData = originalData.sort(function(a,b){
                return b.attributes.life.min - a.attributes.life.min
            })
            }
            if(n === 2){
            maleWeight.innerHTML = '&#x2191;';
            document.getElementById('maleBreed').style.backgroundColor = "lightblue";
            filterData = originalData.sort(function(a,b){
                return b.attributes.female_weight.min - a.attributes.female_weight.min
            })
            }
            if(n === 3){
            femaleWeight.innerHTML = '&#x2191;';
            document.getElementById('femaleBreed').style.backgroundColor = "lightblue";
            filterData = originalData.sort(function(a,b){
                return b.attributes.male_weight.min - a.attributes.male_weight.min
            })
            }
            
            renderUI();
        }
    } else {
        sortBy = n;
        sortRule = "ASC";
    }
}

function debounce(func,delay){
    let timeoutId;
    return function(...args) {
        if(timeoutId) {clearTimeout(timeoutId);}
        timeoutId = setTimeout(() => func.apply(this,args), delay);
    };
}

let text = document.getElementById('enterValue')

const searchText = (input) => {
    filterData = originalData.filter(data => {
        return data.attributes.description.indexOf(input) > 0;
    })
    renderUI()
}

const debounceSearch = debounce(searchText, 500);

text.addEventListener("input", (e) => {
    console.log(e.target.value);
    debounceSearch(e.target.value)
})
