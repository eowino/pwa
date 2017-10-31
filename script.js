/**
 * PWAINT!
 */

/* STICKER: Here's where you can change the sticker that will be added to your photos! */
/* Click 'assets' on the left and drop in an image. Copy & paste its link, replacing the one here: */
var STICKER_SOURCE = 'https://cdn.glitch.com/f290affc-2d94-4f31-b635-e9defa452e4c%2Fcobweb2.png?1508936220191';

/* Some other constant values we want to remember */
var STICKER_SIZE = 128;
var MAX_WIDTH_RATIO = 0.9;
var HEADER_AND_FOOTER_HEIGHT = 120;

/* Set up references to our page elements */ 
var inputPhoto = document.getElementById('input-photo');
var photoContainer = document.getElementById('photo-container');
var btnDone = document.getElementById('btn-done');
var imgSave = document.getElementById('img-save');
var canvasPhoto;
var canvasPhotoContext;
  
/* Set things up at the beginning */
var stickerImg = document.createElement('img');
stickerImg.crossOrigin = 'anonymous';
stickerImg.src = STICKER_SOURCE;

inputPhoto.addEventListener('change', onPhotoInput);
btnDone.addEventListener('click', onClickDone);

/* When the browser has loaded the selected photo */
function onPhotoLoad(result) {

  canvasPhoto = result;
  canvasPhoto.id = 'canvas-photo';
  canvasPhoto.addEventListener('click', onStampSticker);
  
  photoContainer.innerHTML = '';
  photoContainer.appendChild(canvasPhoto);
  
  canvasPhotoContext = canvasPhoto.getContext('2d');
  
  if (devicePixelRatio) {
     canvasPhotoContext.scale(devicePixelRatio, devicePixelRatio); 
  }

  /* Reset the context from the loadImage library's changes, to add our images on top */
  canvasPhotoContext.resetTransform();

  showPage('stickers');
  
}

/* When they choose or take a photo... */
function onPhotoInput(event) {
  
  var options = {
    maxWidth: window.innerWidth * MAX_WIDTH_RATIO,
    maxHeight: window.innerHeight - HEADER_AND_FOOTER_HEIGHT,
    contain: true,
    orientation: true,
    canvas: true,
    pixelRatio: devicePixelRatio || 1,
    crossOrigin: 'anonymous'
  };
  
  var photoFile = event.target.files[0];
  
  /* Uses a library which handles rotating the image (if required) & scaling to fit */
  loadImage(photoFile, onPhotoLoad, options);
  
}

/* When they tap/click to add a sticker... */
function onStampSticker(event) {
  /* This will centre the sticker around where they click */
  var x = event.offsetX - STICKER_SIZE/2;
  var y = event.offsetY - STICKER_SIZE/2;
  var scaledSize = STICKER_SIZE * devicePixelRatio;
  canvasPhotoContext.drawImage(stickerImg, x * devicePixelRatio, y * devicePixelRatio, scaledSize, scaledSize);
}

function onClickDone(event) {
  event.preventDefault();
  imgSave.src = canvasPhoto.toDataURL('image/png');
  showPage('result');
}
