let form = document.querySelector('form#form')
let name = document.querySelector('input#name')
let category = document.querySelector('select#category')
let subcategory = document.querySelector('select#subcategory')
let brand = document.querySelector('select#brand')
let detail = document.querySelector('textarea#detail')
let description = document.querySelector('textarea#description')
let image = document.querySelector('input#image')
let price = document.querySelector('input#price')
let discount = document.querySelector('input#discount')
let stock = document.querySelector('input#stock')
let status = document.querySelector('select#status')
let sku = document.querySelector('input#sku')
let formSubmitButton = document.querySelector('button#formSubmitButton')

////////////////////////////////// expresiones regulares ////////////////////////////////////

let onlyLettersREGEX = /^[a-zA-Z\s]*$/;
let onlyNumbersREGEX = /^\d+$/;
let onlyletterNumberDashREGEX = /^[0-9A-Za-z\s\-]+$/;
let extensionsREGEX = /(\.jpg|\.jpeg|\.png)$/i;
let skuREGEX = /^[a-zA-Z0-9_-]*$/;
let URLREGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

////////////////////////////////// mensajes de error ////////////////////////////////////

let emptyError = "no puede esta vacio"
let onlyLettersError = "solo puede contener letras"
let onlyNumbersError = "solo puede contener numeros"
let onlyletterNumberDashError = "solo puede contener letras numeros o guion"
let only5images = "Solo puede contener un maximo de 5 imagenes"
let extensionError = "Solo puede contener imagenes .JPG .JPEG y .PNG"
let skuError = "debe contener un codigo valido"

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

function submitCheck(input, errorType, REGEX,){
    errorMsg = document.querySelector("small#" + input.id);
    if(input.value === ""){
        errorEmpty = returErrorString(emptyError, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorEmpty)
        return false
    }else if (typeof REGEX != 'undefined' && !REGEX.test(input.value)){
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

function inputCheck(input, errorType, REGEX,){
    errorMsg = document.querySelector('small#' + input.id);
    if(input.value === "" && submitExecuted === true ){
        errorEmpty = returErrorString(emptyError, input)
        setErrorClass(input)
        setErrorMsg(errorMsg, errorEmpty)
        return false
    }else if (input.value != "" && REGEX &&!REGEX.test(input.value)){
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

function inputFileCheck() {
    errorMsg = document.querySelector('small#image');
    if(image.files.length == 0 ){
        errorEmpty = returErrorString(emptyError, image)
        setErrorClass(image)
        setErrorMsg(errorMsg, errorEmpty)
        return false
    } else if (image.files.length > 5) {
        setErrorClass(image)
        setErrorMsg(errorMsg, only5images)
        return false
    } else if (!Array.from(image.files).every(file => extensionsREGEX.exec(file.name))) {
        setErrorClass(image)
        setErrorMsg(errorMsg, extensionError)
        return false
    } else {
        setSuccessClass(image)
        setSuccessMsg(errorMsg)
    }
}

////////////////////////////////// funciones de poblacion ////////////////////////////////////

async function fetchData(path) {
    response = await fetch('http://localhost:8080/admin/product/' + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
}

async function getData(path) {
    response = await fetchData(path)
    data = await response.json()
    return data
}

(function(){
    populateCategories()
    populateSubcategories()
    populateBrands()
})()

async function populateCategories(){
    categories = await getData('getCategories')
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.textContent = cat.category;
        option.value = cat.id;
        category.appendChild(option);
        category.selectedIndex = -1;
    });
}

async function populateSubcategories(){
    subcategories = await getData('getSubcategories')
    while(subcategory.firstChild){
        subcategory.removeChild(subcategory.firstChild);
    }
    subcategories.forEach(subcat => {
        if (category.value == subcat.categoryId) {
            option = document.createElement('option');
            option.textContent = subcat.subcategory;
            option.value = subcat.id;
            subcategory.appendChild(option);
            subcategory.selectedIndex = -1;
        }
    });
}

async function populateBrands(){
    brands = await getData('getBrands')
    brands.forEach(bra => {
        const option = document.createElement('option');
        option.textContent = bra.brand;
        option.value = bra.id;
        brand.appendChild(option);
        brand.selectedIndex = -1;
    });
}

////////////////////////////////// event listeners ////////////////////////////////////

category.addEventListener('change', function(){
    populateSubcategories()
})

let submitExecuted = null

name.addEventListener('blur', function(){inputCheck(name)})
category.addEventListener('blur', function(){inputCheck(category)})
subcategory.addEventListener('blur', function(){inputCheck(subcategory)})
detail.addEventListener('blur', function(){inputCheck(detail)})
description.addEventListener('blur', function(){inputCheck(description)})
image.addEventListener('change', function(){inputFileCheck()})
price.addEventListener('blur', function(){inputCheck(price, onlyNumbersError, onlyNumbersREGEX)})
discount.addEventListener('blur', function(){inputCheck(discount, onlyNumbersError, onlyNumbersREGEX)})
stock.addEventListener('blur', function(){inputCheck(stock, onlyNumbersError, onlyNumbersREGEX)})
status.addEventListener('blur', function(){inputCheck(status, onlyNumbersError, onlyNumbersREGEX)})
sku.addEventListener('blur', function(){inputCheck(sku, skuError, skuREGEX)})

form.addEventListener('submit', function( submit ) {
    
    submitExecuted = true
    nameResult = inputCheck(name, onlyletterNumberDashError, onlyletterNumberDashREGEX)
    categoryResult = inputCheck(category, onlyNumbersError, onlyNumbersREGEX)
    subcategoryResult = inputCheck(subcategory, onlyNumbersError, onlyNumbersREGEX)
    detailResult = inputCheck(detail)
    descriptionResult = inputCheck(description)
    imageResult = inputCheck(image)
    priceResult = inputCheck(price, onlyNumbersError, onlyNumbersREGEX)
    discountResult = inputCheck(discount, onlyNumbersError, onlyNumbersREGEX)
    stockResult = inputCheck(stock, onlyNumbersError, onlyNumbersREGEX)
    statusResult = inputCheck(status, onlyNumbersError, onlyNumbersREGEX)
    skuResult = inputCheck(sku, skuError, skuREGEX)
    if (nameResult == true && categoryResult == true && subcategoryResult == true && detailResult == true && descriptionResult == true && imageResult == true && priceResult == true && discountResult == true && stockResult == true && statusResult == true && skuResult == true) {
        form.submit()
    }else{
        submit.preventDefault()
    }

});