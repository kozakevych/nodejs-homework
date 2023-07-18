import { users } from './users-data.js';

export const getAllUsers = (req, res) => {
  const usersList = users.map(u => {
    const { id, name, email } = u;
    return { id, name, email };
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(usersList));
}

export const createUser = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const user = JSON.parse(body);

    // Gets biggest 'id', increases its value by 1 and adds it to new user (just to make it unique)
    // Should be handled with separate library, but not sure if that is needed in our task
    const maxId = users.reduce((a, b) => a.id > b.id ? a : b).id;
    user.id = maxId + 1;

    users.push(user);

    res.statusCode = 201;
    res.end('User created successfully');
  });
}
