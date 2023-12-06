//const url = 'https://api-2670689.onrender.com/usuario'
const url = 'https://api-examen-bxbi.onrender.com';
const objectId = document.getElementById('contenido');

const url_valor_dolar = 'https:www.datos.gov.co/resource/mcec-87by.json  '


function RegistroValorDolar() {
    const dolares = document.getElementById('preciodolar');

    // Realizar la petición a la URL utilizando fetch
    fetch(url_valor_dolar, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => {
        // Verificar si la respuesta es un JSON válido
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(dataArray => {
        // Verificar si hay al menos un objeto en el array
        if (dataArray && dataArray.length > 0) {
            // Tomar el primer objeto del array (asumiendo que eso es lo que necesitas)
            const primerObjeto = dataArray[0];

            // Actualizar el valor del input con el valor del objeto
            dolares.value = `${primerObjeto.valor}`;
        } else {
            throw new Error('Formato de respuesta incorrecto o array vacío');
        }
    })
    .catch(error => {
        console.error('optencion del dolar fallida', error);
        dolares.value = 'optencion del dolar fallida';
    });
}

const listarServicio = async () => {
    let contenido = '';

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listaServicios = data.msg;
            console.log(listaServicios);
            listaServicios.map(function (servicio) {
                let objetoServicio = Object.keys(servicio).map(key => key + '=' + encodeURIComponent(servicio[key])).join('&');
                console.log(servicio);
                contenido = contenido + `<tr>` +
                    `<td>` + servicio.nombre + `</td>` +
                    `<td>` + servicio.categoria + `</td>` +
                    `<td>` + servicio.fecha + `</td>` +
                    `<td>` + servicio.informacion + `</td>` +
                    `<td>` + servicio.requisitos + `</td>` +
                    `<td>` + servicio.estado + `</td>` +
                    `<td>` + servicio.preciodolar + `</td>` +
                    `<td><button class="btn btn-primary" onclick="redireccionarEditar('${objetoServicio}')">Editar</button></td>` +
                    `<td> <button type="button" class="btn btn-danger btnEliminar" onclick="eliminarServicio('${servicio.nombre}');">Eliminar</button></td>` +
                    `</tr>`;
            });
            objectId.innerHTML = contenido;
        });
}

const registrarServicio = () => {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const fecha = document.getElementById('fecha').value;
    const informacion = document.getElementById('informacion').value;
    const requisitos = document.getElementById('requisitos').value;
    const estado = document.getElementById('estado').value;
    const preciodolar = document.getElementById('preciodolar').value;

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido';
    } else if (categoria == "") {
        document.getElementById('categorialHelp').innerHTML = 'Dato requerido';
    } else if (fecha.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido';
    } else if (informacion.length == 0) {
        document.getElementById('informacionHelp').innerHTML = 'Dato requerido';
    } else if (requisitos.length == 0) {
        document.getElementById('requisitosHelp').innerHTML = 'Dato requerido';
    } else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido';
    }else if ( preciodolar == "") {
        document.getElementById(' preciodolarHelp').innerHTML = 'Dato requerido';

    } else {
        let servicio = {
            nombre: nombre,
            categoria: categoria,
            fecha: fecha,
            informacion: informacion,
            requisitos: requisitos,
            estado: estado,
            preciodolar: preciodolar
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                alert(json.msg);
            });
    }
}
const eliminarServicio = async (nombre) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombre })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "eliminacion exitosamente",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            regresarListar();
        }, 2000);

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.error('Error al eliminar el servicio:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('eliminacion exitosa');
    }
};




const actualizarServicio = () => {
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const informacion = document.getElementById('informacion').value;
    const requisitos = document.getElementById('requisitos').value;
    const estado = document.getElementById('estado').value;
    const preciodolar = document.getElementById('preciodolar').value;

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido';
    } else if (fecha.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido';
    } else if (categoria == "") {
        document.getElementById('categoriaHelp').innerHTML = 'Dato requerido';
    } else if (informacion.length == 0) {
        document.getElementById('informacionHelp').innerHTML = 'Dato requerido';
    } else if (requisitos.length == 0) {
        document.getElementById('requisitosHelp').innerHTML = 'Dato requerido';
    } else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido';
    }else if ( preciodolar == "") {
        document.getElementById(' preciodolarHelp').innerHTML = 'Dato requerido';
    } else {
        let servicio = {
            nombre: nombre,
            categoria: categoria,
            fecha: fecha,
            informacion: informacion,
            requisitos: requisitos,
            estado: estado,
            preciodolar: preciodolar
        };

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                alert(json.msg);
            });
    }
}

const redireccionarEditar = (objetoServicio) => {
    document.location.href = 'editarServicio.html?' + objetoServicio;
}

const editarServicio = () => {
    var urlParams = new URLSearchParams(window.location.search);
    document.getElementById('nombre').value = urlParams.get('nombre');
    document.getElementById('fecha').value = urlParams.get('fecha');
    document.getElementById('categoria').value = urlParams.get('categoria');
    document.getElementById('informacion').value = urlParams.get('informacion');
    document.getElementById('requisitos').value = urlParams.get('reqisitos');
    document.getElementById('estado').value = urlParams.get('estado');
    document.getElementById('estado').value = urlParams.get('preciodolar');
}

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar').addEventListener('click', registrarServicio);
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', actualizarServicio);
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar').addEventListener('click', eliminarServicio)
}












