interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLInputElement;
}
interface FormEntry {
  entryID: number;
  title: string;
  photoURL: string;
  notes: string;
}

const $photoInput = document.querySelector('.photo-input') as HTMLInputElement;
if (!$photoInput) throw new Error('$photoInput not found');

const $photoPreview = document.querySelector(
  '.photo-preview',
) as HTMLImageElement;
if (!$photoPreview) throw new Error('$photoPreview not found');

$photoInput.addEventListener('input', (event: Event) => {
  const $input = event.target as HTMLInputElement;
  $photoPreview.src = $input.value;
});

const $form = document.querySelector('#contact-form') as HTMLFormElement;
if (!$form) throw new Error('$form not found');

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $contactFormElements = $form.elements as FormElements;
  const formObject: FormEntry = {
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

function renderEntry(entry: FormEntry): HTMLElement {
  const $li = document.createElement('li');
  const $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  $li.appendChild($rowDiv);
  $li.setAttribute('data-entry-id', entry.entryID.toString());

  const $imageColumn = document.createElement('div');
  $imageColumn.className = 'column-half';
  $rowDiv.appendChild($imageColumn);

  const $img = document.createElement('img') as HTMLImageElement;
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

const $ul = document.querySelector('ul') as HTMLElement;
if (!$ul) throw new Error('$ul not found');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

const $noEntriesMessage = document.querySelector('.no-entries') as HTMLElement;
if (!$noEntriesMessage) throw new Error('$noEntriesMessage not found');

function toggleNoEntries(): any {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
  }
}

const $entriesView = document.querySelector(
  '[data-view="entries"]',
) as HTMLElement;
if (!$entriesView) throw new Error('$entriesView was not found');

const $entryFormView = document.querySelector(
  '[data-view="entry-form"]',
) as HTMLElement;
if (!$entryFormView) throw new Error('$entryFormView was not found');

function viewSwap(viewName: string): any {
  data.view = viewName;
  if (viewName === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  } else if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  }
}

const $newEntryButton = document.querySelector('.new-entry-button');
if (!$newEntryButton) throw new Error('$newEntryButton not found');
const $entriesLinkButton = document.querySelector('.entries-link');
if (!$entriesLinkButton) throw new Error('$entriesLinkButton not found');

$newEntryButton.addEventListener('click', () => {
  viewSwap('entry-form');
});

$entriesLinkButton.addEventListener('click', () => {
  viewSwap('entries');
});
