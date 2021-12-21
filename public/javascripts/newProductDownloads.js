let form = document.querySelector('form#form')
let downloadCategory = document.querySelector('select#downloadCategory')
let downloadName = document.querySelector('input#downloadName')
let downloadType = document.querySelector('select#downloadType')
let downloadLink = document.querySelector('input#downloadLink')
let downloadSubmitButton = document.querySelector('button#downloadSubmitButton')
let table = document.querySelector('table#table')

downloadCategory.selectedIndex = -1;
downloadType.selectedIndex = -1;

////////////////////////////////// expresiones regulares ////////////////////////////////////

let onlyLettersREGEX = /^[a-zA-Z\s]*$/;
let onlyletterNumberDashREGEX = /^[0-9A-Za-z\s\-]+$/;
let URLREGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

////////////////////////////////// mensajes de error ////////////////////////////////////

let emptyError = "no puede esta vacio"
let onlyLettersError = "solo puede contener letras"
let onlyletterNumberDashError = "solo puede contener letras numeros o guion"
let URLError = "debe contener una URL valida"

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

function inputCheck(input, errorType, RGEX,){
    errorMsg = document.querySelector('small#' + input.id);
    if(input.value === "" && submitExecuted === true ){
        errorEmpty = returErrorString(emptyError, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorEmpty)
        return false        
    }else if (input.value != "" && typeof(RGEX != 'undefined') && !RGEX.test(input.value)){
        errorREGEX = returErrorString(errorType, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorREGEX)
        return false
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }
}

////////////////////////////////// funciones de validacion ////////////////////////////////////

function inputCheck(input, errorType, RGEX){
    errorMsg = document.querySelector('small#' + input.id);
    if(input.value === "" && submitExecuted === true ){
        errorEmpty = returErrorString(emptyError, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorEmpty)
        return false
    }else if (input.value != "" && !RGEX.test(input.value)){
        errorREGEX = returErrorString(errorType, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorREGEX)
        return false
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }
}

////////////////////////////////// funciones de poblacion ////////////////////////////////////

let downloads = {specsheet: [], resources: [], manuals: [], software: [], FAQ: []}

///////// add ///////

function addRow(category, name, type, url) {
    saveValues(category, name, type, url)
    updateRow()
    clearInputs(category, name, type, url)
}

function saveValues(category, name, type, url) {
    downloads[category.value].push({name: name.value, type: type.value, url: url.value})
}

function clearInputs(category, name, type, url) {
    category.selectedIndex = -1
    name.value = ''
    type.selectedIndex = -1
    url.value = ''
}

///////// delete ///////

function removeRow(id, category) {
    deleteValues(id, category)
    updateRow()
}

function deleteValues(id, category) {
    downloads[category].splice(id, 1)
}

///////// move ///////

function moveRowUp(id, category) {
    console.log(id)
    index = parseInt(id)
    moveValues(index, index - 1, category)
    updateRow()
}

function moveRowDown(id, category) {
    console.log(id)
    index = parseInt(id)
    moveValues(index, index + 1, category)
    updateRow()
}

function moveValues(oldIndex, newIndex, category) {
    if (newIndex >= downloads[category].length) {
        
        var k = newIndex - downloads[categor].length + 1;
        while (k--) {
            downloads[category].push(undefined);
        }
    }
    downloads[category].splice(newIndex, 0, downloads[category].splice(oldIndex, 1)[0]);
};

///////// update ///////

function updateRow() {
    populateTable()
    deleteRowButtonListeners()
    moveUpRowButtonListeners()
    moveDownRowButtonListeners()
}

