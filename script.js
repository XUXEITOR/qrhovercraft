const permisoCamara = document.getElementById('permiso-camara');
const btnPermisoCamara = document.getElementById('btn-permiso-camara');
const videoElement = document.getElementById('video-camara');
const canvasElement = document.getElementById('canvas-qr');
const videoRA = document.getElementById('video-ra');
const videoRAElemento = document.getElementById('video-ra-elemento');

btnPermisoCamara.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
      permisoCamara.classList.add('oculto');
      videoElement.style.display = 'block';
      // Iniciar la cámara y la búsqueda del QR
      detectarQR();
    })
    .catch(() => {
      console.log('Error al obtener acceso a la cámara');
    });
});

const qrScanner = new jsQR();

function detectarQR() {
  const context = canvasElement.getContext('2d');
  context.drawImage(videoElement, 0, 0);
  const code = qrScanner.decode(canvasElement);

  if (code) {
    // Se ha detectado el QR
    console.log('QR detectado:', code.data);
    // Mostrar el video en realidad aumentada
    mostrarVideoRA(code.data);
  } else {
    // No se ha detectado el QR
    setTimeout(detectarQR, 100);
  }
}

function mostrarVideoRA(rutaVideo) {
  videoRA.style.display = 'block';
  videoRAElemento.src = rutaVideo;
