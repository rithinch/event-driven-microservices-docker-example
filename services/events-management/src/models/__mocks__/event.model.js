/* eslint-disable arrow-body-style */

const eventModel = {};

let data = [];

eventModel.find = jest.fn(() => data);

eventModel.findById = jest.fn((id) => {
  return data.find(event => event.id === id);
});

eventModel.create = jest.fn((event) => {
  data.push(event);
  return event;
});

eventModel.findByIdAndUpdate = jest.fn((id, updatedEvent) => {
  const index = data.findIndex(event => event.id === id);
  if (index >= 0) {
    data[index] = updatedEvent;
  }
  return updatedEvent;
});

eventModel.findByIdAndRemove = jest.fn((id) => {
  const index = data.findIndex(event => event.id === id);
  data.splice(index, 1);
  return id;
});

eventModel.count = () => data.length;
eventModel.reset = () => { data = []; };

module.exports = eventModel;