function populateTable() {
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
    for (let [category, items] of Object.entries(downloads)) {
        thead = document.createElement('thead')
        trc = document.createElement('tr')
        tdc = document.createElement('td')
        h4c = document.createElement('h4')
        ic = document.createElement('i')
        divc = document.createElement('div')
        

        
        if (items.length > 0) {
            trc.className = 'table-light text-secondary'
            tdc.className = 'ps-3 py-2' 
            h4c.className = 'm-0 d-flex align-items-center'

            if (category == 'specsheet'){
                ic.className = 'me-2 fas fa-clipboard-list'
                h4c.appendChild(ic)
                divc.textContent = 'Ficha Tecnica'
                h4c.appendChild(divc)
            }else if (category == 'resources'){
                ic.className = 'me-2 fas fa-photo-video'
                h4c.appendChild(ic)
                divc.textContent = 'Recursos'
                h4c.appendChild(divc)
            }else if (category == 'manuals'){
                ic.className = 'me-2 fas fa-book'
                h4c.appendChild(ic)
                divc.textContent = 'Manuales'
                h4c.appendChild(divc)
            }else if (category == 'software'){
                ic.className = 'me-2 fas fa-compact-disc'
                h4c.appendChild(ic)
                divc.textContent = 'Software'
                h4c.appendChild(divc)
            }else if (category == 'FAQ'){
                ic.className = 'me-2 fas fa-question-circle'
                h4c.appendChild(ic)
                divc.textContent = 'Preguntas Frecuentes'
                h4c.appendChild(divc)
            }

            
            tdc.appendChild(h4c)
            trc.appendChild(document.createElement('td'))
            trc.appendChild(tdc)
            trc.appendChild(document.createElement('td'))
            trc.appendChild(document.createElement('td'))
            thead.appendChild(trc)
            table.appendChild(thead)
        }




        items.forEach((item, index) => {
            tbody = document.createElement('tbody')
            trv = document.createElement('tr')
            tdx = document.createElement('td')
            tdn = document.createElement('td')
            tdt = document.createElement('td')
            tdu = document.createElement('td')
            au = document.createElement('a')
            iu = document.createElement('i')
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
            buttonX.className = category + ' buttonX p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
            buttonX.type = 'button'
            buttonX.id = index
            buttonX.appendChild(smallX)

            iconUp.className = 'fas fa-chevron-up text-seconday pt-2 px-1'
            smallUp.appendChild(iconUp)
            buttonUp.className =  category + ' buttonUp p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
            buttonUp.type = 'button'
            buttonUp.id = index
            buttonUp.appendChild(smallUp)

            iconDown.className = 'fas fa-chevron-down text-seconday pt-2 px-1'
            smallDown.appendChild(iconDown)
            buttonDown.className = category + ' buttonDown p-0 m-0 btn btn-link btn-sm btn-padding-y-sm shadow-none'
            buttonDown.type = 'button'
            buttonDown.id = index
            buttonDown.appendChild(smallDown)
            
            tdx.className = 'px-2 d-flex'
            tdx.appendChild(buttonX)
            tdx.appendChild(buttonUp)
            tdx.appendChild(buttonDown)
 
            tdn.className = 'px-2 w-75'
            tdn.textContent = item.name

            tdt.className = 'px-2'
            tdt.textContent = item.type

            if (item.type == 'URL' || item.type == 'YOUTUBE') {
                iu.className = 'fas fa-link'
            }else{
                iu.className = 'fas fa-arrow-circle-down'
            }

            au.src = item.href
            au.appendChild(iu)
            tdt.className = 'px-2'
            tdu.appendChild(au) 
            


            trv.className = 'text-secondary'
            trv.id = index
        
            trv.appendChild(tdx)
            trv.appendChild(tdn)
            trv.appendChild(tdt)
            trv.appendChild(tdu)
    
            tbody.appendChild(trv)
            table.appendChild(tbody)
        })
    }
}

async function sendDownloads() {
    downloadsJSON = JSON.stringify(downloads)
    console.log(downloadsJSON)
    id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    url = 'http://localhost:8080/admin/product/saveDownloads/' + id
    console.log(url)
    response = await fetchDownloads(url, downloadsJSON)
    data = await response.json();
    console.log(data)
    return data
}

    
async function fetchDownloads(url, downloads) {
    let response =  await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: downloads
    })    
    return response;
}

////////////////////////////////// event listeners ////////////////////////////////////

let submitExecuted = null

downloadCategory.addEventListener('blur', function(){inputCheck(downloadCategory, onlyLettersError, onlyLettersREGEX)})
downloadName.addEventListener('blur', function(){inputCheck(downloadName, onlyLettersError, onlyLettersREGEX)})
downloadType.addEventListener('blur', function(){inputCheck(downloadType, onlyLettersError, onlyLettersREGEX)})
downloadLink.addEventListener('blur', function(){inputCheck(downloadLink, URLError, URLREGEX)})

form.addEventListener('submit', async function(submit) {
    submit.preventDefault()
    response = await sendDownloads()
    if (response.result == 'redirect') {
        console.log(response.url)
        window.location.replace(response.url);
    }
});

downloadSubmitButton.addEventListener('click', function(){
    submitExecuted = true
    downloadCategoryResult = inputCheck(downloadCategory, onlyLettersError, onlyLettersREGEX)
    downloadNameResult = inputCheck(downloadName, onlyletterNumberDashError, onlyletterNumberDashREGEX)
    downloadTypeResult = inputCheck(downloadType, onlyLettersError, onlyLettersREGEX)
    downloadLinkResult = inputCheck(downloadLink, URLError, URLREGEX)
    if (downloadCategoryResult == true, downloadNameResult == true, downloadTypeResult == true, downloadLinkResult == true) {
        addRow(downloadCategory, downloadName, downloadType, downloadLink)
    }
})

function deleteRowButtonListeners() {
    deleteRowButtons = document.querySelectorAll('button.buttonX')
    deleteRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeRow(button.id, button.classList[0])
        });
    });
}

function moveUpRowButtonListeners() {
    moveUpRowButtons = document.querySelectorAll('button.buttonUp')
    moveUpRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveRowUp(button.id, button.classList[0])
        });
    });
}

function moveDownRowButtonListeners() {
    moveDownRowButtons = document.querySelectorAll('button.buttonDown')
    moveDownRowButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveRowDown(button.id, button.classList[0])
        });
    });
}

