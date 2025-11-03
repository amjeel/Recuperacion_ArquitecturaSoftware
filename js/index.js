const API_URL = 'https://retoolapi.dev/jQZZhI/data'

async function ObtenerProductos(){
    const respuesta = await fetch (API_URL);

    const data = await respuesta.json(); 

    MostrarProductos(data)
}


function MostrarProductos(datos){
    const tabla = document.querySelector("#tabla tbody");
    tabla.innerHTML = " "; 

    datos.forEach(producto => 
        {
            tabla.innerHTML += `
            <tr>
                <td> ${producto.id} </td>
                <td> ${producto.Stock} </td>     
                <td> ${producto.Nombre} </td>         
                <td> ${producto.Precio} </td>      
                <td> ${producto.Categoria} </td>      
                <td> ${producto.Descripcion} </td>  
                <td>
                    <button onclick = "AbrirModalEditar('${producto.id}', '${producto.Stock}', '${producto.Nombre}', '${producto.Precio}', '${producto.Categoria}', '${producto.Descripcion}')"> Editar </button>
                    <button onclick = "EliminarProducto(${producto.id})"> Eliminar </button>
                </td>
            </tr>
            `;
        });
}


ObtenerProductos();


const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("cerrarModal");

btnAgregar.addEventListener("click", () =>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
})


document.getElementById("frmAgregar").addEventListener("submit", async e =>{
    e.preventDefault(); 

    const Stock = document.getElementById("txtStock").value.trim();
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Precio = document.getElementById("txtPrecio").value.trim();
    const Categoria = document.getElementById("txtCategoria").value.trim();
    const Descripcion = document.getElementById("txtDescrpcion").value.trim();

    if(!Stock|| !Nombre || !Precio || !Categoria || !Descripcion){
        alert("Complete todos los campos")
        return;
    }


    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Stock, Nombre, Precio, Categoria, Descripcion})
    });
 
    if(respuesta.ok){
        alert("El producto fue agregado correctamente");
 
        document.getElementById("frmAgregar").reset();
 
        modal.close();
 
        ObtenerProductos();
    }
    else{
        alert("Hubo un error");
    }
});

//Eliminar
async function EliminarProducto(id){
    const confirmacion = confirm("Estas seguro que quieres eliminar el producto?");
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); 
        ObtenerProductos();
    }
}

const modalEditar = document.getElementById("mdEditar")
const btnCerrarEdit = document.getElementById("cerrarEditar")

btnCerrarEdit.addEventListener("click", ()=>{
    modalEditar.close();
})

function AbrirModalEditar (id, stock, nombre, precio, categoria, descripcion){
    document.getElementById("txtIdEdit").value = id;
    document.getElementById("txtStockEdit").value = stock;
    document.getElementById("txtNombreEdit").value = nombre;
    document.getElementById("txtPrecioEdit").value = precio;
    document.getElementById("txtCategoriaEdit").value = categoria;
    document.getElementById("txtDescrpcionEdit").value = descripcion;

    modalEditar.showModal();

}

document.getElementById("frmEditar").addEventListener("submit", async e =>{
    e.preventDefault(); 

    const id = document.getElementById("txtIdEdit").value;
    const Stock = document.getElementById("txtStockEdit").value.trim();
    const Nombre = document.getElementById("txtNombreEdit").value.trim();
    const Precio = document.getElementById("txtPrecioEdit").value.trim();
    const Categoria = document.getElementById("txtCategoriaEdit").value.trim();
    const Descripcion = document.getElementById("txtDescrpcionEdit").value.trim();

     if(!Stock|| !Nombre || !Precio || !Categoria || !Descripcion){
         alert("Complete todos los campos")
         return;
     }

     const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Stock,Nombre,Precio,Categoria,Descripcion})
     });

     if(respuesta.ok){
        alert("el producto fue actualizado exitosamente");
        modalEditar.close();
        ObtenerProductos();
     }
     else{
        alert("Hubo un error a la hora de actualizar")
     }
});