
function add_id() {
    console.log( '- Enunciado: Seleccionaremos el body y con el uso de los navegadores iremos asignando el atributo id a los distintos divs.'
                +' Los primeros tres los designaremos como divIzquierdo, divCentro y divDerecho, el último como footer.' );
    
    let divs = document.querySelectorAll('#contenedor>div');
    divs[0].setAttribute('id', 'divIzquierdo');
    divs[1].setAttribute('id', 'divCentro');
    divs[2].setAttribute('id', 'divDerecho');
    divs[3].setAttribute('id', 'footer');
}


function div_style() {
    let log = '- Enunciado: Continuaremos aplicando estilos en los distintos divs aplicando color de fondo y además un márgen píxeles al footer.';

    let divs = document.querySelectorAll('#contenedor>div');
    for( let div of divs ) {
        let color = generate_color() + '50';
        log += '\n- Color ' + color + ' aplicado a div#' + div.getAttribute('id');
        div.style.backgroundColor = generate_color() + '50';
    }

    console.log(log);
}


function div_width() {
    let log = '- Enunciado: Aplicaremos anchura, unos 30 viewPort.';

    let divs = document.querySelectorAll('.divContenido');
    for( let div of divs ) {
        log += '\n- Ancho de 30vw aplicado a div#' + div.getAttribute('id');
        div.style.width = '30vw';
    }

    console.log(log);
}


function desplegar() {
    log = '- Enunciado: Los desplegaremos en línea, debemos aprovechar la clase para ello junto a un borde de 2 píxeles sólido de algún color. Pista: values().';

    // Creamos la etiqueta style si no existe en el head
    if( !document.getElementsByTagName('style')[0] ) {
        document.head.appendChild( document.createElement('style') );
        log += '\n- No existe la etiqueta style en head. Creada';
    }
    
    //comprobamos si ya están los estilos
    if( getComputedStyle( document.querySelector('.divContenido') ).display == 'inline-block' ) {
        log += '\n- Ya están los estilos creados! No se hace nada';
    } else {
        log += '\n- Añadiendo estilos para div.divContenido';
        document.querySelector('style').textContent += '.divContenido { display: inline-block; border: 2px solid #666; }';
    }

    console.log(log);    
}


function div_flex() {
    log = '- Enunciado: Aplicaremos una altura de 75 viewPort units al divContenedor y usaremos flex.';

    //comprobamos si ya están los estilos
    if( getComputedStyle( document.querySelector('#contenedor') ).display == 'flex' ) {
        log += '\n- Ya están los estilos creados! No se hace nada';
    } else {
        log += '\n- Añadiendo 75vw y flex para div#contenedor';
        document.querySelector('style').textContent += '#contenedor { height: 75vw; display: flex; }';
    }

    console.log(log);    

}


function div_height() {
    log = '- Enunciado: Aplicaremos a los elementos contenidos en el divContenedor una altura del 80% y al footer un 5%.';

    log += '\n- Añadiendo 80% de altura a los hijos de #contenedor y 5% de altura a footer';
    document.querySelector('style').textContent += '#contenedor>* { height: 80%; } #footer { height: 5%; }';

    console.log(log);   
}


let nav; // Se crea una variable de ámbito externo para poder usarla en las siguientes funciones
function div_nav() {
    console.log( '- Enunciado: Crearemos un nuevo elemento divNav con los siguientes estilos: height = "5%", width = "80%" y margin = "10%";' );

    nav = document.createElement('nav');
    nav.style.height = '5%';
    nav.style.width = '80%';
    nav.style.margin = '10%';
}


let ul; // Se crea una variable de ámbito externo para poder usarla en las siguientes funciones
function create_nav_elements() {
    log = '- Enunciado: Crearemos una lista desordenada e iremos creando elementos li y añadiéndolos a nuestra lista, 4 enlaces.';

    ul = document.createElement('ul');
    
    for( let i=0 ; i<4 ; i++ ) {
        log += '- Creando li:' + i + ' y añadiendolo a ul';
        let li = document.createElement('li');
        ul.appendChild(li);
    }

    console.log(log);
}


function nav_to_body() {
    log = 'Iteraremos e iremos añadiendo texto con el número del enlace hasta terminar y añadirlo como primer elemento del body. Pista: insertBefore().';

    let lis = ul.childNodes;
    for( let i=0 ; i<lis.length ; i++ ) {
        log += '- Creando enlace' + i + ' y añadiendolo a li:' + i;
        let a = document.createElement('a');
        a.innerText = 'enlace' + i;
        lis[i].appendChild(a);
    }

    log += '- Añadiendo la lista desordenada a nav';
    nav.appendChild(ul);

    log += '- Añadiendo nav al principio de body';
    document.body.insertBefore(nav, document.body.children[0]);

    console.log(log);
}


function footer_clone() {
    log = 'Clonaremos el footer y lo añadiremos al final del div eliminando el anterior.';

    let footer = document.getElementById('footer');
    let new_footer = footer.cloneNode(true);
    footer.remove();
    document.body.appendChild(new_footer);

    // Hacemos scroll para que se vea new_footer
    setTimeout(function a(){ new_footer.scrollIntoView(true); }, 10);

    console.log(log);
}





/**
 * Funcionalidades extra
 */

/**
 * Retorna un color aleatorio en HEX
 */
function generate_color() {
    //Generamos un color aleatorio (grupo de 6 dígitos hexadecimales)
    var digitos = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += digitos[Math.floor(Math.random() * 16)];
    }
    return color;
}