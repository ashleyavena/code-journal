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
  writeData();
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
  console.log('form data', formObject);
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  writeData();
});
