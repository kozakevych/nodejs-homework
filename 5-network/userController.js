import { users } from './users-data.js';

export const getUserById = (req, res, userId) => {
  const searchedUser = users.find(u => u.id === +userId);

  if (searchedUser) {
    const { id, name, email } = searchedUser;
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({id, name, email}));
  } else {
    res.statusCode = 404;
    res.end('User not found');
  }
}

export const updateUser = (req, res, userId) => {
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

    const searchedUser = users.find(u => u.id === +userId);

    if (searchedUser) {
      users.forEach((user, i) => {
        if (user.id == userId) {
          users[i] = {...user, name, email};
        }
      });
      res.statusCode = 200;
      res.end('User updated successfully');
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  });
}

export const deleteUser = (req, res, userId) => {
  const userIndex = users.findIndex(u => u.id === +userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.statusCode = 200;
    res.end('User deleted successfully');
  } else {
    res.statusCode = 404;
    res.end('User not found');
  }
}

export const getUserHobbies = (req, res, userId) => {
  const user = users.find(u => u.id === +userId);

  if (user) {
    const hobbies = user.hobbies || [];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(hobbies));
  } else {
    res.statusCode = 404;
    res.end('User not found');
  }
}

export const addHobbyToUser = (req, res, userId) => {
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

    const user = users.find(u => u.id === +userId);
    if (user) {
      user.hobbies = user.hobbies || [];
      user.hobbies.push(hobby);

      res.statusCode = 200;
      res.end('Hobby added successfully');
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  });
}

export const deleteHobbyFromUser = (req, res, userId) => {
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
    const user = users.find(u => u.id === +userId);
    if (user) {
      user.hobbies = user.hobbies || [];
      user.hobbies = user.hobbies.filter(h => h !== hobby);

      res.statusCode = 200;
      res.end('Hobby deleted successfully');
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  });
}
