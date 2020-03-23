'use strict';

var uploadPicture = document.querySelector('.upload-overlay');
var uploadPictureComment = uploadPicture.querySelector('.upload-form-description');
var uploadPictureFilters = uploadPicture.querySelector('.upload-filter-controls');
var filterPicturePreview = uploadPicture.querySelector('.filter-image-preview');

var btnZoomMinusPicture = uploadPicture.querySelector('.upload-resize-controls-button-dec');
var btnZoomPlusPicture = uploadPicture.querySelector('.upload-resize-controls-button-inc');
var zoomPicture = uploadPicture.querySelector('.upload-resize-controls-value');

var counter = 1;
var step = 0.25;
var minZoom = 0.25;
var maxZoom = 1;

btnZoomMinusPicture.addEventListener('click', setScale);
btnZoomPlusPicture.addEventListener('click', setScale);

function enlargeValue() {
  if (counter < maxZoom) {
    return counter += step;
  }
  return counter = maxZoom;
}

function reduceValue() {
  if (counter > minZoom) {
    return counter -= step;
  }
  return counter = minZoom;
}

function enlargeValue() {
  if (counter < maxZoom) {
    return counter += step;
  }
  return counter = maxZoom;
}

function reduceValue() {
  if (counter > minZoom) {
    return counter -= step;
  }
  return counter = minZoom;
}

function setScale(evt) {
  if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
    var valueZoom = enlargeValue();
  }

  if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
    var valueZoom = reduceValue();
  }

  zoomPicture.value = valueZoom * 100 + '%';
  filterPicturePreview.style.transform = 'scale(' + valueZoom + ')';
}

// Добавление фильтра к картинке по клику
uploadPictureFilters.addEventListener('click', setFilter);

function setFilter(evt) {
  if (evt.target.checked) {
    filterPicturePreview.className = 'filter-image-preview filter-' + evt.target.value;
  }
}

// Добавление обработчика валидации формы
uploadPictureComment.addEventListener('invalid', validationComment );

// Добавление обработчика валидации формы
uploadPictureComment.addEventListener('input', showError);

function showError(evt) {
  var element = evt.target;
  element.style.outlineColor = element.validity.valid ? '' : 'red';
}

// Валидация формы
function validationComment (evt) {
  var element = evt.target;
  if (element.validity.tooShort) {
    element.setCustomValidity('Комментарий должен быть не меньше 30-ти символов' );
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Комментарий не должен превышать 100 символов');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Введите, пожалуйста, комментарий. Это обязательно поле для заполнения');
  } else {
    element.setCustomValidity('');
  }
}

// // Валидация формы для edge
// function validationFormEdge(evt) {
//   var target = evt.target;
//   if (target.value.length < 30) {
//     target.setCustomValidity('Комментарий должен быть из 30-ти символов');
//   } else {
//     target.setCustomValidity('');
//   }
// }
