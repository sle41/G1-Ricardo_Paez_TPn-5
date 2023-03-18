


//var X= Object.keys(localStorage('transito')[4]);
let Products = [] ;

const tableBody = document.querySelector('#table-body');

function renderizarTabla() {
    tableBody.innerHTML = '';
    
    Products.forEach((producto, index) => {
                const tableRow = `<tr class="product" id="pepe">
                            
                            <td class="product__name">${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>

                            <td class="product__actions">
                                <button class="product__action-btn" onclick="deleteProduct(${index})">
                                    <i class="fa-solid fa-trash">x</i>

                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;
        
    });
	
}

renderizarTabla();

function addProduct(evt) {

    evt.preventDefault();
    console.dir(evt.target);
    const elements = evt.target.elements; //elimina?

    
    const newProduct = {
        
        name: elements.name.value,
        description: elements.description.value,
};

    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    
    console.log(newProductFormData);
    Products.push(newProductFormData);
    
    locals();
    renderizarTabla();
    evt.target.reset();
    elements.name.focus();

}

function deleteProduct(indice) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'se borrara persona!',
  //footer: '<a href="">Why do I have this issue?</a>'
})
    Products.splice(indice, 1);
    locals();
    renderizarTabla();

}

    function locals(){
    var datos_existentes = JSON.parse(localStorage.getItem('transito'));
     //var datos_existentes = localStorage.getItem('transito');
    //datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    if (datos_existentes === null)  {datos_existentes=[] };
    datos_existentes.push(Products);    
    localStorage.setItem('transito', JSON.stringify(datos_existentes));
    console.log("local storage recibio actualizacion");
    cuenta();
}

    function nom_propio() {
    const nom_p = document.getElementById("nameLabel");
    nom_p.value = nom_p.value[0].toUpperCase()+ nom_p.value.toLowerCase().substring(1);   
}

    function ape_propio() {
    const ape_p = document.getElementById("descLabel");
    ape_p.value = ape_p.value[0].toUpperCase()+ ape_p.value.toLowerCase().substring(1);   
}

function cuenta(){
    var cuenta_ingreso= Object.values(JSON.parse(localStorage.transito)).length;
    console.log("cantidad de actividad en LS: "+cuenta_ingreso);
    var x=cuenta_ingreso - 1;//descuento 1 para el array que empieza en 0 
    var cuenta_objetos= Object.values(JSON.parse(localStorage.transito)[x]).length;
    
    console.log("cantidad actual de personas "+cuenta_objetos );

    const inab_boton_carga = document.getElementById('boton_carga');
    if (cuenta_objetos   >= 10 )/// NUMERO DE PERSONAS PERMITIDAS
    {inab_boton_carga.disabled = true;
        Swal.fire("cupo completo "+cuenta_objetos+" elimine alguno para conitnuar");}
    else {inab_boton_carga.disabled = false;} 

}

function ver_h1(){
        var parrafo = document.getElementById('idh1');
        var contenido = parrafo.innerHTML;
        console.log(parrafo);
        console.log(contenido);
    Swal.fire("Captura de parrafo h1 por consola "+parrafo);
}

function filtro(){
    
    const nom_p2 = document.getElementById("lbuscar");
    if(nom_p2.value != "")//{nom_p2.value=""};
    {nom_p2.value = nom_p2.value[0].toUpperCase()+ nom_p2.value.toLowerCase().substring(1);}
    
    
    var cuenta_ingreso= Object.values(JSON.parse(localStorage.transito)).length;
    console.log("cantidad de actividad en LS: "+cuenta_ingreso);
    var x=cuenta_ingreso - 1;//descuento 1 para el array que empieza en 0 
    var cuenta_objetos= Object.values(JSON.parse(localStorage.transito)[x]);
    const result = cuenta_objetos.filter(word => word.name == nom_p2.value);
    console.log(result);
    console.log(result.length);
    console.log(nom_p2.value);
    
    if(nom_p2.value === ""){Swal.fire("ingrese nombre");}
    else Swal.fire("se encontraron "+result.length+" resultados");
    
}

function random_(){
    var num_random_ = Math.random().toString().slice(2,11);
    document.getElementById("random").value = num_random_;
}

function eliminoLS() {
    if (document.getElementById("random").value === document.getElementById("valida").value)
    {   localStorage.removeItem("transito");
        console.log("local storage borrado");
        Swal.fire({  icon: 'error',  title: 'Se borro local storage'});}
    location.reload()
}