
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

    let divs_contenido = document.querySelectorAll('.divContenido');
    for( let div of divs_contenido ) {
        log += '\n- Ancho de 30vw aplicado a div#' + div.getAttribute('id');
        div.style.width = '30vw';
    }

    console.log(log);
}


function desplegar() {
    log = '- Enunciado: Los desplegaremos en línea, debemos aprovechar la clase para ello junto a un borde de 2 píxeles sólido de algún color. Pista: values().';

    let divs_contenido = document.querySelectorAll('.divContenido');
    for( let div of divs_contenido ) {
        div.style.display = 'inline-block';
        div.style.border = '2px solid #666';
        log += '\n- Estilos aplicados a div#' + div.getAttribute('id');
    }

    console.log(log);
}


function div_flex() {
    log = '- Enunciado: Aplicaremos una altura de 75 viewPort units al divContenedor y usaremos flex.';

    let div_contenedor = document.getElementById('contenedor')
    div_contenedor.style.height = '75vw';
    div_contenedor.style.display = 'flex';
    
    console.log(log);    
}


function div_height() {
    log = '- Enunciado: Aplicaremos a los elementos contenidos en el divContenedor una altura del 80% y al footer un 5%.';

    let contenedor_childs = document.querySelectorAll('#contenedor>*');
    for( let element of contenedor_childs ) {
        log += '\n- Añadiendo altura de 80% a div#' + element.getAttribute('id');
        element.style.height = '80%';
    }
    
    log += '\n- Modificando a 5% de altura el footer';
    document.querySelector('#footer').style.height = '5%';
    /* podríamos coger el último elemento de contenedor_childs pero este código es más usable porque en caso
    de que en el html se añadiese un nuevo div después de footer, tendríamos que actualizar este código */

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
        
        log += '\n- Creando li:' + i;
        let li = document.createElement('li');
        
        log += '; Creando enlace y añadiendolo a li:' + i;
        li.appendChild( document.createElement('a') );

        log += '; Añadiendo li:' + i + ' a ul';
        ul.appendChild(li);
    }

    console.log(log);
}


function nav_to_body() {
    log = '- Enunciado: Iteraremos e iremos añadiendo texto con el número del enlace hasta terminar y añadirlo como primer elemento del body. Pista: insertBefore().';

    let lis = ul.childNodes;
    for( let i=0 ; i<lis.length ; i++ ) {
        log += '\n- Añadiendo el texto "enlace' + i + '" al enlace (a) del elemento li:' + i;
        lis[i].childNodes[0].innerText = 'enlace' + i;
    }

    log += '\n- Añadiendo la lista desordenada a nav';
    nav.appendChild(ul);

    log += '\n- Añadiendo nav al principio de body';
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