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
import {
  DELETE,
  GET,
  POST,
  PUT,
  HOBBIES_ROUTE,
  USERS_ROUTE
} from './config/constants.js';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === USERS_ROUTE) {
    if (method === GET) {
      getAllUsers(req, res);
      return;
    } 
    if (method === POST) {
      createUser(req, res);
      return;
    }
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  if (path.startsWith(`${USERS_ROUTE}/`)) {
    const userId = path.split('/')[2];

    if (!userId || Number.isNaN(+userId)) {
      res.statusCode = 404;
      res.end('User ID is not correct');
      return;
    }

    if (method === GET && path.endsWith(HOBBIES_ROUTE)) {
      res.setHeader('Cache-Control', 'max-age=3600');
      res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());

      getUserHobbies(req, res, userId);
      return;
    } 
    if (method === POST && path.endsWith(HOBBIES_ROUTE)) {
      addHobbyToUser(req, res, userId);
      return;
    }
    if (method === DELETE && path.endsWith(HOBBIES_ROUTE)) {
      deleteHobbyFromUser(req, res, userId);
      return;
    }
    if (method === GET) {
      getUserById(req, res, userId);
      return;
    }
    if (method === PUT) {
      updateUser(req, res, userId);
      return;
    }
    if (method === DELETE) {
      deleteUser(req, res, userId);
      return;
    } 

    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
