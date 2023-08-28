import http from 'http';
import Router from './Router.js';

import { getAllUsers, createUser } from './userRoutes.js';
import {
  getUserById,
  updateUser,
  deleteUser,
  getUserHobbies,
  addHobbyToUser,
  deleteHobbyFromUser
} from './userController.js';

const router = new Router();

router
  .get('/users', (req, res) => {
    const result = getAllUsers(req, res);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
  .post('/users', (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const user = JSON.parse(body);
      createUser(user);
      res.statusCode = 201;
      res.end('User created successfully');
    });
  })
  .get('/users/:id', (req, res) => {
    const result = getUserById(req.params.id);
    if (!result) {
      res.statusCode = 404;
      res.end('User not found');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  })
  .put('/users/:id', (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const { name, email } = JSON.parse(body);
      if (!name && !email) {
        res.statusCode = 400;
        res.end('No data provided');
        return;
      }
      const result = updateUser(req.params.id, name, email);
      if (!result) {
        res.statusCode = 404;
        res.end('User not found');
        return;
      }
      res.statusCode = 200;
      res.end('User updated successfully');
    });
  })
  .delete('/users/:id', (req, res) => {
    const result = deleteUser(req.params.id);
    if (!result) {
      res.statusCode = 404;
      res.end('User not found');
      return;
    }
    res.statusCode = 200;
    res.end('User deleted successfully');
  })
  .get('/users/:id/hobbies', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=3600');
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
    const result = getUserHobbies(req.params.id);
    if (!result) {
      res.statusCode = 404;
      res.end('User not found');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
  .post('/users/:id/hobbies', (req, res) => {
    let body = '';
  
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const hobby = JSON.parse(body).hobby;
      if (!hobby) {
        res.statusCode = 400;
        res.end('Hobby data not provided');
        return;
      }
      const result = addHobbyToUser(req.params.id, hobby);
      if (!result) {
        res.statusCode = 404;
        res.end('User not found');
      }
      res.statusCode = 200;
      res.end('Hobby added successfully');
    });
  })
  .delete('/users/:id/hobbies', (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const hobby = JSON.parse(body).hobby;
      if (!hobby) {
        res.statusCode = 400;
        res.end('Hobby data not provided');
        return;
      }
      const result = deleteHobbyFromUser(req.params.id);
      if (!result) {
        res.statusCode = 404;
        res.end('User not found');
      }
      res.statusCode = 200;
      res.end('Hobby deleted successfully');
    });
  });

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
