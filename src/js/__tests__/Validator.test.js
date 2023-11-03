import Validator from '../Validator';

const received = {
  latitude: '51.50851',
  longitude: '-0.12572',
};

test('testing value without space', () => {
  expect(Validator.check('51.50851,-0.12572')).toEqual(received);
});

test('testing value with space', () => {
  expect(Validator.check('51.50851, -0.12572')).toEqual(received);
});

test('testing value with square brackets', () => {
  expect(Validator.check('[51.50851,-0.12572]')).toEqual(received);
});
