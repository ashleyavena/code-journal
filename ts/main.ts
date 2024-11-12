interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  url: HTMLInputElement;
  notes: HTMLInputElement;
}
interface FormEntry {
  entryID: number;
  title: string;
  url: string;
  notes: string;
}

const $photoPreview = document.querySelector(
  '.photo-preview',
) as HTMLImageElement;
if (!$photoPreview) throw new Error('$photoPreview not found');

const $photoInput = document.querySelector('.photo-input') as HTMLInputElement;
if (!$photoInput) throw new Error('$photoInput not found');

$photoInput.addEventListener('input', (event: Event) => {
  const $input = event.target as HTMLInputElement;
  $photoPreview.src = $input.value;
  // writeData();?? am i modifying data here ? i don't think so
});

const $form = document.querySelector('#contact-form') as HTMLFormElement;
if (!$form) throw new Error('$form not found');

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $contactFormElements = $form.elements as FormElements;
  const formObject: FormEntry = {
    title: $contactFormElements.title.value,
    url: $contactFormElements.url.value,
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
