let itemTemplate = document.getElementById('itemTemplate').content
let itemsDumper = document.getElementById('itemsDumper')


async function loadShoppingCart(){
    let discountCode = sessionStorage.getItem('discountCode');
    let discountInput = document.getElementById('discountInput');
    discountInput.value = discountCode ? discountCode : ''
    let data = await fetchData('getItems', {discountCode: discountInput.value})

    data.items.forEach(item => {
        let newItemTemplate = document.importNode(itemTemplate, true)
        changeTemplateProperties(item, newItemTemplate)
        addListeners(item, newItemTemplate)
        itemsDumper.appendChild(newItemTemplate)
    });
    updateSum(data.discount, data.total)

    document.getElementById('discountButton').addEventListener('click', () => {validateDiscount()});
    document.getElementById('cardNumber').addEventListener('keypress', (e) => {formatNumber(e)});
    document.getElementById('expirationDate').addEventListener('keyup', (e) => {formatDate(e)});
    document.getElementById('processPayment').addEventListener('click', (e) => {processPayment()});



    if(document.getElementById('shoppingCartLoader')){
        itemsDumper.removeChild(document.getElementById('shoppingCartLoader'))
    }
}




function changeTemplateProperties(item, newItemTemplate){
    newItemTemplate.getElementById('image').src = "/images/products/" + JSON.parse(item.product.image)[0]
    newItemTemplate.getElementById('name').textContent = item.product.name
    newItemTemplate.getElementById('sku').textContent = item.product.sku
    newItemTemplate.getElementById('price').textContent = item.product.price - ((item.product.price * 100) / item.product.discount)
    newItemTemplate.getElementById('itemCounter').value = item.quantity
    newItemTemplate.getElementById('subtotal').textContent = (item.product.price - ((item.product.price * 100) / item.product.discount)) * item.quantity
}

function addListeners(item, newItemTemplate){
    let itemCounter = newItemTemplate.getElementById('itemCounter')
    let subtotal = newItemTemplate.getElementById('subtotal')
    newItemTemplate.getElementById('removeItem').addEventListener('click', (e) => {removeItem(e, item)});
    newItemTemplate.getElementById('lessItems').addEventListener('click', () => {lessItems(subtotal, itemCounter, item)});
    newItemTemplate.getElementById('moreItems').addEventListener('click', () => {moreItems(subtotal, itemCounter, item)});
    itemCounter.addEventListener('change', () => {changeQuantity(subtotal, itemCounter, item)});

}

async function removeItem(event, item){
    let response = await fetchData('deleteItem', {itemId: item.id})
    if(response.meta.status == 200){
        event.target.closest('.itemContainer').remove()
    }
}

function moreItems(subtotal, itemCounter, item){
    if (itemCounter.value < item.product.stock) {
        itemCounter.value ++
        changeQuantity(subtotal, itemCounter, item)
    }

}

function lessItems(subtotal, itemCounter, item){
    if (itemCounter.value > 1) {
        itemCounter.value --
        changeQuantity(subtotal, itemCounter, item)
    }

}

async function changeQuantity(subtotal, itemCounter, item){
    if (itemCounter.value < item.product.stock && itemCounter.value > 1) {
        subtotal.textContent = (item.product.price - ((item.product.price * 100) / item.product.discount)) * itemCounter.value
        if(!itemCounter.timer){itemCounter.timer = undefined}
        window.clearTimeout(itemCounter.timer);
        itemCounter.timer = window.setTimeout(async ()=>{
            await fetchData('changeQuantity', {itemId: item.id, quantity: itemCounter.value})
        }, 1000);
    }
}

async function validateDiscount(){
    let discountInput = document.getElementById('discountInput')
    let data = await fetchData('getItems', {discountCode: discountInput.value})
    updateSum(data.discount, data.total)
    if (data.discount != 0) {
        sessionStorage.setItem('discountCode', discountInput.value);
    }

}

function updateSum(discount, total){
    document.getElementById('discount').textContent = discount
    document.getElementById('total').textContent = total
}

function formatNumber(e){
    if(e.target.value.length<19){
      e.target.value= e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
      return true;
    }else{
        e.preventDefault()
    }
}


function formatDate(e) {
    var inputChar = String.fromCharCode(e.keyCode);
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      e.preventDefault()
    }
  
    e.target.value = e.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
}
  

async function processPayment(){
    let response = await fetchData('purchaseItems')
    console.log(response)
}
  

async function fetchData(path, data) {
    response = await fetch('http://localhost:8080/shoppingCart/' + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return response.json();
}



loadShoppingCart()




