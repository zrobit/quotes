const fake = require('casual');
const slug = require('slugg');

exports.fakeAuthors = (n=1) => {
  return [...Array(n)].map(() => {
    return  {
      name: fake.full_name,
      bio: {
        avatar: '/assets/media/images/avatar.jpg',
        resume: fake.sentences(n = 5),
        meta:[...Array(4)].map(() => {
          return {
            label: fake.words(n=1),
            value: fake.words(n=2)
          }
        })
      }
    }
  })
}

exports.fakeQuotes = (n=1) => {
  return [...Array(n)].map(() => {
    return  {
      content: fake.sentences(n = 4),
      slug: slug(fake.sentence)
    }
  })
}

exports.fakeTags = (n=1) => {
  return [...Array(n)].map(() => {
    let name = fake.words(n = Math.random() < 0.5 ? 1 : 2);
    return  {
      name: name,
      slug: slug(name)
    }
  })
}
