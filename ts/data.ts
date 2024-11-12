const data = {
  view: 'entry-form',
  entries: [] as FormEntry[],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON: string = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): any {
  const dataJSON = localStorage.getItem('data-storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return [];
  }
}
