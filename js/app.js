/**
 * innerHTML, outerHTML o textContent
 */

function lista_add_links() {
    
    let log = '- Enunciado: Seleccionar la lista y añadir nuevos elementos utilizando una vez solo el innerHTML (Seleccionar con querySelector).';

    // Seleccionamos la lista ordenada
    let ol = document.querySelectorAll('ol')[0];

    //contamos los elementos que ya hay
    let cantidad_elementos = ol.getElementsByTagName('li').length + 1;

    let nuevos_elementos = 3; // cantidad de elementos a añadir
    let contenido = ''; // variable con el contenido a añadir

    // Añadimos los elementos
    for ( let i=cantidad_elementos ; i < cantidad_elementos+nuevos_elementos ; i++ ) {
        log += '\n-Añadiendo a la lista: object ' + i;
        contenido += '<li>object ' + i + '</li>';
    }

    console.log(log);

    // Añadimos el contenido
    ol.innerHTML += contenido;
}

function table_create_5x5() {
    console.log('- Enunciado: Generar una tabla de 5x5 con la utilización de estructuras iterativas y añadirle un borde (Podéis crear un div nuevo y vacío para realizarlo).');

    let content = '<div><table id="table_5x5">';

    // generamos las filas
    for( let i=1 ; i <= 5 ; i++ ) {
        
        content += '<tr>';

        // generamos las celdas de cada fila (columnas)
        for( let j=1 ; j <= 5 ; j++ ) {
            content += '<td>celda '+i+'x'+j+'</td>';
        }

        content += '</tr>';
    }
    
    content += '</table></div>';

    // Añadimos al final de body
    document.body.innerHTML += content;

    // Aplicamos estilos (añadir borde y padding)
    let table = document.getElementById('table_5x5');
    let celdas = table.getElementsByTagName('td');
    
    for( let celda of celdas ) {
        celda.style.border = '1px solid grey';
        celda.style.padding = '4px';
    }
    
    table.style.borderCollapse = 'collapse';
}

function p_iterate_change() {
    console.log('- Enunciado: Iterar los párrafos y modificar el contenido con la propiedad textContent.');

    let parrafos = document.querySelectorAll('p');

    for( let contenido of parrafos ) {
        contenido.textContent = '¡¡Párrafo modificado!! -- ' + contenido.textContent;
    }
}

function link_change_href() {
    console.log('- Enunciado: Los bordes deben de tener 3px solid con color rojo.');
}

function css_change() {
    console.log('- Enunciado: Duplicar el css con un color de fondo distinto del body, navegar por la cabecera y comprobar el atributo de link, si existe el atributo href, cambiar el enlace a la hoja de estilos duplicada.');
}


/**
 * Otras operaciones
 */

function p_new_append() {
    console.log('- Enunciado: Crear un nuevo elemento párrafo y añadirlo al div correspondiente (pista: appendChild).');
}

function botton_new_color_blind() {
    console.log('- Enunciado: Crear un nuevo elemento botón con un evento que nos permita al clicar, cambiar el color de todas las letras del body alternando entre azul y rojo.');
}

function div_p_duplicate() {
    console.log('- Enunciado: Clonar el div contenedor de los párrafos con sus contenidos y añadirlo al body.');
}

function div_p_delete_origin() {
    console.log('- Enunciado: Eliminar el párrafo original con la instrucción remove.');
}

