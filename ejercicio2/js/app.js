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
    let content = ''; // variable con el contenido a añadir

    // Añadimos los elementos
    for ( let i=cantidad_elementos ; i < cantidad_elementos+nuevos_elementos ; i++ ) {
        log += '\n-Añadiendo a la lista: object ' + i;
        content += '<li>object ' + i + '</li>';
    }

    console.log(log);

    // Añadimos el contenido
    ol.innerHTML += content;
}



function table_create_5x5() {
    log = '- Enunciado: Generar una tabla de 5x5 con la utilización de estructuras iterativas y añadirle un borde (Podéis crear un div nuevo y vacío para realizarlo).';

    let div = document.createElement('div');
    div.classList.add('div_table_5x5');
    let table = document.createElement('table');

    // generamos las filas
    for( let i=1 ; i <= 5 ; i++ ) {
        
        let tr = document.createElement('tr');

        // generamos las celdas de cada fila
        for( let j=1 ; j <= 5 ; j++ ) {
            let td = document.createElement('td');
            td.textContent = 'celda '+i+'x'+j;
            tr.appendChild(td);
        }

        // Añadimos la línea a la tabla
        table.appendChild(tr);

    }

    // Añadimos la tabla al contenedor div
    div.appendChild(table);

    
    // Añadimos al final de body
    document.body.appendChild(div);
    log += '\n- Tabla insertada al final del contenido.';

    // Aplicamos estilos (añadir borde y padding)
    
    // Creamos la etiqueta style si no existe en el head
    if( !document.getElementsByTagName('style')[0] ) {
        document.head.appendChild( document.createElement('style') );
        log += '\n- No existe la etiqueta style en head. Creada';
    }
    
    //comprobamos si ya están los elementos
    if( getComputedStyle( document.querySelector('.div_table_5x5') ).marginBottom == '10px' ) {
        log += '\n- Ya están los estilos creados! No se hace nada';
    } else {
        log += '\n- Añadiendo estilos para tabla 5x5';
        document.getElementsByTagName('style')[0].textContent += '.div_table_5x5{ margin-bottom: 10px;} .div_table_5x5 table{ border-collapse: collapse; } .div_table_5x5 td{ border: 1px solid grey; padding: 4px; }';
    }

    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ div.scrollIntoView(true); }, 10);
    
    console.log(log);
}



function p_iterate_change() {
    console.log('- Enunciado: Iterar los párrafos y modificar el contenido con la propiedad textContent.');

    let paragraphs = document.querySelectorAll('p');

    for( let paragraph of paragraphs ) {
        paragraph.textContent = '¡¡Párrafo modificado!! -- ' + paragraph.textContent;
    }

    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ paragraphs[0].scrollIntoView(true); }, 10);

}



function link_change_href() {
    log = '- Enunciado: Modificar todos los enlaces y poner el enlace a la página de cesur (o cualquiera).';

    let enlaces = document.querySelectorAll('a');

    for( let enlace of enlaces ) {
        enlace.href='https://miguelcarmona.com';
    }

    console.log(log + '\nEnlaces cambiados a https://miguelcarmona.com');
    
    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ enlaces[0].scrollIntoView(true); }, 10);

}



function css_change() {
    log = '- Enunciado: Duplicar el css con un color de fondo distinto del body, navegar por la cabecera y comprobar el atributo de link, si existe el atributo href, cambiar el enlace a la hoja de estilos duplicada.';

    let new_file_path = 'css/estilo_copy.css';

    // Buscamos todos los elementos link en header y filtramos el que tenga un type "text/css" y un href
    let links = document.head.getElementsByTagName('link');

    for( let link of links  ) {
        if( link.type == 'text/css' && link.href != '' ) {
            log += '\n- Encontrado un enlace a la hoja de estilo '+link.href+'';
            link.href = new_file_path;
            log += '\n- Cambiado a: '+link.href;
            break;
        }
    }
    
    console.log(log);
}


/**
 * Otras operaciones
 */

