// Ruta de la imagen PPP
const pppImageURL = "ruta/a/imagen/ppp.jpg";

// Ruta del video
const videoURL = "ruta/a/video.mp4";

// Inicializar A-Frame
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Añadir la cámara a la escena
scene.add(camera);

// Configurar el renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("camera-container").appendChild(renderer.domElement);

// Crear un marcador de A-Frame para la imagen PPP
const marker = document.createElement("a-marker");
marker.setAttribute("type", "pattern");
marker.setAttribute("pattern", pppImageURL);
marker.setAttribute("emitevents", "true");
// Añadir el video a la escena
scene.add(video);

// Crear un video de A-Frame
const video = document.createElement("a-video");
video.setAttribute("src", videoURL);
video.setAttribute("position", "0 0 0");
video.setAttribute("scale", "1 1 1");
video.setAttribute("visible", "false");

// Añadir el video a la escena
scene.add(video);

// Función para mostrar el video
function showVideo() {
    document.getElementById("video-container").style.display = "block";
    document.getElementById("message").style.display = "none";
    video.setAttribute("visible", "true");
}

// Función para ocultar el video
function hideVideo() {
    document.getElementById("video-container").style.display = "none";
    document.getElementById("message").style.display = "block";
    video.setAttribute("visible", "false");
}

// Añadir eventos al marcador
marker.addEventListener("markerFound", showVideo);
marker.addEventListener("markerLost", hideVideo);

// Animación
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();

// Permisos de cámara
navigator.mediaDevices
    .getUserMedia({
        video: true,
    })
    .then((stream) => {
        const videoElement = document.getElementById("camera-container");
        videoElement.srcObject = stream;
    });
