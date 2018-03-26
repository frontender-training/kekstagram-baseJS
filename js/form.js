'use strict';

var uploadPicture = document.querySelector('.upload-overlay');
var uploadPictureComment = uploadPicture.querySelector('.upload-form-description');
var uploadPictureFilters = uploadPicture.querySelector('.upload-filter-controls');
var filterPicturePreview = uploadPicture.querySelector('.filter-image-preview');

var btnZoomPictureDec = uploadPicture.querySelector('.upload-resize-controls-button-dec');
var btnZoomPictureInc = uploadPicture.querySelector('.upload-resize-controls-button-inc');
var zoomPicture = uploadPicture.querySelector('.upload-resize-controls-value');

var counter = 1;
var step = 0.25;
var minZoom = 0.25;
var maxZoom = 1;

btnZoomPictureDec.addEventListener('click', setScale);
btnZoomPictureInc.addEventListener('click', setScale);

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
uploadPictureFilters.addEventListener('click', function(evt) {
   setFilter(evt);
});

function setFilter(evt) {
  if (evt.target.checked) {
    filterPicturePreview.className = 'filter-image-preview filter-' + evt.target.value;
  }
}

// Валидация формы
uploadPictureComment.addEventListener('invalid', function (evt) {
  if (uploadPictureComment.validity.tooShort) {
    uploadPictureComment.setCustomValidity('Комментарий должен быть из 30-ти символов');
  } else if (uploadPictureComment.validity.tooLong) {
    uploadPictureComment.setCustomValidity('Комментарий не должен превышать 100 символов');
  } else if (uploadPictureComment.validity.valueMissing) {
    uploadPictureComment.setCustomValidity('Введите, пожалуйста, комментарий. Это обязательно поле для заполнения');
  } else {
    uploadPictureComment.setCustomValidity('');
  }
});

// Валидация формы для edge
uploadPictureComment.addEventListener('textarea', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Комментарий должен быть из 30-ти символов');
  } else {
    target.setCustomValidity('');
  }
});
