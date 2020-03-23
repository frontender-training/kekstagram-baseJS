'use strict';

// Исходные данные для формирирования листа с фотографиями
var DATA_PICTURE = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
};

// Код клавиш для обработки событий
var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

// Для вывода превьюшек всех фотографий
var picturesList = document.querySelector('.pictures');
var picturesTemplate = getTemplateClone('#picture-template', '.picture');

// Для формы редактирования загруженной фотографии
// невидимая часть
var uploadOverlay = document.querySelector('.upload-overlay');
var closeUploadBtn = uploadOverlay.querySelector('.upload-form-cancel');
var submitUploadBtn = uploadOverlay.querySelector('.upload-form-submit');
var uploadFormComment = uploadOverlay.querySelector('.upload-form-description');

// видимая часть
var uploadForm = document.querySelector('.upload-form');
var uploadFile = uploadForm.querySelector('#upload-file');

// Для увеличения и просмотра фотографии в полном размере
var galleryOverlay = document.querySelector('.gallery-overlay');

var galleryUrl = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikes = galleryOverlay.querySelector('.likes-count');
var galleryComments = galleryOverlay.querySelector('.comments-count');

var closeGalleryBtn = galleryOverlay.querySelector('.gallery-overlay-close');


var listNotes = generateNotes();

renderPicturesList();
// closeUploadPopup();
// openPicture();


// Функция закрытия окна редактирования фото по клику на ESC
function onUploadOverlayKeyDown(evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeUploadOverlay();
  }
}
// Закрываем окно загрузки фотографий
function closeUploadOverlay() {
  if (document.activeElement !== uploadFormComment) {
    uploadOverlay.classList.add('invisible');
    // удаляем обработчик закрытия окна
    closeUploadBtn.removeEventListener('click', closeUploadOverlay);
    // удаляем обработчик закрытия окна по кноаке отправить
    submitUploadBtn.addEventListener('click', closeUploadOverlay);
    // eдаляем обработчик закрытия окна по клавише ESC
    document.removeEventListener('keydown', onUploadOverlayKeyDown);
    // скрываем форму загрузки изображения
    uploadFile.addEventListener('change', openUploadOverlay);
  }
}

// Открываем окно загрузки фотографий
function openUploadOverlay() {
  uploadOverlay.classList.remove('invisible');
  // добавляем обработчик закрытия окна
  closeUploadBtn.addEventListener('click', closeUploadOverlay);
  // добавляем обработчик закрытия окна по кноаке отправить
  submitUploadBtn.addEventListener('click', closeUploadOverlay);
  // добавляем обработчик закрытия окна по клавише ESC
  document.addEventListener('keydown', onUploadOverlayKeyDown);
  // скрываем форму загрузки изображения
  uploadFile.removeEventListener('change', openUploadOverlay);
}

// Открываем фотографию
function openPicture(pictureIndex) {
  // активируем нужную нам картинку
  setActivatePicture(pictureIndex);
  galleryOverlay.classList.remove('invisible');
  // добавление обработчика клика по кнопке закрытия галереи
  closeGalleryBtn.addEventListener('click', onPictureCloseBtnClick);
  // добавление обработчика нажатия на enter по кнопке закрытия галереи
  closeGalleryBtn.addEventListener('keydown', onPictureCloseKeyDown);
  // добавление обработчика нажатия на enter по кнопке закрытия галереи
  document.addEventListener('keydown', onPictureCloseKeyDown);
}

// Закрываем фотографию
function closePicture() {
  galleryOverlay.classList.add('invisible');
  // удаление обработчика клика по кнопке открытия галереи
  closeGalleryBtn.removeEventListener('click', onPictureCloseBtnClick);
  // удаление обработчика нажатия на enter по кнопке закрытия галереи
  closeGalleryBtn.addEventListener('keydown', onPictureCloseKeyDown);
  // удаление обработчика нажатия на enter по кнопке закрытия галереи
  document.addEventListener('keydown', onPictureCloseKeyDown);
}

// Обработчики закрытия просмотра фотографии
//Клик на кнопке
function onPictureCloseBtnClick() {
  closePicture();
}

//Нажатие на клавишу enter и esc
function onPictureCloseKeyDown (evt) {
  if (evt.keyCode === KEY_CODE.ENTER && KEY_CODE.ESC) {
    closePicture();
  }
}

// Активируем нужную картинку при клике на нее
function setActivatePicture(imageIndex) {
  galleryUrl.src = listNotes[imageIndex].url;
  galleryLikes.textContent = listNotes[imageIndex].likes;
  galleryComments.textContent = listNotes[imageIndex].comments;
}

// Клонируем фотографии
function renderPicturesList(array, container) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (item, pictureNumber) {
    fragment.appendChild(renderPictures(item, pictureNumber));
  });

  container.appendChild(fragment);

  uploadOverlay.classList.add('invisible');
  uploadForm.classList.remove('invisible');
  uploadFile.addEventListener('change', openUploadOverlay);
}

// получение нужного дом-элемента из шаблона для клонирования
// избавляемся от #document-fragment, на который нельзя повесить событие
function getTemplateClone(template, innerSelector) {
  var templateElement = document.querySelector(template);
  var elementToClone = templateElement.querySelector(innerSelector);

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector(innerSelector);
  }

  return elementToClone;
}

// Генерируем наш шаблон в документ
function renderPictures(image, pictureIndex) {
  var picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector('.picture img').src = image.url;
  picturesElement.querySelector('.picture-likes').textContent = image.likes;
  picturesElement.querySelector('.picture-comments').textContent = image.comments;

  // Добавляем обработчик события по клике на картинку
  picturesElement.addEventListener('click', function(evt) {
    evt.preventDefault();
    openPicture(pictureIndex);
  });

  // Добавляем обработчик события при нажатаии на клавишу ENTER на картинке
  picturesElement.addEventListener('keydown', function(evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      evt.preventDefault();
      openPicture(pictureIndex);
    }
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