function p_new_append() {
    console.log('- Enunciado: Crear un nuevo elemento párrafo y añadirlo al div correspondiente (pista: appendChild).');

    // Buscamos el div del primer párrafo
    let div = document.querySelector('div>p').parentElement;

    let paragraph = document.createElement('p');
    paragraph.textContent = 'Nuevo párrafo creado.';
    div.appendChild( paragraph );

    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ div.scrollIntoView(false); }, 10);
}



function botton_new_color_blind() {
    console.log('- Enunciado: Crear un nuevo elemento botón con un evento que nos permita al clicar, cambiar el color de todas las letras del body alternando entre azul y rojo.');

    let button_element = document.createElement('button');
    button_element.setAttribute('onclick', '(document.body.style.color=="red") ? document.body.style.color="blue" : document.body.style.color="red"');
    button_element.textContent = 'Cambiar color de la letra';
    document.body.appendChild( button_element );

    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ button_element.scrollIntoView(true); }, 10);

}



function div_p_duplicate() {
    log = '- Enunciado: Clonar el div contenedor de los párrafos con sus contenidos y añadirlo al body.';

    // Cogemos todos los párrafos contenidos en div
    let paragraphs = document.querySelectorAll('div>p');

    console.log( log + '\n- Hay '+ paragraphs.length + ' párrafos. Clonando y añadiendo al final del contenido' );
    
    let last_div; // para guardar el div anterior y comprobar si el siguiente p corresponde al mismo div
    for( let paragraph of paragraphs ) {

        let div = paragraph.parentElement; // cogemos el elemento padre (el div)
        if( div !== last_div ) {
            // Clonamos y añadimos al body
            document.body.appendChild( div.cloneNode(true) );
        }
        last_div = div; 
    }

    // Hacemos scroll para que se vea el nuevo contenido (en 10ms)
    setTimeout(function a(){ last_div.scrollIntoView(true); }, 10);

}



function div_p_delete_origin() {
    log = '- Enunciado: Eliminar el párrafo original con la instrucción remove.';

    // Cogemos todos los párrafos contenidos en div
    let paragraphs = document.querySelectorAll('div>p');

    // Los recorremos y cogemos los padres (div) sin duplicados
    let last_div; // para guardar el div anterior y comprobar si el siguiente p corresponde al mismo div
    let divs = []; // array para guardar los div
    for( let paragraph of paragraphs ) {

        let div = paragraph.parentElement; // cogemos el elemento padre (el div)
        if( div !== last_div ) {
            // Añadimos al array divs
            divs.push( div );
        }
        last_div = div; 
    }

    log += '\n- Hay '+ divs.length + ' contenedores div de párrafos. Buscamos duplicados.';

    let deleted = []; // Array para guardar los índices de los elementos eliminados

    // Recorremos el array comparando cada elemento con los siguientes para encontrar duplicados y eliminar todos los "originales"
    for( let i=0 ; i<divs.length ; i++ ) {
        for( let j=0 ; j<divs.length ; j++ ) {
           
            // Saltamos el mismo elemento
            if( i !== j ) {

                // Comprobamos si ese elemento ya se eliminó
                let is_deleted = false;
                for( let del of deleted ) {
                    if( del === j ) {
                        is_deleted = true;
                        break;
                    }
                }
                
                if( !is_deleted && divs[i].innerHTML === divs[j].innerHTML ) {
                    log += '\n- Encontrado duplicado entre la posición '+i+' y '+j+'. Eliminando la posición '+i;
                    deleted.push(i);
                    divs[i].remove();
                    break;
                }
           }
        }
    }

    log += '\n- Se han eliminado '+ deleted.length + ' contenedores div de párrafos.';
    console.log( log );

    // Hacemos scrool arriba para que se vea que se ha eliminado
    scroll_to('up');
}



/**
 * Funcionalidad (funciones adicionales)
 */

// llamamos a la función scrool_to de parent 
function scroll_to(direction) {
    window.top.scroll_to('iframe_content', direction);
}

// Inyectamos css a su carga (para suavizar el movimiento de scroll)
window.addEventListener("load", function(){
    
    // Creamos la etiqueta style si no existe en el head
    if( !document.getElementsByTagName('style')[0] ) {
        document.head.appendChild( document.createElement('style') );
    }

    document.getElementsByTagName('style')[0].textContent += 'html{ scroll-behavior: smooth; } \n';
});
