const apiURL = 'https://dogapi.dog/api/v2/breeds';
const tableData = document.getElementById('table-data');

fetch(apiURL)
.then(response => {
    if(response.ok){
        return response.json();
    } else {
        throw new Error('API request failed');
    }
})
.then(data => {
    console.log('Data',data.data);
    if(data.data.length > 0){
        let temp = "";
        data.data.forEach((itemData => {
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
})
.catch(err => {
    console.error('Err',err);
})