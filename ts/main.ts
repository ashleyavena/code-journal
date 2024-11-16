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

$ul.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.matches('.fa-pencil')) {
    viewSwap('entry-form');
    const $findLi = $eventTarget.closest('li') as HTMLElement;
    const $getLi = $findLi.getAttribute('data-entry-id');

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === Number($getLi)) {
        data.editing = data.entries[i];
        $photoPreview.src = data.editing.photoURL;

        const $formStuff = $form.elements as FormElements;
        $formStuff.title.value = data.editing.title;
        $formStuff.photoURL.value = data.editing.photoURL;
        $formStuff.notes.value = data.editing.notes;
        $h2Title.textContent = 'Edit Entry';
      }
    }
  }
});

const $h2Title = document.querySelector(
  '[data-view="entry-form"] h2',
) as HTMLElement;
