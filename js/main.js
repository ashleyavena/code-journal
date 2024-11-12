'use strict';
const $photoPreview = document.querySelector('.photo-preview');
if (!$photoPreview) throw new Error('$photoPreview not found');
const $photoInput = document.querySelector('.photo-input');
if (!$photoInput) throw new Error('$photoInput not found');
$photoInput.addEventListener('input', (event) => {
  const $input = event.target;
  $photoPreview.src = $input.value;
});
