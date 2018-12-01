
describe('find', async () => {
  test('should return empty list when no data present', async () => {
  });

  test('should return values when data present', async () => {

  });
});

describe('findById', async () => {
  test('should return article when correct id is passed', async () => {

  });

  test('should throw an error when id passed doesn\'t exist', async () => {

  });

  test('should throw an error when id passed is null', async () => {

  });

  test('should throw an error when id passed is of incorrect type', async () => {

  });

  test('should throw a 500 error and return null for any other errors caught', async () => {

  });
});

describe('add', async () => {
  test('should add article when valid data is passed', async () => {

  });

  test('should add article successfully with multiple tags', async () => {

  });

  test('should add article successfully without images', async () => {

  });

  test('should add article successfully with images', async () => {

  });

  test('should throw an error and not add article when invalid data is passed', async () => {

  });

  test('should throw an error and not add article when authorUID is missing', async () => {

  });

  test('should throw an error and not add article when title is missing', async () => {

  });
});

describe('update', async () => {
  test('should update article correctly when valid id and data are passed', async () => {
  });

  test('should throw an error when article not found', async () => {

  });

  test('should throw an error when incorrect data type values are passed', async () => {

  });
});

describe('delete', async () => {
  test('should delete article successfully when correct id is passed', async () => {
  });

  test('should throw an error when article to delete not found', async () => {

  });

  test('should throw an error when article id passed is null', async () => {

  });

  test('should throw an error when id passed is of incorrect type', async () => {

  });

  test('should throw a 500 error and return null for any other errors caught', async () => {

  });
});
