'use strict';

var uploadPicture = document.querySelector('.upload-overlay');

var uploadPictureComment = uploadPicture.querySelector('.upload-form-description');

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
