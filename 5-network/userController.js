import { users } from './users-data.js';

export const getUserById = (userId) => {
  const searchedUser = users.find(u => u.id === +userId);

  if (!searchedUser) {
    return;
  }

  const { id, name, email } = searchedUser;
  const links = [{
    rel: 'hobbies',
    href: `/users/${id}/hobbies`,
    method: 'GET',
    description: 'Retrieve the list of hobbies for this user',
  }];

  return {id, name, email, links};
}

export const updateUser = (userId, name, email) => {
  const searchedUser = users.find(u => u.id === +userId);

  if (!searchedUser) {
    return;
  }

  users.forEach((user, i) => {
    if (user.id == userId) {
      users[i] = {...user, name, email};
    }
  });
  return true;
}

export const deleteUser = (userId) => {
  const userIndex = users.findIndex(u => u.id === +userId);

  if (userIndex === -1) {
    return;
  }

  users.splice(userIndex, 1);
  return true;
}

export const getUserHobbies = (userId) => {
  const user = users.find(u => u.id === +userId);

  if (!user) {
    return;
  }

  return user.hobbies || [];
}

export const addHobbyToUser = (userId, hobby) => {
  const user = users.find(u => u.id === +userId);
  if (!user) {
    return false;
  }
  user.hobbies = user.hobbies || [];
  user.hobbies.push(hobby);

  return true;
}

export const deleteHobbyFromUser = (userId) => {
  const user = users.find(u => u.id === +userId);
  if (!user) {
    return;
  }
  user.hobbies = user.hobbies || [];
  user.hobbies = user.hobbies.filter(h => h !== hobby);

  return true;
}
