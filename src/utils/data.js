const fake = require('casual');
const slug = require('slugg');

exports.fakeAuthors = (n = 1) => {
  return [...Array(n)].map(() => {
    const resume = fake.sentences(n = 5);
    return {
      name: fake.full_name,
      meta: {
        title: 'Testing title',
        description: 'Testing description',
        og: {
          title: 'OG Testing title',
          description: 'Og Testing description'
        }
      },
      bio: {
        avatar: '/assets/media/images/avatar.jpg',
        resume,
        meta: [...Array(4)].map(() => {
          const label = fake.words(n = 1);
          const value = fake.words(n = 2);
          return {label, value};
        })
      }
    };
  });
};

exports.fakeQuotes = (n = 1) => {
  return [...Array(n)].map(() => {
    const content = fake.sentences(n = Math.floor((Math.random() * 8) + 1));
    return {
      content,
      slug: slug(fake.sentence),
      meta: {
        title: 'Testing title',
        description: 'Testing description',
        og: {
          title: 'OG Testing title',
          description: 'Og Testing description'
        }
      }
    };
  });
};

exports.fakeTags = (n = 1) => {
  return [...Array(n)].map(() => {
    const name = fake.words(n = Math.random() < 0.5 ? 1 : 2);
    return {
      name,
      slug: slug(name)
    };
  });
};
