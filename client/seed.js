// On importe la version spécifique "en" (English) de faker
import { faker as faker } from '@faker-js/faker'; 
import fs from 'fs';

const generateData = () => {
  const testimonials = [];

  for (let i = 1; i <= 3; i++) {
    testimonials.push({
      id: i,
      name: faker.person.firstName(), 
      role: "ALINÉA MEMBER",
      text: faker.lorem.sentences(2), 
    });
  }

  const database = { testimonials };

  if (!fs.existsSync('./src/data')) {
    fs.mkdirSync('./src/data', { recursive: true });
  }

  fs.writeFileSync('./src/data/db.json', JSON.stringify(database, null, 2));
  console.log("✅ Success: English testimonials (first names only) generated!");
};

generateData();