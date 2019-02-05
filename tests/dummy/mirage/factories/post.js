import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title: faker.lorem.sentance,
  body: faker.lorem.paragraphs,
  createdAt: faker.date.past,
  summary: faker.lorem.sentances
});
