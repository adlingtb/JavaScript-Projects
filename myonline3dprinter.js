let affiliateButtonsMain = document.querySelectorAll(".product_cat-amazon form");
let affiliateButtonsSmall = document.querySelectorAll("li.product_cat-amazon a.button.product_type_external");

for(i=0;i<affiliateButtonsMain.length;i++){
    let div = affiliateButtonsMain[i].appendChild(document.createElement('div'));
    div.innerHTML = "<a class='affiliateDisBtn' href='https://myonline3dprinter.com/affiliate-disclaimer/'>This is an affiliate link. Find out more...</a>"
}
for(i=0;i<affiliateButtonsSmall.length;i++){
    let div = affiliateButtonsSmall[i].insertAdjacentElement('afterend', document.createElement('div'));
    div.innerHTML = "<a class='affiliateDisBtn' href='https://myonline3dprinter.com/affiliate-disclaimer/'>This is an affiliate link. Find out more...</a>"
}

let affiliateProducts = document.querySelectorAll(".product_cat-amazon");
if (affiliateProducts.length > 0){
    let headerEl = document.querySelector(".woocommerce-products-header");
    let div = headerEl.insertAdjacentElement('afterend', document.createElement('div'));
    div.innerHTML = "<a class='affiliateDisBtn has-text-align-center' href='https://myonline3dprinter.com/affiliate-disclaimer/'>*Affiliate prices can be subject to change. Please see the Amazon listing for updated prices</a>"
}
    