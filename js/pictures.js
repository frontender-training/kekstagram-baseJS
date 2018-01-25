'use strict';

var COUNT_PHOTOS = 25;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
var picturesTemplate = document.querySelector('#picture-template').content; // Найдем шаблон который мы будем копировать.

var listNotes = generateNotes();

clonePicture();

var uploadPicture = document.querySelector('.upload-overlay');
uploadPicture.classList.add('invisible');

// Клонируем фотографии
function clonePicture() {
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
  for (var i = 1; i < COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomElement(COMMENTS)
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
