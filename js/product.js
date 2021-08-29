//select product
let productid = new URLSearchParams(window.location.search).get("id");
console.log(`productid`, productid);
const Size=[7,8,9,10,11]
const getProductdetail = async () => {
    try {
        const response = await axios.get(
            `https://6102d7aa79ed680017482359.mockapi.io/productdetail?id=${productid}`
        );
        document.getElementById("photopro").innerHTML = response.data.map(
            (product, index) => {
                if (index === 0) {
                    return `
                    <div class="row">
                        <div class=" col-md-7 col-sm-12">
                        <div class="row">
                            <img src="${product.prdImageUrl}" class="photoproduct">
                        </div>
                        </div>
                         <div class=" detail col-md-4">
                            <h3>${product.prdname}</p> </h3><br>
                            <h5 class="price-product">${product.prdPrice}THB</h5><br>
                            <div class="detailleft row g-3">
                                <div class="col-md-12" >
                                <div class="row g-3">
                                     <label for="inputEmail4" class="form-label">Size</label>
                                    <div class="col-md-12  col-sm-6 col-6">
                                       
                                        <select class="form-select" id="selectSize" aria-label="Default select example">
                                            <option selected >Please Select</option>
                                            ${Size.map((product) => {
                                                return `<option value ="${product}">${product}</option>`
                                            })}
                                        </select>
                                    </div>
                                    <div class="col-md-12 col-sm-6 col-6 ">
                                    
                                    <button class="btn btn-dark addtb" onclick="addItem('${productid}','${product.prdname}','${product.prdPrice}'
                                    ,'${product.prdSize.map(product => `${product}`).join('')}','${product.prdImageUrl}','${product.txtDetail}')";   
                                    type="button "  id ="add_productSize">Add To Bag</button>
                                    </div>
                                    </div>
                                </div>
                                <h2>Product detail</h2>
                                <p>${product.txtDetail}</p><br>
                                <button class="showbtn">Show More Detail</button><br>
                            </div>
                        </div>
        
                    </div>
                    `
                }
            }


        )
            .join("");

    } catch (e) {
        console.log(`e`, e);
    }
};
//เก็บค่าSize+ข้อมูลรองเท้า+เปลี่ยนหน้า
function addItem(id, name, price, size, image, detail) {
    if (localStorage.getItem('product')) {
        var oldItems = JSON.parse(localStorage.getItem('product'));
        let selectSize = document.getElementById("selectSize").value;
        const arraySize = size.split('')
        var newItem = {
            "id": id,
            "prdname": name,
            "prdPrice": price,
            "prdSize": selectSize,
            "size": arraySize,
            "prdImageUrl": image,
            "txtDetail": detail
        };
        let finItem = oldItems.concat(newItem);
        localStorage.setItem('product', JSON.stringify(finItem));
        location.href = 'shoppingcart.html';
    } else {
        let selectSize = document.getElementById("selectSize").value;
        const arraySize = size.split('')
        var newItem = [{
            "id": id,
            "prdname": name,
            "prdPrice": price,
            "prdSize": selectSize,
            "size": arraySize,
            "prdImageUrl": image,
            "txtDetail": detail
        }];
        localStorage.setItem('product', JSON.stringify(newItem));
        location.href = 'shoppingcart.html';
    }
};
getProductdetail();