import Dog from './dog'

test('Dog.bark', () => {
  const testDog = new Dog('Test')
  expect(testDog.bark()).toBe('Wah wah, I am Test')
})

test('Dog.bark', () => {
  const testDog = new Dog('Morty')
  expect(testDog.bark()).toBe('Wah wah, I am Morty')
})
