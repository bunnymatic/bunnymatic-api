import { Factory } from "rosie";
import faker from "faker";

export default new Factory()
  .sequence("id")
  .attrs({
    dimensions: faker.lorem.word(),
    file: faker.system.fileName,
    inserted_at: faker.date.recent().toDateString(),
    medium: faker.lorem.word(),
    price: faker.lorem.word(),
    title: faker.lorem.word(),
    year: faker.lorem.word(),
  });
