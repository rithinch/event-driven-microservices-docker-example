/* eslint-disable arrow-body-style */

const userModel = {};

let data = [];

userModel.find = jest.fn(() => data);

userModel.findById = jest.fn((id) => {
  return data.find(user => user.id === id);
});

userModel.create = jest.fn((user) => {
  data.push(user);
  return user;
});

userModel.findByIdAndUpdate = jest.fn((id, updateduser) => {
  const index = data.findIndex(user => user.id === id);
  if (index >= 0) {
    data[index] = updateduser;
  }
  return updateduser;
});

userModel.findByIdAndRemove = jest.fn((id) => {
  const index = data.findIndex(user => user.id === id);
  data.splice(index, 1);
  return id;
});

userModel.count = () => data.length;
userModel.reset = () => { data = []; };

module.exports = userModel;
