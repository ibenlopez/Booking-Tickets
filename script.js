// Se obtiene la lista de conciertos y carga la información en el DOM
obtener_Conciertos().then(data =>{
    cargar_Cards_Conciertos(data);
});

// Funcion para obtener lista de conciertos
async function obtener_Conciertos() {
    try {
        const respuesta = await fetch('./data.json');
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error al obtener lista de conciertos', error);
    }
}

// Funcion para buscar conciertos por nombre del evento o nombre de artista
function buscar_Conciertos(nombreConcierto){
    eliminar_Cards_Conciertos();
    obtener_Conciertos().then(data =>{
        const listResultado = data.filter( c => c.nombre.toLowerCase().includes(nombreConcierto.toLowerCase()) || c.artista.toLowerCase().includes(nombreConcierto.toLowerCase()));
        cargar_Cards_Conciertos(listResultado);
    });
}

// Funcion para generar elementos html con los detalles de los eventos (conciertos)
function cargar_Cards_Conciertos(listaDeConciertos){
    const concertsContainer = document.getElementById('concerts_container'); //Elemento que contendra los conciertos
    const concertTemplate = document.getElementById('concert__template'); // Plantilla de elemento de conciertos
    concertTemplate.classList.remove('d-none');
    let index = 1;
    listaDeConciertos.forEach(concierto => {
        const tarjetaOriginal = concertTemplate.cloneNode(true);
        tarjetaOriginal.classList.add('concert-container');
        tarjetaOriginal.id = `concert__container__${index}`;
        // Asignar valores dinámicos
        tarjetaOriginal.querySelector('img').src = concierto.foto;
        tarjetaOriginal.querySelector('p').textContent = concierto.nombre;
        tarjetaOriginal.querySelector('small').textContent = `Fecha de evento: ${concierto.fecha}`;

        // Insertar la tarjeta clonada en el elemento contenedor de los conciertos
        concertsContainer.appendChild(tarjetaOriginal);
        index++;
    });
    concertTemplate.classList.add('d-none'); // Se oculta nuevamente la plantilla de los conciertos
}

// Funcion para eliminar elementos html con los detalles de los eventos (conciertos)
function eliminar_Cards_Conciertos(){
    const cardsConciertos = document.querySelectorAll('.concert-container');
    cardsConciertos.forEach(tarjeta => tarjeta.remove());
}

document.addEventListener('DOMContentLoaded', function () {

    // Funcion cambiar apariencia de navbar
    function cambiar_Navbar_Apariencia() {
        const encabezado = document.getElementById('header');
        const rectEncabezado = encabezado.getBoundingClientRect();
        const windowHeightEncabezado = window.innerHeight || document.documentElement.clientHeight;
        const nav = document.getElementById('navbar__container');
        const options = document.getElementById('nav__options__web');
        const logoDark = document.getElementById('nav__logo__dark');
        const logoLight = document.getElementById('nav__logo__light');
        if (rectEncabezado.top >= 0 && rectEncabezado.bottom <= windowHeightEncabezado) {
            nav.classList.remove('nav-light-theme');
            logoDark.classList.remove('d-none');
            logoLight.classList.add('d-none');
            for (let index = 0; index < options.children.length; index++) {
                const element = options.children[index];
                element.children[0].classList.remove('options-light-theme');
            }
        }
        else {
            nav.classList.add('nav-light-theme');
            const logoDark = document.getElementById('nav__logo__dark');
            const logoLight = document.getElementById('nav__logo__light');
            logoDark.classList.add('d-none');
            logoLight.classList.remove('d-none');
            for (let index = 0; index < options.children.length; index++) {
                const element = options.children[index];
                element.children[0].classList.add('options-light-theme');
            }
        }
    }
    // Llamar a la función cada vez que se haga scroll
    window.addEventListener('scroll', cambiar_Navbar_Apariencia);
});