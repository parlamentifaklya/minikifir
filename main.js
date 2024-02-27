let OM = document.getElementById('OM_input')
let search = document.getElementById('search-gomb')
let results = document.getElementById('results')
let listAll = document.getElementById('list-gomb')
let errorText = document.getElementById('error')
let form = document.getElementById('inputform')
let sliderButton = document.getElementById('slider-button')
let diy_switch = false

search.addEventListener('click', e => {
  while (results.children.length > 1) {
    results.removeChild(results.lastChild)
  }
  Search()
  form.reset()
});

listAll.addEventListener('click', e => {
  while (results.children.length > 1) {
    results.removeChild(results.lastChild)
  }
  List()
  form.reset()
  errorText.innerText = ''
});


sliderButton.addEventListener('change', e => {
  if(e.target.checked === true) {
    diy_switch = true
    OM.addEventListener('keyup', e => {
      if (e.key === 'Backspace') {
        while (results.children.length > 1) {
          results.removeChild(results.lastChild);
        }
        errorText.innerText = '';
        if (OM.value !== '') {
          filterSearch();
        }
      } else {
        filterSearch();
      }
    });
  } else {
    diy_switch = false
  }
});

let Search = () => {
  let row = document.createElement('tr');
  
  const diak = datas.find(diak => diak.OmAzon === OM.value);
  if (diak) {
    row.innerHTML = `<td> ${diak.OmAzon} </td> <td> ${diak.Nev} </td> 
      <td> ${diak.ErtesitesiCime} </td> <td> ${diak.Email} </td> <td> ${diak.SzuletesiDatum.slice(0, 10)} </td>
      <td> ${diak.MatekPont} </td> <td> ${diak.MagyarPont} </td>`;
    
    results.appendChild(row);
    errorText.innerText = ''
  } else {
    errorText.innerText = 'Hibás OM'
  }
}

let List = () => {
  for (let index = 0; index < datas.length; index++) {
    let row = document.createElement('tr');
    row.innerHTML = `<td> ${datas[index].OmAzon} </td> <td> ${datas[index].Nev} </td> 
      <td> ${datas[index].ErtesitesiCime} </td> <td> ${datas[index].Email} </td> <td> ${datas[index].SzuletesiDatum.slice(0, 10)} </td>
      <td> ${datas[index].MatekPont} </td> <td> ${datas[index].MagyarPont} </td>`;
    results.appendChild(row);
  }

}

let filterSearch = () => {
  if (diy_switch) {
    let filterResult = datas.filter(diak => diak.OmAzon.startsWith(OM.value));
    if (filterResult.length > 0) {
      filterResult.forEach(diak => {
        let row = document.createElement('tr');
        row.innerHTML = `<td> ${diak.OmAzon} </td> <td> ${diak.Nev} </td> 
        <td> ${diak.ErtesitesiCime} </td> <td> ${diak.Email} </td> <td> ${diak.SzuletesiDatum.slice(0, 10)} </td>
        <td> ${diak.MatekPont} </td> <td> ${diak.MagyarPont} </td>`;
        results.appendChild(row);
      });
      errorText.innerText = '';
    } else {
      errorText.innerText = 'Hibás OM';
    }
  }
}