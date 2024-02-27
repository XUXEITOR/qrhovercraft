onst btnPermitir = document.getElementById('btn-permitir');
const video = document.getElementById('video');
const canvasAR = document.getElementById('canvas-ar');

btnPermitir.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.style.display = 'block';

      // Oculta la interfaz de permisos
      document.getElementById('permiso-camara').style.display = 'none';

      // Inicia la detección de QR
      iniciarDeteccionQR(video);
    })
    .catch(error => {
      console.error('Error al obtener acceso a la cámara:', error);
      // Mostrar mensaje al usuario informando sobre el error
    });
});

// Variables
const qrCode = './img/qr.png'; // Ruta del QR
const videoAR = './video/video.mp4'; // Ruta del video AR
let scanner;
let scene, camera, renderer;

// Función para iniciar la detección de QR
function iniciarDeteccionQR(video) {
  scanner = new ZXing.BrowserQRCodeReader();

  scanner.decodeFromInputVideo(video, (result) => {
    if (result) {
      // Se ha detectado el QR
      console.log('QR detectado:', result.text);

      // Iniciar la superposición del video
      iniciarVideoAR(result.text);
    } else {
      console.log('No se ha detectado ningún QR');
    }
  });
}

// Función para iniciar el video de realidad aumentada
function iniciarVideoAR(qrText) {
  // Crea un elemento `video` para el video AR
  const videoAR = document.createElement('video');
  videoAR.src = videoAR;
  videoAR.autoplay = true;
  videoAR.muted = true;
  videoAR.style.position = 'absolute';
  videoAR.style.top = '0';
  videoAR.style.left = '0';
  videoAR.style.width = '100%';
  videoAR.style.height = '100%';

  // Crea un elemento `canvas` para la superposición
  const canvasAR = document.createElement('canvas');
  canvasAR.width = window.innerWidth;
  canvasAR.height = window.innerHeight;
  canvasAR.style.position = 'absolute';
  canvasAR.style.top = '0';
  canvasAR.style.left = '0';
  canvasAR.style.width = '100%';
  canvasAR.style.height = '100%';

  // Agrega los elementos al DOM
  document.getElementById('video').appendChild(videoAR);
  document.getElementById('canvas-ar').appendChild(canvasAR);

  // Inicializa la escena de Three.js
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas: canvasAR });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Crea un objeto 3D para el video
  const videoTexture = new THREE.VideoTexture(videoAR);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;

  const material = new THREE.MeshBasicMaterial({ map: videoTexture });
  const geometry = new THREE.PlaneGeometry(1, 1);
  const videoMesh = new THREE.Mesh(geometry, material);

  // Posiciona el video 3D sobre el QR
  const qrElement = document.querySelector('#qr-code');
  const qrRect = qrElement.getBoundingClientRect();
  videoMesh.position.x = qrRect.left;
  videoMesh.position.y = qrRect.top;
  videoMesh.position.z = 0.1;

  // Agrega el video 3D a la escena
  scene.add(videoMesh);

  // Anima la escena
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();
}

// Inicia la detección de QR al cargar la página
window.addEventListener('load', iniciarDeteccionQR);
