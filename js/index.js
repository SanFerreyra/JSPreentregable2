// Versión con uso de Storage
class Datos {
    constructor(Datos, cantidad) {
        this.id = Datos.id;
        this.nombre = Datos.nombre;
        this.precio = Datos.precio;
        this.cantidad = cantidad;
        this.precioTotal = Datos.precio;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}


// Variables
// const baseDeDatos = [
//     {
//         id: 1,
//         nombre: 'Adulto Dog Maintenance Formula 20 Kg',
//         precio: 23000,
//         img: '../img/Balanced.jpg',
//     },
//     {
//         id: 2,
//         nombre: 'Adult Cat Smart 7,5kg',
//         precio: 12000,
//         img: "../img/Dog.jpg",
//     },
//     {
//         id: 3,
//         nombre: 'Shampoo(x10 Unidades)',
//         precio: 8000,
//         img: "../img/SHAMPOO.jpg",
//     },
//     {
//         id: 4,
//         nombre: 'Paños Sanitarios (x10 Unidades)',
//         precio: 42000,
//         img: "../img/PAÑO.jpg",
//     }
 
//  ];
 
 
 let carrito = [];
 let montoTotal = 0;
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
//confirmar compra
const DOMConfirmarCompra = document.getElementById('#confirmar-compra');
const miLocalStorage = window.localStorage;
// Función para vaciar el carrito
function vaciarCarrito() {
    const cartElement = document.getElementById("lista-carrito");
    cartElement.innerHTML = ""; // Elimina todos los elementos del carrito
}

// Agrega un controlador de eventos al botón "Vaciar Carrito"
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    vaciarCarrito();

 // Actualizar el monto total a 0.00
 const montoTotalElement = document.getElementById("total");
 montoTotalElement.textContent = "0.00";    
});




const URL = "./storage.json"
const contenedorProductos=document.getElementById("contenedor")
const agregarAlCarrito = (producto, id) => {
    // Implementa la lógica para agregar productos al carrito
    console.log(`Agregado al carrito: ${producto.nombre}`);

    // Obtener el elemento del carrito en el DOM
    const cartElement = document.getElementById("lista-carrito");

    // Crear un nuevo elemento de lista (por ejemplo, un <li>) para el producto
    const newItem = document.createElement("li");
    newItem.textContent = producto.nombre;

    // Agregar el elemento de producto al carrito en el DOM
    cartElement.appendChild(newItem);

     // Actualizar el monto total
     montoTotal += producto.precio;
     actualizarMontoTotal();

     function actualizarMontoTotal() {
        const totalElement = document.getElementById("total"); // Donde "total" es el ID del elemento donde deseas mostrar el monto total
        totalElement.textContent = `$${montoTotal.toFixed(2)}`;
    }
};



const pedirproductos = async () => {
    const resp = await fetch (URL)
    const data = await resp.json()
    console.log(data)

    data.forEach((prod) => {
        const div = document.createElement("div")
        div.innerHTML = `<section class="d-flex justify-content-center "><div class="card">
        <div class="content">
        <img src="${prod.img}" class="card-img-top"  >
            <div class="title">${prod.nombre}</div>
            <div class="price">${prod.precio}</div>
            </div>
            <button id="${prod.id}" >
            Comprar
            </button>
            
            
    </div>`
    
        contenedorProductos.appendChild(div)
        const btnAgregar = document.getElementById(`${prod.id}`)
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(prod, prod.id);
        })
    })
}

pedirproductos()

//sweetalert de boton vaciar carrito
const btn1 = document.querySelector('#vaciar-carrito')
btn1.addEventListener('click', () => {
Swal.fire(
    '¿Desea Vaciar el carrito?',
    'Presione OK para continuar',
    'question'
  )})

//sweetalert de boton confirmar
const btn = document.querySelector('#confirmar-compra')
btn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Confirmar compra?',
        text: '¿Estás seguro de que deseas confirmar la compra de este carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar compra',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí puedes agregar la lógica para confirmar la compra
            Swal.fire('Compra confirmada', '', 'success');
        } else {
            Swal.fire('Compra cancelada', '', 'error');
        }
    });
});



    