'use strict';

var DATA_PICTURE = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
};

var KEYCODE = {
  ENTER: 13,
  ESC: 27
};

var picturesList = document.querySelector('.pictures');                     // Найдем элемент в который мы будем вставлять наши изображения
var picturesTemplate = document.querySelector('#picture-template').content; // Найдем шаблон который мы будем копировать.
var uploadOverlay = document.querySelector('.upload-overlay');              // Найдем окно загрузки фотографий.
var uploadForm = document.querySelector('.upload-form');

var uploadFormFile = uploadForm.querySelector('#upload-file');

var uploadFormCancel = document.querySelector('.upload-form-cancel');

var uploadFormComment = uploadForm.querySelector('.upload-form-description');

var galleryOverlay = document.querySelector('.gallery-overlay');                   // Найдем окно для просмотра фотографий

var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

var listNotes = generateNotes();

uploadFormFile.addEventListener('change', openUploadOverlay);

uploadFormCancel.addEventListener('click', closeUploadOverlay);

galleryOverlayClose.addEventListener('click', closePicture);

// Функция закрытия окна редактирования фото по клику на ESC
function onUploadOverlayEscPress(evt) {
  if (evt.keyCode === KEYCODE.ESC) {
    closeUploadOverlay()
  }
}

// Закрываем окно загрузки фотографий
function closeUploadOverlay() {
  if (document.activeElement !== uploadFormComment) {
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  }
}

// Открываем окно загрузки фотографий
function openUploadOverlay() {
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onUploadOverlayEscPress);
}

// Открываем фотографию
function openPicture() {
  galleryOverlay.classList.remove('invisible');
}

// Открываем фотографию
function closePicture() {
  galleryOverlay.classList.add('invisible');
}

renderPicturesList(listNotes, picturesList);
closeUploadOverlay();
generatePicturePreview(listNotes, 0);

// Клонируем фотографии
function renderPicturesList(array, container) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (item) {
    fragment.appendChild(renderPictures(item));
  });

  container.appendChild(fragment);

  uploadForm.classList.remove('invisible');
}

function generatePicturePreview(image, index) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = image[index].url;
  galleryOverlay.querySelector('.likes-count').textContent = image[index].likes;
  galleryOverlay.querySelector('.comments-count').textContent = image[index].comments;
}

// Генерируем наш шаблон в документ
function renderPictures(image) {
  var picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector('.picture img').src = image.url;
  picturesElement.querySelector('.picture-likes').textContent = image.likes;
  picturesElement.querySelector('.picture-comments').textContent = image.comments;

  picturesElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    generatePicturePreview(image);
  });

  return picturesElement;
}

// Функция, возвращающаая массив объектов записей в блоге
function generateNotes() {
  var notes = [];
  for (var i = 1; i < DATA_PICTURE.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(DATA_PICTURE.MIN_LIKES, DATA_PICTURE.MAX_LIKES),
      comments: getRandomElement(DATA_PICTURE.COMMENTS)
    });
  }
  return notes;
}

// Функция, возвращающая случайное число в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}
