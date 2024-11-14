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
  const $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  $li.appendChild($rowDiv);
  const $imageColumn = document.createElement('div');
  $imageColumn.className = 'column-half';
  $rowDiv.appendChild($imageColumn);
  const $img = document.createElement('img');
  $img.src = 'images/placeholder-image-square.jpg';
  $img.alt = 'placeholder image';
  $img.className = 'photo-preview';
  $imageColumn.appendChild($img);
  const $textColumn = document.createElement('div');
  $textColumn.className = 'column-half';
  $rowDiv.appendChild($textColumn);
  const $titleParagraph = document.createElement('p');
  const $strong = document.createElement('strong');
  $strong.textContent = entry.title;
  $titleParagraph.appendChild($strong);
  $textColumn.appendChild($titleParagraph);
  const $descriptionParagraph = document.createElement('p');
  $descriptionParagraph.textContent = 'i guess its not a new image';
  $textColumn.appendChild($descriptionParagraph);
  return $li;
}
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul not found');
document.addEventListener('DOMContentLoaded', () => {
  // toggleNoEntries();
  for (let i = 0; i < data.entries; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
});
console.log(renderEntry(data));
const $noEntriesMessage = document.querySelector('.no-entries');
if (!$noEntriesMessage) throw new Error('$noEntriesMessage not found');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntriesMessage.style.display = 'none';
  } else {
    $noEntriesMessage.style.display = 'block';
    $ul.innerHTML = '';
  }
}
toggleNoEntries();
// function renderNoEntries(): HTMLElement {
//   const $message = document.createElement('p');
//   $message.className = 'no-entries-message';
//   $message.textContent = 'No entries have been recorded';
//   return $message;
// }
