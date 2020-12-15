// this removes the quotes around strings...
const unquoteSerializer = {
  print: (val) => val,
  test: (val) => typeof val === 'string',
};

expect.addSnapshotSerializer(unquoteSerializer);
