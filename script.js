// Librerías
const ZXing = require('@zxing/library');
const THREE = require('three');

// Elementos del DOM
const btnPermitir = document.getElementById('btn-permitir');
const video = document.getElementById('video');
const canvasAR = document.querySelector('.canvas-ar');

// Variables
const qrCode = 'https://github.com/XUXEITOR/qrhovercraft.github.io/blob/2f39b6955b0a5d7c451e438f4444815497c7ad58/qr-code.png?raw=true';
const videoAR = 'https://www.youtube.com/watch?v=dPmPk2tpmSo&t=17s';
let scanner;
let scene, camera, renderer;

// Función para iniciar la detección de QR
function iniciarDeteccionQR() {
scanner = new ZXing.BrowserQRCodeReader();

scanner.decodeFromImage(qrCode)
    .then(result => {
      // Se ha detectado el QR
    console.log('QR detectado:', result.text);

      // Iniciar la superposición del video
    iniciarVideoAR(result.text);
    })
    .catch(error => {
    console.error('Error al detectar el QR:', error);
    });
}

// Función para iniciar la superposición del video
function iniciarVideoAR(qrText) {
  // Crea la escena de Three.js
scene = new THREE.Scene();

  // Crea la cámara de Three.js
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
camera.position.z = 500;

  // Crea el renderer de Three.js
renderer = new THREE.WebGLRenderer({
    canvas: canvasAR,
});
renderer.setSize(window.innerWidth, window.innerHeight);

  // Crea la geometría del video
const videoGeometry = new THREE.PlaneGeometry(640, 480);

  // Crea el material del video
const videoMaterial = new THREE.VideoTexture(video);
videoMaterial.needsUpdate = true;

  // Crea el objeto del video
const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
videoMesh.position.z = 100;

  // Añade el video a la escena
scene.add(videoMesh);

  // Anima la escena
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();

  // Inicia la reproducción del video
video.play();

  // Actualiza el tamaño del lienzo cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});
}

// Eventos
btnPermitir.addEventListener('click', () => {
navigator.mediaDevices.getUserMedia({ video: true })
    
