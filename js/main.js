const form = document.querySelector('#form');
const entriesUl = document.querySelector('#entries');
const select = document.querySelector('#selectUrgency');
const inputTitle = document.querySelector('#title');



function printEntries(pList, pDom) {
  pDom.innerHTML = "";
  pList.forEach(entry => printOneEntry(entry, pDom));


}
function printOneEntry(pEntry, pDom) {
  const li = document.createElement('li');
  li.textContent = `${pEntry.title}`;


  const button = document.createElement('button');
  button.textContent = 'Borrar';
  li.appendChild(button);
  button.dataset.id = pEntry.id

  button.style.marginLeft = '5px';

  button.addEventListener('click', deleteEntry)

  pDom.appendChild(li);
}
printEntries(tasks, entriesUl);
//printed out whats in the data leave it alone :)//




form.addEventListener('submit', getDataForm);


function getDataForm(event) {
  event.preventDefault();



  const newEntry = {

    title: event.target.title.value,
  }
  addTask(newEntry, tasks);
  event.target.reset();
}
function addTask(pEntry, pList) {
  pList.push(pEntry);

  printEntries(pList, entriesUl);
}





function addEntry(pEntry, pList) {

  let position = pList.findIndex(entry => entry.title === pEntry.title);

  if (position === -1) {
    pList.push(pEntry);
    printOneEntry(pEntry, entriesUl);
    id++
  } else {
    alert('Task duplicado')
  }
}

function deleteEntry(event) {

  let id = parseInt(event.target.dataset.id)
  const liBorrar = event.target.parentNode;
  liBorrar.parentNode.removeChild(liBorrar);

  deleteInArray(id, entriesUl);

  function deleteInArray(pId, pList) {

    let position = pList.findIndex(entry => entry.id === pId)
    if (position !== -1) {
      pList.splice(position, 1);
    }

  }
}

const selector = document.querySelector('#findUrgency');
selector.addEventListener('change', getUrgency);

function getUrgency(event) {
  let urgency = event.target.value;
  let listaFiltrada = filtrarPorUrgency(tasks, urgency);

  printEntries(listaFiltrada, sectionTasks);
}

function filtrarPorUrgency(pList, pUrgency) {
  return pList.filter(tasks => tasks.urgency === pUrgency);
}

function pintarUrgency(pList, pDom) {
  pList.forEach(task => printOneTask(task, pDom));
}

const input = document.querySelector('#findToDo');

findToDo.addEventListener('input', getSearch);


function getSearch(event) {
  let busqueda = event.target.value;
  let listaFiltrada = filtrarPorTexto(tasks, busqueda);
  printEntries(listaFiltrada, entriesUl);
}


function filtrarPorTexto(pList, pBusqueda) {
  return pList.filter(entry => entry.title.toLowerCase().includes(pBusqueda.toLowerCase()))
}


