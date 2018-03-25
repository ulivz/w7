import devServer from '../src/dev-server'

test('main', () => {
  expect(typeof devServer).toBe('function')
})
