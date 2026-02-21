const request = require('supertest');
const { app, todos } = require('./app');

beforeEach(() => {
  todos.length = 0;
});

describe('POST /todos', () => {
  test('creates a todo with valid title', async () => {
    const res = await request(app).post('/todos').send({ title: 'Buy milk' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.any(Number), title: 'Buy milk', completed: false });
    expect(res.body.createdAt).toBeDefined();
  });

  test('returns 400 when title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/i);
  });

  test('returns 400 when title is empty string', async () => {
    const res = await request(app).post('/todos').send({ title: '   ' });
    expect(res.status).toBe(400);
  });

  test('returns 400 when title is not a string', async () => {
    const res = await request(app).post('/todos').send({ title: 123 });
    expect(res.status).toBe(400);
  });
});

describe('GET /todos', () => {
  test('returns empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns all todos', async () => {
    await request(app).post('/todos').send({ title: 'A' });
    await request(app).post('/todos').send({ title: 'B' });
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /todos/:id', () => {
  test('returns a todo by id', async () => {
    const created = await request(app).post('/todos').send({ title: 'Test' });
    const res = await request(app).get(`/todos/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test');
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/todos/999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /todos/:id', () => {
  test('updates a todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Old' });
    const res = await request(app)
      .put(`/todos/${created.body.id}`)
      .send({ title: 'New', completed: true });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'New', completed: true });
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).put('/todos/999').send({ title: 'X', completed: false });
    expect(res.status).toBe(404);
  });

  test('returns 400 when title is missing', async () => {
    const created = await request(app).post('/todos').send({ title: 'Test' });
    const res = await request(app).put(`/todos/${created.body.id}`).send({ completed: true });
    expect(res.status).toBe(400);
  });

  test('returns 400 when completed is missing', async () => {
    const created = await request(app).post('/todos').send({ title: 'Test' });
    const res = await request(app).put(`/todos/${created.body.id}`).send({ title: 'Updated' });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /todos/:id', () => {
  test('deletes a todo', async () => {
    const created = await request(app).post('/todos').send({ title: 'Delete me' });
    const res = await request(app).delete(`/todos/${created.body.id}`);
    expect(res.status).toBe(204);

    const check = await request(app).get(`/todos/${created.body.id}`);
    expect(check.status).toBe(404);
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).delete('/todos/999');
    expect(res.status).toBe(404);
  });
});
