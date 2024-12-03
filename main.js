//CRUDS ==> create retrive update delete search

var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductImage = document.getElementById("ProductImage");
var ProductCategery = document.getElementById("ProductCategery");
var productDescription = document.getElementById("ProductDescription");
var SearchInput = document.getElementById("SearchInput")
var Product = document.getElementById("DataRow");

// btns
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");


var ProductList = [];
// for firefox

if (localStorage.getItem("Products") !== null) {
  var ProductList = JSON.parse(localStorage.getItem("Products"));
  display();
}

function addproduct() {
  if ( validation(ProductName) && validation(ProductPrice) && validation(ProductCategery))
  {
  var productobj = {
    id: Date.now(),
    pName: ProductName.value,
    pPrice: ProductPrice.value,
    pcategery: ProductCategery.value,
    pDescription: ProductDescription.value,
    pImage: ProductImage.files[0]? `./images/${ProductImage.files[0]?.name}` : `https://placehold.co/600x400`,
  };

  ProductList.push(productobj);
  console.log("product Details : ", ProductList);

  localStorage.setItem("Products", JSON.stringify(ProductList));
  clearform();

  display();
 } 
}

// clear inputs for user

function clearform() {
  ProductName.value = null;
  ProductPrice.value = null;
  ProductImage.value = null;
  ProductCategery.value = null;
  ProductDescription.value = null;
}

// display )نعرض المنتجات(()

function display(List=ProductList) {
  var element = "";
  for (i = 0; i < List.length; i++) {
    element += ` 
        <div class="col-md-3  col-sm-6  ">
          <img src="${List[i].pImage}" alt=" phone " class=" w-100">
          <h1 class="h4"> ${List[i].pName} </h1>
          <h2 class="h4"> ${List[i].pPrice}</h2>
          <h3 class="h4 text-primary"> ${List[i].pcategery}  </h3>
          <h4 class="h6 text-info"> ${List[i].pDescription} </h4>

        <button onclick="editForUpdate(${i})" class="btn btn-outline-warning">update </button>
        <button onclick="deletefun( ${List[i].id})" class="btn btn-outline-danger">delete </button>
        </div>`;
  }

  Product.innerHTML = element;
}

function deletefun(id){
// ProductList.splice(i,1);
// localStorage.setItem("Products", JSON.stringify(ProductList));
// display();

ProductList = ProductList.filter(function(ele){
  return ele.id !== id;
})
localStorage.setItem("Products", JSON.stringify(ProductList));
display();
console.log(id);
}

var GlopalIndex ;

function editForUpdate(index){
  updateBtn.classList.replace('d-none','d-block');
  addBtn.classList.add( 'd-none');

  GlopalIndex = index;

  ProductName.value = ProductList[index].pName;
  ProductPrice.value = ProductList[index].pPrice;
  ProductCategery.value = ProductList[index].pcategery;
  ProductDescription.value = ProductList[index].pDescription;
}

function updateProduct(){
  console.log(GlopalIndex);

  updateBtn.classList.replace('d-block', 'd-none');
  addBtn.classList.replace('d-none','d-block');

  ProductList[GlopalIndex].pName =   ProductName.value;
  ProductList[GlopalIndex].pPrice= ProductPrice.value ;
  ProductList[GlopalIndex].pcategery = ProductCategery.value ;
  ProductList[GlopalIndex].pDescription =  ProductDescription.value  ;

  localStorage.setItem("Products", JSON.stringify(ProductList));
  display();

}

// function updateProduct() {
//   // تحديث المنتج باستخدام filter
//   ProductList = ProductList.map((product, index) => {
//     if (index === GlopalIndex) { // إذا كان هذا المنتج هو المطلوب تحديثه
//       return {
//         ...product, // نسخة من المنتج الحالي
//         pName: ProductName.value,
//         pPrice: ProductPrice.value,
//         pcategery: ProductCategery.value,
//         pDescription: ProductDescription.value,
//       };
//     }
//     return product; // لا تغير المنتجات الأخرى
//   });

//   // تحديث البيانات في localStorage
//   localStorage.setItem("Products", JSON.stringify(ProductList));

//   // إعادة العرض
//   display();

//   // تحديث الأزرار
//   addBtn.classList.replace('d-none', 'd-block');
//   updateBtn.classList.replace('d-block', 'd-none');
// }

function searchfun(term){
  var SearchArr = [];
  for (var i=0 ; i<ProductList.length ; i++)
  {
   
    if (ProductList[i].pName.trim().toLowerCase().includes(term.trim().toLowerCase()))
      {
        SearchArr.push(ProductList[i]);
      }
 }
 display(SearchArr);
}
    

// validation

// function isValid()  // for name
// {
//   var Rejax = /^[A-Z][a-z]{2,5}$/
//   if (Rejax.test(ProductName.value))
//   {
//     ProductName.nextElementSibling.classList.replace('d-block' , 'd-none');
//     ProductName.classList.add('is-valid');
//     ProductName.classList.remove('is-invalid');
//     return true;
//   }
//   else 
//   {
//     ProductName.nextElementSibling.classList.replace('d-none','d-block');
//     ProductName.classList.add('is-invalid');
//     ProductName.classList.remove('is-valid');
//     return false;
//   }
// }


// function PriceValidation()
// {
//   var Rejax = /^[1-9]+\.[0-9]{3,6}$/
//   if (Rejax.test(ProductPrice.value))
//   {
//     ProductPrice.nextElementSibling.classList.replace('d-block' , 'd-none');
//     ProductPrice.classList.add('is-valid');
//     ProductPrice.classList.remove('is-invalid');
//     return true;
//   }
//   else 
//   {
//     ProductPrice.nextElementSibling.classList.replace('d-none','d-block');
//     ProductPrice.classList.add('is-invalid');
//     ProductPrice.classList.remove('is-valid');
//     return false;
//   }
// }


// main validation

function validation(input){
  var Rejax = {
    ProductName :  /^[A-Z][a-z]{2,5}$/,
    ProductPrice :  /^[1-9]{1}[0-9]{3,6}$/ ,
    ProductCategery : /^(TV|Labtop|IPHONE)$/ 
  }

       if (Rejax[input.id].test(input.value))
      {
       input.nextElementSibling.classList.replace('d-block' , 'd-none');
       input.classList.add('is-valid');
       input.classList.remove('is-invalid');
        return true;
      }
      else 
      {
       input.nextElementSibling.classList.replace('d-none','d-block');
       input.classList.add('is-invalid');
       input.classList.remove('is-valid');
        return false;
      }

}


// string methods

var str = "ahlam saied eissa elwakel";
console.log(str.length);
console.log(str.charAt(1));
console.log(str.charCodeAt(1));
console.log(str.split(" ").slice(0, 2).join(" "));

var n = "ahlam";
console.log(n.split(""));

/// retrive

localStorage.setItem("name", "ahlam");
localStorage.setItem("age", "22");
localStorage.setItem("age", "55");
console.log(localStorage.getItem("age"));
console.log(localStorage.getItem("ggt"));
