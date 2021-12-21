let form = document.querySelector('form#form')
let formSubmitButton = document.querySelector('button#formSubmitButton')
let specsheetProperty = document.querySelector('input#specsheetProperty')
let specsheetDescription = document.querySelector('input#specsheetDescription')
let specsheetSubmitButton = document.querySelector('button#specsheetSubmitButton')
let tableRow = document.querySelector('tbody#table-row')

////////////////////////////////// expresiones regulares ////////////////////////////////////

let onlyLettersREGEX = /^[a-zA-Z\s]*$/;

////////////////////////////////// mensajes de error ////////////////////////////////////

let emptyError = "no puede esta vacio"
let onlyLettersError = "solo puede contener letras"

////////////////////////////////// funciones de estilizacion ////////////////////////////////////

function returErrorString(errorType, fieldName){
    labelName = document.querySelector('label#' + fieldName.id).innerHTML
    return "El campo " + labelName + " " + errorType
}

function setErrorClass(input){
    input.classList.add("is-invalid")
}

function setErrorMsg(errorMsg, error){
    errorMsg.classList.remove("d-none")
    errorMsg.innerText = error
}

function setSuccessClass(input){
    input.classList.remove("is-invalid")
}

function setSuccessMsg(errorMsg){
    errorMsg.classList.add("d-none")
}

////////////////////////////////// funciones de validacion ////////////////////////////////////

function inputCheck(input, errorType, REGEX){
    errorMsg = document.querySelector('small#' + input.id);
    if(input.value === "" && submitExecuted === true ){
        errorEmpty = returErrorString(emptyError, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorEmpty)
        return false
    // }else if (input.value != ""&& REGEX && !REGEX.test(input.value)){
    //     errorREGEX = returErrorString(errorType, input)
    //     setErrorClass(input)
    //     setErrorMsg(errorMsg, errorREGEX)
    //     return false
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }
}

////////////////////////////////// funciones de poblacion ////////////////////////////////////

let specsheet = []

///////// add ///////

function addRow(property, description) {
    saveValues(property, description)
    updateRow()
    clearInputs(property, description)
}

function saveValues(property, description) {
    specsheet.push({property: property.value, description: description.value})
}

function clearInputs(property, description) {
    property.value = ''
    description.value = ''
}

///////// delete ///////

function removeRow(id) {
    deleteValues(id)
    updateRow()
}

function deleteValues(id) {
    specsheet.splice(id, 1)
}

///////// move ///////

function moveRowUp(id) {
    index = parseInt(id)
    moveValues(index, index + 1)
    updateRow()
}

function moveRowDown(id) {
    index = parseInt(id)
    moveValues(index, index - 1)
    updateRow()
}

function moveValues(oldIndex, newIndex) {
    if (newIndex >= specsheet.length) {
        var k = newIndex - specsheet.length + 1;
        while (k--) {
            specsheet.push(undefined);
        }
    }
    specsheet.splice(newIndex, 0, specsheet.splice(oldIndex, 1)[0]);
};

///////// update ///////

function updateRow() {
    populateTable()
    deleteRowButtonListeners()
    moveUpRowButtonListeners()
    moveDownRowButtonListeners()
}

function populateTable() {
    while(tableRow.firstChild){
        tableRow.removeChild(tableRow.firstChild);
    }
    specsheet.forEach((spec, index)=> {
        tr = document.createElement('tr')
        tdx = document.createElement('td')
        tdp = document.createElement('td')
        tdd = document.createElement('td')
        buttonX = document.createElement('button')
        buttonUp = document.createElement('button')
        buttonDown = document.createElement('button')
        smallX = document.createElement('small')
        smallUp = document.createElement('small')
        smallDown = document.createElement('small')
        iconX = document.createElement('i')
        iconUp = document.createElement('i')
        iconDown = document.createElement('i')
        
        iconX.className = 'fas fa-times text-danger pt-2 px-1'
        smallX.appendChild(iconX)
        buttonX.className = 'buttonX p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
        buttonX.type = 'button'
        buttonX.id = index
        buttonX.appendChild(smallX)

        iconUp.className = 'fas fa-chevron-up text-seconday pt-2 px-1'
        smallUp.appendChild(iconUp)
        buttonUp.className = 'buttonUp p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
        buttonUp.type = 'button'
        buttonUp.id = index
        buttonUp.appendChild(smallUp)

        iconDown.className = 'fas fa-chevron-down text-seconday pt-2 px-1'
        smallDown.appendChild(iconDown)
        buttonDown.className = 'buttonDown p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
        buttonDown.type = 'button'
        buttonDown.id = index
        buttonDown.appendChild(smallDown)
        
        tdx.classList = 'px-2 d-flex'
        tdx.appendChild(buttonX)
        tdx.appendChild(buttonUp)
        tdx.appendChild(buttonDown)
        
        tdp.classList = 'w-25'
        tdp.textContent = spec.property

        tdd.classList = 'w-75'
        tdd.textContent = spec.description

        tr.className = 'text-secondary'
        tr.id = index
        tr.appendChild(tdx)
        tr.appendChild(tdp)
        tr.appendChild(tdd)
        tableRow.appendChild(tr)
    })
}

async function sendSpecsheet() {
    specsheetJSON = JSON.stringify(specsheet)
    id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    url = 'http://localhost:8080/admin/product/saveSpecsheet/' + id
    response = await fetchSpecsheet(url, specsheetJSON)
    data = await response.json();
    if (data.result == 'redirect') {
        console.log(data.url)
        window.location.replace(data.url);
    }
}

    
async function fetchSpecsheet(url, specsheet) {
    let response =  await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: specsheet
    })    
    return response;
}

////////////////////////////////// event listeners ////////////////////////////////////

let submitExecuted = null

specsheetProperty.addEventListener('blur', function(){inputCheck(specsheetProperty)})
specsheetDescription.addEventListener('blur', function(){inputCheck(specsheetDescription)})

form.addEventListener('submit', async function(submit) {
    submit.preventDefault()
    response = await sendSpecsheet()
    console.log(response)
});

specsheetSubmitButton.addEventListener('click', function(){
    submitExecuted = true
    specsheetPropertyResult = inputCheck(specsheetProperty)
    specsheetDescriptionResult = inputCheck(specsheetDescription)
    if (specsheetPropertyResult == true && specsheetDescriptionResult == true) {
        addRow(specsheetProperty, specsheetDescription)
    }
})

function deleteRowButtonListeners() {
    deleteRowButtons = document.querySelectorAll('button.buttonX')
    deleteRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeRow(button.id)
        });
    });
}

function moveUpRowButtonListeners() {
    moveUpRowButtons = document.querySelectorAll('button.buttonUp')
    moveUpRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveRowUp(button.id)
        });
    });
}

function moveDownRowButtonListeners() {
    moveDownRowButtons = document.querySelectorAll('button.buttonDown')
    moveDownRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveRowDown(button.id)
        });
    });
}

