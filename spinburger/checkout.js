var item_count = 0

function AddElement(itemId,imageURL,productName,productPrice,productDescription,destination){
  
  var list_item = document.createElement("div");
  list_item.id = itemId
  list_item.style.cssText += 'display: flex;'+
    'align-items: center;'+
    'justify-content: space-between;'+
    'margin-top: 20px;'
  
  var img = document.createElement("img");
  img.src = imageURL;
  img.alt = "Image";
  
  img.style.cssText += 
    'margin-right: 20px;'+
    'width: 160px;'+
    'height: 160px;'+
    'background-color: #099;'
    
  list_item.appendChild(img);
  
  var list_item_text = document.createElement("div");
  list_item_text.className = "tm-black-bg tm-list-item-text";
  list_item_text.style.cssText += 
    'padding: 20px 25px;'+
    'flex: 1;'
  
  var heading = document.createElement("h3");
  heading.innerHTML = productName
  heading.style.cssText += 
    'display: flex;'+
    'justify-content: space-between;'+
    'margin-top: 0;'
  
  var price = document.createElement("span");
  price.innerHTML = productPrice
  price.style.cssText += 'color: #96FEFF; '
  heading.appendChild(price);
  
  var paragraph = document.createElement("p");
  paragraph.innerHTML = productDescription
  
  var removeForm = document.createElement("form");
  removeForm.action = "javascript:Remove("+itemId+","+destination+")";
  
  var removeParagraph = document.createElement("p");
  var removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove from basket";
  
  removeParagraph.appendChild(removeButton);
  removeForm.appendChild(removeParagraph);
  
  list_item_text.appendChild(heading);
  list_item_text.appendChild(paragraph);
  list_item_text.appendChild(removeForm);
  list_item.appendChild(list_item_text);
  document.getElementById(destination).prepend(list_item);
  
}

function Add(productid,buttonId) {
  
  document.getElementById(buttonId).innerHTML = "Added to basket"
  
  item_count = item_count + 1;
  
  let item_id = "ITEM_" + item_count;
  
  addTocart(item_id, productid);
  
  document.getElementById("checkoutPrice").innerHTML = "$" + data.cartTotal.toFixed(2);
  
  let productType = data.product[productid].primaryCategory;
  let productCurrency = data.product[productid].currency;
  let productPrice = data.product[productid].price;
  let productName = data.product[productid].productName;
  
}


function addTocart(itemId, productID) {
  data.cart[itemId] = productID;

  let cartSize = Object.keys(data.cart).length;
  
  document.getElementById("basketMenu").innerHTML = "Checkout <sup>" + cartSize +"</sup>" 

  
  var productImage = data.product[productID].imageURL;
  var productName = data.product[productID].productName;
  var productPrice = data.product[productID].formattedPrice;
  var productdescription = data.product[productID].description;
  
  
  data.cartTotal += data.product[productID].price; 
  
  document.getElementById("checkoutPrice").innerHTML = "$" + data.cartTotal.toFixed(2);
  
  AddElement(itemId,productImage,productName,productPrice,productdescription,"basket")
  

}

function Remove(element) {
  
  let itemId = element.id;
  
  data.cartTotal -= data.product[data.cart[itemId]].price; 
  
  delete data.cart[itemId]
  
  let cartSize = Object.keys(data.cart).length;
  
  document.getElementById("basketMenu").innerHTML = "Checkout <sup>" + cartSize +"</sup>" 
  document.getElementById("checkoutPrice").innerHTML = "$" + data.cartTotal.toFixed(2);

  element.parentNode.removeChild(element);
  
}

function Checkout() {
  
  let confirmedProducts = []
 
  for (const [itemId, productId] of Object.entries(data.cart)) {
    
    confirmedProducts.push({
       item_id: itemId
    })

    let productElement = document.getElementById(itemId);

    Remove(productElement)
  }
  
}
