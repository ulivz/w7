import devServer from '../src'

test('main', () => {
  expect(typeof devServer).toBe('function')
})
