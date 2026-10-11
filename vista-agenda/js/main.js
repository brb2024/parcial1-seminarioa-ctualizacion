const webkook_url_make = 'https://hook.us2.make.com/qfr9ozglo2n487jz21pr4p699gsyb3vx'
const api_key = 'clave-secreta'

document.querySelector('#formularioAgenda').addEventListener('submit', async e => {
  e.preventDefault()

  // los datos del formulario
  const formData = {
    propietario: document.querySelector('#propietario').value,
    correo: document.querySelector('#correo').value,
    mascota: document.querySelector('#mascota').value,
    especie: document.querySelector('#especie').value,
    servicio: document.querySelector('#servicio').value,
    fecha: document.querySelector('#fecha').value,
    hora: document.querySelector('#hora').value,
    fechaSolicitud: Date.now()
  }

  try { // entramos a validar el envio de la peticion al webhook
    const response = await fetch(webkook_url_make, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-make-apikey': api_key
      },
      body: JSON.stringify(formData)
    })

    const jsonRespuesta = await response.json()

    if (jsonRespuesta.estado === 'pendiente de revision') {
      alert(`Cita con estado: ${jsonRespuesta.estado}, ${jsonRespuesta.mensaje}`)
      return
    }

    alert(`${jsonRespuesta.mensaje}`)
  } 
  catch (e) { // si se presenta error
    console.log(e)
  }
})