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
  const $newEntry = renderEntry(formObject);
  $ul.prepend($newEntry);
  viewSwap('entries');
  toggleNoEntries();
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
  $img.src = entry.photoURL;
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
  $descriptionParagraph.textContent = entry.notes;
  $textColumn.appendChild($descriptionParagraph);
  return $li;
}
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul not found');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
const $noEntriesMessage = document.querySelector('.no-entries');
if (!$noEntriesMessage) throw new Error('$noEntriesMessage not found');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
  }
}
const $entriesView = document.querySelector('[data-view="entries"]');
if (!$entriesView) throw new Error('$entriesView was not found');
const $entryFormView = document.querySelector('[data-view="entry-form"]');
if (!$entryFormView) throw new Error('$entryFormView was not found');
function viewSwap(viewName) {
  $entryFormView.classList.add('hidden');
  $entriesView.classList.add('hidden');
  if (viewName === 'entry-form') {
    $entryFormView.classList.remove('hidden');
  } else if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
  }
}
const $viewEntriesLink = document.querySelector('#view-entries-link');
if (!$viewEntriesLink) throw new Error('$viewEntriesLink not found');
function handleViewSwap(event) {
  event.preventDefault();
  viewSwap('entries');
}
$viewEntriesLink.addEventListener('click', handleViewSwap);
