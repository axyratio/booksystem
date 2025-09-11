const db = require('../models');

const defaultBooks = [
  { title: "Basic Book", type: "printed" },
  { title: "Starter eBook", type: "ebook" }
];

const syncBook = async ()  => {
for (const book of defaultBooks) {
  const [bookInstance, created] = await db.Book.findOrCreate({
    where: { title: book.title },
    defaults: {
      type: book.type,
      amount: 0,
      category: "fiction",
      published_date: new Date(),
      description: "Default description",
      cover_image: ""
    }
  });

  if (created) {
    console.log(`✅ Book '${book.title}' created`);
  }
}
}


module.exports = syncBook;

