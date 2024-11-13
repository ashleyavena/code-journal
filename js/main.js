'use strict';
const $photoInput = document.querySelector('.photo-input');
if (!$photoInput) throw new Error('$photoInput not found');
const $photoPreview = document.querySelector('.photo-preview');
if (!$photoPreview) throw new Error('$photoPreview not found');
$photoInput.addEventListener('input', (event) => {
  const $input = event.target;
  $photoPreview.src = $input.value;
});
const $form = document.querySelector('#contact-form');
if (!$form) throw new Error('$form not found');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $contactFormElements = $form.elements;
  const formObject = {
    title: $contactFormElements.title.value,
    photoURL: $contactFormElements.photoURL.value,
    notes: $contactFormElements.notes.value,
    entryID: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  writeData();
});
function renderEntry(entry) {
  const $li = document.createElement('li');
  const $strong = document.createElement('strong');
  $strong.textContent = entry.title;
  $li.appendChild($strong);
  return $li;
}
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul not found');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
});
