import { errorpage } from '../404';
const error = new errorpage();

test('create 404 page', () => {
  expect(error).not.toBeNull();
  expect(document.body.childNodes[0].nodeName).not.toBeNull();
});
