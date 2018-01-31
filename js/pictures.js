'use strict';

var DataPicture = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
};

var picturesList = document.querySelector('.pictures');                     // Найдем элемент в который мы будем вставлять наши изображения
var picturesTemplate = document.querySelector('#picture-template').content; // Найдем шаблон который мы будем копировать.
var uploadPicture = document.querySelector('.upload-overlay');              // Найдем окно загрузки фотографий.
var gallery = document.querySelector('.gallery-overlay');                   // Найдем окно для просмотра фотографий

var listNotes = generateNotes();

renderPicturesList();
closeUploadPopup();
openPicture();

// Закрываем окно загрузки фотографий
function closeUploadPopup() {
  uploadPicture.classList.add('invisible');
}

// Открываем первую фотографию
function openPicture() {
  gallery.classList.remove('invisible');
  gallery.querySelector('.gallery-overlay-image').src = listNotes[0].url;
  gallery.querySelector('.likes-count').textContent = listNotes[0].likes;
  gallery.querySelector('.comments-count').textContent = listNotes[0].comments;
}

// Клонируем фотографии
function renderPicturesList() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < listNotes.length; i++) {
    fragment.appendChild(renderPicture(listNotes[i]));
  }
  picturesList.appendChild(fragment);
}

// Генерируем наш шаблон в документ
function renderPicture(image) {
  var picturesElement = picturesTemplate.cloneNode(true);
  picturesElement.querySelector('.picture img').src = image.url;
  picturesElement.querySelector('.picture-likes').textContent = image.likes;
  picturesElement.querySelector('.picture-comments').textContent = image.comments;
  return picturesElement;
}

// Функция, возвращающаая массив объектов записей в блоге
function generateNotes() {
  var notes = [];
  for (var i = 1; i < DataPicture.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(DataPicture.MIN_LIKES, DataPicture.MAX_LIKES),
      comments: getRandomElement(DataPicture.COMMENTS)
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
