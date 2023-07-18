import http from 'http';
import url from 'url';

import { getAllUsers, createUser } from './userRoutes.js';
import {
  getUserById,
  updateUser,
  deleteUser,
  getUserHobbies,
  addHobbyToUser,
  deleteHobbyFromUser
} from './userController.js';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/users') {
    if (method === 'GET') {
      getAllUsers(req, res);
    } else if (method === 'POST') {
      createUser(req, res);
    } else {
      res.statusCode = 405;
      res.end('Method Not Allowed');
    }
  } else if (path.startsWith('/users/')) {
    const userId = path.split('/')[2];

    if (!userId || Number.isNaN(+userId)) {
      res.statusCode = 404;
      res.end('User ID is not correct');
      return;
    }

    if (method === 'GET' && path.endsWith('/hobbies')) {
      getUserHobbies(req, res, userId);
    } else if (method === 'POST' && path.endsWith('/hobbies')) {
      addHobbyToUser(req, res, userId);
    } else if (method === 'DELETE' && path.endsWith('/hobbies')) {
      deleteHobbyFromUser(req, res, userId);
    } else if (method === 'GET') {
      getUserById(req, res, userId);
    } else if (method === 'PUT') {
      updateUser(req, res, userId);
    } else if (method === 'DELETE') {
      deleteUser(req, res, userId);
    } else {
      res.statusCode = 405;
      res.end('Method Not Allowed');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
