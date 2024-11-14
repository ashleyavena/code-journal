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

  const $imageColumn = document.createElement('div');
  $imageColumn.className = 'column-half';
  $rowDiv.appendChild($imageColumn);

  const $img = document.createElement('img') as HTMLImageElement;
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

const $ul = document.querySelector('ul') as HTMLElement;
if (!$ul) throw new Error('$ul not found');

document.addEventListener('DOMContentLoaded', () => {
  // toggleNoEntries();
  for (let i = 0; i < data.entries; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $ul.appendChild($newEntry);
  }
});

console.log(renderEntry(data));

const $noEntriesMessage = document.querySelector('.no-entries') as HTMLElement;
if (!$noEntriesMessage) throw new Error('$noEntriesMessage not found');

function toggleNoEntries(): any {
  if (data.entries.length > 0) {
    $noEntriesMessage.classList.add('hidden');
  } else {
    $noEntriesMessage.classList.remove('hidden');
    $ul.innerHTML = '';
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
  $entryFormView.classList.add('hidden');
  $entriesView.classList.add('hidden');
  if (viewName === 'entry-form') {
    $entryFormView.classList.remove('hidden');
  } else if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
  }
}

toggleNoEntries();
viewSwap('commit -m');

const $viewEntriesLink = document.querySelector(
  '#view-entries-link',
) as HTMLAnchorElement;
if (!$viewEntriesLink) throw new Error('$viewEntriesLink not found');

function handleViewSwap(event: Event): void {
  event.preventDefault();
  viewSwap('entries');
}

$viewEntriesLink.addEventListener('click', handleViewSwap);
