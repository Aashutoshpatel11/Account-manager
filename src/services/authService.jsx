const DB_KEY = 'users';


const getUsers = () => {
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
};


const saveUsers = (users) => {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
};


export const authService = {
  // REGISTER
  register: (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const userExists = users.find((user) => user.email === email);

        if (userExists) {
          reject(new Error('User with this email already exists.'));
        } else {
          const newUser = { id: Date.now(), name, email, password }; // Never store passwords in plain text!
          users.push(newUser);
          saveUsers(users);
          const { password: _, ...userToReturn } = newUser;
          resolve(userToReturn);
        }
      }, 1000);
    });
  },

  // LOGIN
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          const { password: _, ...userToReturn } = user;
          resolve(userToReturn);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 1000);
    });
  },

  // UPDATE
  update: (userId, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex > -1) {
          users[userIndex] = { ...users[userIndex], ...updateData };
          saveUsers(users);
          const { password: _, ...userToReturn } = users[userIndex];
          resolve(userToReturn);
        } else {
          reject(new Error('User not found.'));
        }
      }, 1000);
    });
  },
};