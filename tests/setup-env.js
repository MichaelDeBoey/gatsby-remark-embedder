// this removes the quotes around strings...
const unquoteSerializer = {
  serialize: (val) => val.trim(),
  test: (val) => typeof val === 'string',
};

expect.addSnapshotSerializer(unquoteSerializer);
