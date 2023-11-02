(function () {
    // let username;

    const socket = io();



    // FORM PRODUCTS

    // form - products
    const formAddProduct = document.getElementById('form-add-product')
    const formDeleteProduct = document.getElementById('form-delete-product')
    const formUpdateProduct = document.getElementById('form-update-product');

    formAddProduct?.addEventListener('submit', (event => {
        event.preventDefault();

        const newProduct = {
            title: document.getElementById('input-title').value,
            description: document.getElementById('input-description').value,
            code: document.getElementById('input-code').value,
            price: document.getElementById('input-price').value,
            stock: document.getElementById('input-stock').value,
            category: document.getElementById('input-category').value,
            thumbnails: []
        }

        socket.emit('addProduct', newProduct)

        document.getElementById('input-title').value = '';
        document.getElementById('input-description').value = '';
        document.getElementById('input-code').value = '';
        document.getElementById('input-price').value = '';
        document.getElementById('input-stock').value = '';
        document.getElementById('input-category').value = '';
    }))

    formDeleteProduct.addEventListener('submit', (event) => {
        event.preventDefault();
        const idProduct = document.getElementById('input-id-product').value;
        socket.emit('deleteProduct', idProduct)
        document.getElementById('input-id-product').value = '';
    })

    formUpdateProduct.addEventListener('submit', (event) => {
        event.preventDefault();
        const productToBeUpdated = {
            _id: document.getElementById('input-id-product-update').value,
            title: document.getElementById('input-title-update').value,
            description: document.getElementById('input-description-update').value,
            code: document.getElementById('input-code-update').value,
            price: document.getElementById('input-price-update').value,
            stock: document.getElementById('input-stock-update').value,
            category: document.getElementById('input-category-update').value,
            thumbnails: []
        }

        const idProduct = document.getElementById('input-id-product-update').value;
        socket.emit('updateProduct', productToBeUpdated)
        document.getElementById('input-id-product-update').value = '';
        document.getElementById('input-title-update').value = '';
        document.getElementById('input-description-update').value = '';
        document.getElementById('input-code-update').value = '';
        document.getElementById('input-price-update').value = '';
        document.getElementById('input-stock-update').value = '';
        document.getElementById('input-category-update').value = '';
    })

    socket.on('listProducts', (products) => {
        const container = document.getElementById('log-products-in-real-time')

        // Limpiar el contenido previo
        container.innerHTML = "";

        // Crear la tabla
        const table = document.createElement('table');
        table.classList.add('product-table');

        // Crear la fila de encabezados
        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Title', 'Description', 'Code', 'Price', 'Stock', 'Category'];

        headers.forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        // Agregar filas de productos
        products.forEach((prod) => {
            const row = document.createElement('tr');
            const cells = [prod._id, prod.title, prod.description, prod.code, `$${prod.price}`, prod.stock, prod.category];

            cells.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                row.appendChild(td);
            });

            table.appendChild(row);
        });

        // Agregar la tabla al contenedor
        container.appendChild(table);
    });

    // socket.on('listProducts', (products) => {
    //     const container = document.getElementById('log-products-in-real-time')

    //     container.innerHTML = "";
    //     products.forEach((prod) => {
    //         const p = document.createElement('p');
    //         p.innerText = `ID: ${prod._id} - Title: ${prod.title} - Description: ${prod.description} - Code: ${prod.code} - Price: $${prod.price} - Stock: ${prod.stock} - Category: ${prod.category}`;
    //         const hr = document.createElement('hr')
    //         container.appendChild(hr)
    //         container.appendChild(p);
    //     });
    //     container.appendChild(document.createElement('hr'))
    // });

    const formCreateCart = document.getElementById('create-cart')
    const formAddProductToCart = document.getElementById('add-product-to-cart')
    const formRemoveCart = document.getElementById('remove-cart');

    formCreateCart?.addEventListener('submit', (event => {
        event.preventDefault();
        // let newCart = {}
        socket.emit('createCart')
    }))

    socket.on('listCarts', (carts) => {
        const container = document.getElementById('carts')
        console.log("carts", carts)
        container.innerHTML = "";
        carts.forEach((cart) => {
            console.log("cart", cart)
            const p = document.createElement('p');
            p.innerHTML = `<strong>ID Cart:</strong> ${cart._id}<br><strong>Products:</strong><br>`;
            // p.innerHTML += ``;
            cart.products?.map((prod) => {
                p.innerHTML += `<strong>productId:</strong> ${prod.productId} <strong>quantity:</strong> ${prod.quantity}<br>`
            })
            const hr = document.createElement('hr');
            container.appendChild(hr);
            container.appendChild(p);
        });
        container.appendChild(document.createElement('hr'))
    });

    formAddProductToCart?.addEventListener('submit', (event => {
        event.preventDefault();

        const product = {
            cartId: document.getElementById('cart-input-id-product-to-cart').value,
            _id: document.getElementById('input-id-product-to-cart').value,
            quantity: document.getElementById('input-quantity-product-in-cart').value
        }

        socket.emit('addProductToCart', product);

        document.getElementById('cart-input-id-product-to-cart').value = ""
        document.getElementById('input-id-product-to-cart').value = ""
        document.getElementById('input-quantity-product-in-cart').value = ""

    }))

    formRemoveCart?.addEventListener('submit', (event => {
        event.preventDefault();

        const cartId = document.getElementById('cart-input-id-product-to-remove').value;

        socket.emit('deleteCart', cartId);
        document.getElementById('cart-input-id-product-to-remove').value = ''
    }))
})();
