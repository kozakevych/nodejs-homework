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
    getAllUsers(req, res);
  })
  .post('/users', (req, res) => {
    createUser(req, res);
  })
  .get('/users/:id', (req, res) => {
    const userId = req.params.id;
    getUserById(req, res, userId);
  })
  .put('/users/:id', (req, res) => {
    const userId = req.params.id;
    updateUser(req, res, userId);
  })
  .delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    deleteUser(req, res, userId);
  })
  .get('/users/:id/hobbies', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=3600');
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
    const userId = req.params.id;
    getUserHobbies(req, res, userId);
  })
  .post('/users/:id/hobbies', (req, res) => {
    const userId = req.params.id;
    addHobbyToUser(req, res, userId);
  })
  .delete('/users/:id/hobbies', (req, res) => {
    const userId = req.params.id;
    deleteHobbyFromUser(req, res, userId);
  });

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
