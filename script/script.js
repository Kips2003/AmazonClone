let productDiv = document.getElementById('products');

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
    let products = data.products;

    for(let i = 0; i < products.length; i++){
        let averageRating = 0;
        let product = products[i];

        for(let j = 0; j < product.reviews.length; j++){
            averageRating += product.reviews[j].rating;
        }

        averageRating = averageRating / product.reviews.length;
        averageRating = averageRating.toFixed(1);

        productDiv.innerHTML += `<div id="product${i}" class="product-wraper">
            <div class="photo">
                <img class="main-page-photo" src="${product.thumbnail}" alt="">
            </div>
            <h2 class="title">
                ${product.title}
            </h2>
            <div class="price-rating">
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <p>${averageRating}</p>
                </div>
                <p class="price">
                    ${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2)}$
                </p>
            </div>
        </div>`;


        // productDiv.addEventListener('click', () => {
        //     // Assuming you want to navigate based on the product ID
        //     window.location.href = `product.html?id=${products[i].id}`;
        // });
    }

    for(let i = 0; i < products.length; i++){
        document.getElementById(`product${i}`).addEventListener('click', () => {
            window.location.href = `product.html?id=${products[i].id}`;
        })
    }
});