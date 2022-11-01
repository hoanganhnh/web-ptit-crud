function createData(
  id: string,
  name: string,
  dob: string,
  major: string,
  vaccinated: boolean
) {
  return { id, name, dob, major, vaccinated };
}

const rows = [
  createData("1", "A", "1/1/2001", "24", false),
  createData("2", "B", "1/1/2001", "37", true),
  createData("3", "C", "1/1/2001", "24", true),
  createData("4", "D", "1/1/2001", "67", true),
  createData("5", "E", "1/1/2001", "49", true),
];

export function getData() {
  return rows;
}

export function getItemById(id: string) {
  return rows.find((row) => row.id === id);
}
