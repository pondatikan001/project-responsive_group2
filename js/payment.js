const Size=[7,8,9,10,11]
const gettoCart = () => {
    const order = JSON.parse(localStorage.getItem('product'))
    console.log(order);
    let i = 0
    document.getElementById("showProduct").innerHTML = order.map((product) =>


        `
        <div class="card card-bag  ">
            <div class="row">
                <div class="col-3">
                <img src="${product.prdImageUrl}"class="img-fluid rounded-start" alt="...">
                 </div>
                <div class="col-9 card-body-bag-right">
                    <div class="card-body-bag">
                        <h5 class="card-title-bag">${product.prdPrice}</h5>
                        <p class="card-text-bag">${product.prdname}</p>
                        <div class="row g-3 bag-select">
                            <div class="col-5">
                                <label for="inputEmail4" class="form-label">Size</label>
                                <div  aria-label="Default select example">
                                <div>${product.prdSize}</div>
                                </div>
                            </div>
                            <div class="col-3">
                                <label for="inputEmail4" class="form-label">Quantity</label>
                                    <select class="form-select" aria-label="Default select example" id="select-num${i}" onchange = "summary();">
                                        <option value ="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <a class="card-bag-remove" id = "btn-remove${i}" onclick="removeProduct(${i})">Remove this item</a>
                    </div>
                </div>
            </div>
            <div class="detail-small ">
                <div class="row ">
                    <div class="col-4 number">
                        <p " id="numChoose${i}">x1</p>
                    </div>
                    <div class="col price-red">
                        <p >${product.prdPrice}</p>
                    </div>
                    
                </div>
            </div>
        </div>

        `
    ).join("");
}

  
//-----------------คิดเงินหน้า cart------------------------//
const productList = JSON.parse(localStorage.getItem('product'))

//ตั้งarrayมารับค่าจำนวนที่เลือก
let value = []
let sumEachProduct = []
let sumAll = 0
let fee = 30;

//set ค่าเริ่มต้นของarrayให้เป็น1

for (var i = 0; i < productList.length; i++) {
    value[i] = 1;
}
console.log(value)

//เมื่อกดเปลี่ยนจำนวน
function summary() {

    let number = 1
    for (var i = 0; i < productList.length; i++) {
        number = document.getElementById('select-num' + i)
        console.log(number)
        value[i] = number.options[number.selectedIndex].value
        document.getElementById('numChoose' + i).innerHTML = 'x' + value[i]
    }
    console.log(value)
    calculateSum();

}
function calculateSum() {
    sumAll = 0
    for (var i = 0; i < productList.length; i++) {

        let eachProPrice = parseInt(productList[i].prdPrice) * parseInt(value[i]);
        console.log(eachProPrice)
        sumEachProduct[i] = eachProPrice;
        sumAll = sumAll + sumEachProduct[i];

    }

    displayTotalInCart()

}
//-----------------แสดงราคาหน้าcart------------------------//

function displayTotalInCart() {
    document.getElementById('sum-detail').innerHTML = `
    <div class="row g-3">
        <div class="col">
            <p class="sum-detail-title">Subtotal</p>
        </div>
        <div class="col">
            <p class="price">$${sumAll}</p>
        </div>
        </div>
    <div class="row g-3">
        <div class="col">
            <p class="sum-detail-title">Delivery</p>
        </div>
        <div class="col ">
            <p class="price">$${fee}</p>
        </div>
    </div>
`

    let sumTotal = sumAll + fee;
    document.getElementById('price-total').innerHTML = "$" + sumTotal
    localStorage.setItem('totalPrice', JSON.stringify(sumTotal));

}
const ttPrice = JSON.parse(localStorage.getItem('totalPrice'))


//Checkout
function checkoutSum() {
    let sum = sumAll
    document.getElementById('btn-totalPrice').innerHTML = 'Confrim Payment: $' + ttPrice;
    document.getElementById('checkout-summary').innerHTML = `
        <div class="summary-content">
            <h1 class="content-bag-title">Summary</h1>
            <div class="sum-detail">
                <div class="row g-3">
                    <div class="col">
                        <p class="sum-detail-title">Subtotal</p>
                    </div>
                    <div class="col">
                        <p class="price">$${ttPrice - fee}</p>
                    </div>
                </div>
                <div class="row g-3">
                    <div class="col">
                        <p class="sum-detail-title">Delivery</p>
                    </div>
                    <div class="col ">
                        <p class="price">$${fee}</p>
                    </div>
                </div>
            </div>
            <div class="row g-3 sum-total-all">
                <div class="col">
                    <p class="summary-total">Total</p>
                </div>
                <div class="col">
                    <p class="price-total checkout-price">$${ttPrice}</p>
                </div>
            </div>
        </div>

`
}
function confirmPay() {
    let confirm = ttPrice;
    alert('Confirm Payment: $' + confirm)
}
