'use strict';
const $noEntriesMessage = document.querySelector('.no-entries');
if (!$noEntriesMessage) throw new Error('$noEntriesMessage not found');
const $photoInput = document.querySelector('.photo-input');
if (!$photoInput) throw new Error('$photoInput not found');
const $form = document.querySelector('#contact-form');
if (!$form) throw new Error('$form not found');
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul not found');
const $photoPreview = document.querySelector('.photo-preview');
if (!$photoPreview) throw new Error('$photoPreview not found');
const $entriesView = document.querySelector('[data-view="entries"]');
if (!$entriesView) throw new Error('$entriesView was not found');
const $entryFormView = document.querySelector('[data-view="entry-form"]');
if (!$entryFormView) throw new Error('$entryFormView was not found');
const $newEntryButton = document.querySelector('.new-entry-button');
if (!$newEntryButton) throw new Error('$newEntryButton not found');
const $entriesLinkButton = document.querySelector('.entries-link');
if (!$entriesLinkButton) throw new Error('$entriesLinkButton not found');
$photoInput.addEventListener('input', (event) => {
  const $input = event.target;
  $photoPreview.src = $input.value;
});
$form.addEventListener('submit', (event) => {
  console.log('hello');
  event.preventDefault();
  const $contactFormElements = $form.elements;
  const formObject = {
    title: $contactFormElements.title.value,
    photoURL: $contactFormElements.photoURL.value,
    notes: $contactFormElements.notes.value,
    entryID: data.nextEntryId,
  };
  if (data.editing === null) {
    data.entries.unshift(formObject);
    data.nextEntryId++;
    writeData();
    const $newEntry = renderEntry(formObject);
    $ul.prepend($newEntry);
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === data.editing.entryID) {
        formObject.entryID = data.editing.entryID;
        data.entries[i] = formObject;
        const $oldEntry = $ul.querySelector(
          `li[data-entry-id="${data.editing.entryID}"]`,
        );
        const $updatedEntry = renderEntry(formObject);
        if ($oldEntry) {
          $oldEntry.replaceWith($updatedEntry);
        }
        break;
      }
    }
    $h2Title.textContent = 'New Entry';
    data.editing = null;
  }
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  toggleNoEntries();
  $form.reset();
  viewSwap('entries');
});
function renderEntry(entry) {
  const $li = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  $li.appendChild($rowDiv);
  $li.setAttribute('data-entry-id', entry.entryID.toString());
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
  const $fontPencil = document.createElement('i');
  $fontPencil.className = 'fa fa-pencil';
  $titleParagraph.appendChild($fontPencil);
  const $descriptionParagraph = document.createElement('p');
  $descriptionParagraph.textContent = entry.notes;
  $textColumn.appendChild($descriptionParagraph);
  return $li;
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
  }
}
function viewSwap(viewName) {
  data.view = viewName;
  if (viewName === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  } else if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  }
}
$newEntryButton.addEventListener('click', () => {
  viewSwap('entry-form');
});
$entriesLinkButton.addEventListener('click', () => {
  viewSwap('entries');
});
$ul.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.matches('.fa-pencil')) {
    viewSwap('entry-form');
    const $findLi = $eventTarget.closest('li');
    const $getLi = $findLi.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === Number($getLi)) {
        data.editing = data.entries[i];
        $photoPreview.src = data.editing.photoURL;
        const $formStuff = $form.elements;
        $formStuff.title.value = data.editing.title;
        $formStuff.photoURL.value = data.editing.photoURL;
        $formStuff.notes.value = data.editing.notes;
        $h2Title.textContent = 'Edit Entry';
        $deleteButton?.classList.remove('hidden');
      }
    }
  }
});
const $deleteButton = document.querySelector('#delete-button');
if (!$deleteButton) throw new Error('$deleteButton not found');
const $cancelButton = document.querySelector('.dont-delete');
if (!$cancelButton) throw new Error('$cancelButton not found');
const $confirmDelete = document.querySelector('.confirm-delete');
if (!$confirmDelete) throw new Error('$confirmDelete not found');
const $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('$dialog not found');
$deleteButton.addEventListener('click', () => {
  $dialog.showModal();
});
$cancelButton.addEventListener('click', () => {
  $dialog.close();
});
$confirmDelete.addEventListener('click', () => {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === data.editing?.entryID) {
      data.entries.splice(i, 1);
      const $deleteLi = document.querySelector(
        `li[data-entry-id="${data.editing.entryID}"]`,
      );
      $deleteLi.remove();
      if (data.entries.length === 0) {
        toggleNoEntries();
      }
      $dialog.close();
      data.editing = null;
      viewSwap('entries');
      writeData();
      return;
    }
  }
});
const $h2Title = document.querySelector('[data-view="entry-form"] h2');
