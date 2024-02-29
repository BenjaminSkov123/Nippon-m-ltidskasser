let openShopping = document.querySelector('.shopping');
        let closeShopping = document.querySelector('.closeShopping');
        let list = document.querySelector('.list');
        let listCard = document.querySelector('.listCard');
        let body = document.querySelector('body');
        let total = document.querySelector('.total');
        let quantity = document.querySelector('.quantity');

        openShopping.addEventListener('click', () => {
            body.classList.add('active');
        });
        closeShopping.addEventListener('click', () => {
            body.classList.remove('active');
        });

        let products = [
            {
                id: 1,
                name: 'Japansk inspireret Kød og Grønt',
                image: 'foodie.jpeg',
                price: 120
            },
            {
                id: 2,
                name: 'Japansk inspireret Let Til Børn',
                image: 'børn.jpeg',
                price: 120000
            },
            {
                id: 3,
                name: 'Japansk inspireret Vegetar',
                image: 'Vegater.jpeg',
                price: 220000
            },
            {
                id: 4,
                name: 'Japansk inspireret Fisk',
                image: 'fisk.jpeg',
                price: 123000
            },
            {
                id: 5,
                name: 'Japansk inspireret Laktosefri',
                image: 'contant .png',
                price: 320000
            },
            {
                id: 6,
                name: 'Japansk inspireret Glutenfri',
                image: 'glutenfri.jpeg',
                price: 120000
            }
        ];
        let listCards = [];

        function initApp() {
            products.forEach((value, key) => {
                let newDiv = document.createElement('div');
                newDiv.classList.add('item');
                let img = document.createElement('img');
                img.src = `images/${value.image}`; // Set the src attribute dynamically
                newDiv.appendChild(img);
                newDiv.innerHTML += `
                    <div class="title">${value.name}</div>
                    <div class="price">${value.price.toLocaleString()}</div>
                    <button onclick="addToCard(${key})">Add To Card</button>`;
                list.appendChild(newDiv);
            });
        }

        initApp();

        function addToCard(key) {
            if (listCards[key] == null) {
                // If the item doesn't exist in the listCards array, add it with quantity 1
                listCards[key] = JSON.parse(JSON.stringify(products[key]));
                listCards[key].quantity = 1;
            } else {
                // If the item already exists, increment its quantity
                listCards[key].quantity++;
            }
            reloadCard();
        }

        function reloadCard() {
            listCard.innerHTML = '';
            let count = 0;
            let totalPrice = 0;
            listCards.forEach((value, key) => {
                totalPrice = totalPrice + value.price;
                count = count + value.quantity;
                if (value != null) {
                    let newDiv = document.createElement('li');
                    newDiv.innerHTML = `
                        <div><img src="images/${value.image}"/></div>
                        <div>${value.name}</div>
                        <div>${value.price.toLocaleString()}</div>
                        <div>
                            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                            <div class="count">${value.quantity}</div>
                            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                        </div>`;
                    listCard.appendChild(newDiv);
                }
            });
            total.innerText = totalPrice.toLocaleString();
            quantity.innerText = count;
        }

        function changeQuantity(key, quantity) {
            if (quantity == 0) {
                delete listCards[key];
            } else {
                listCards[key].quantity = quantity;
                listCards[key].price = quantity * products[key].price;
            }
            reloadCard();
        }

        function addToCart(index) {
            const product = products[index];
            const existingProduct = listCards.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                listCards.push({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1
                });
            }
            reloadCart();
        }

        // Event delegation for add to cart buttons
        list.addEventListener('click', (event) => {
            if (event.target.classList.contains('addToCart')) {
                const index = event.target.getAttribute('data-index');
                addToCart(index);
            }
        });