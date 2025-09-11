// controllers/bookController.js
const db = require("../models");
const Book = db.Book;
const Author = db.Author;
const Publisher = db.Publisher;

const validateBook = require("../validators/validateBook")

const createBook = async (req, res) => {
  const {
    title, type, category, amount,
    published_date, description, cover_image,
    authors, publishers
  } = req.body;

  // ตรวจสอบข้อมูลที่ client ส่งมา
  const { valid, errors } = validateBook(req.body);
  if (!valid) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    // 1. สร้างหนังสือ
    const newBook = await Book.create({
      title,
      type,
      category,
      amount,
      published_date,
      description,
      cover_image,
    });

    // 2. ผูก author
    for (const authorData of authors) {
      const [author] = await Author.findOrCreate({
        where: { email: authorData.email },
        defaults: {
          firstname: authorData.firstname,
          lastname: authorData.lastname,
        },
      });
      await newBook.addAuthor(author);
    }

    // 3. ผูก publisher
    for (const pubData of publishers) {
      const [publisher] = await Publisher.findOrCreate({
        where: { email: pubData.email },
        defaults: {
          pub_name: pubData.pub_name,
          phone: pubData.phone,
          address: pubData.address,
        },
      });
      await newBook.addPublisher(publisher);
    }

    // 4. รวมข้อมูลทั้งหมดเพื่อตอบกลับ
    const fullBook = await Book.findByPk(newBook.book_id, {
      include: [
    {
      model: Author,
      as: "authors",
      through: { attributes: [] } // ❌ ไม่เอา BookAuthor กลับมา
    },
    {
      model: Publisher,
      as: "publishers",
      through: { attributes: [] } // ❌ ไม่เอา BookPublisher กลับมา
    }
  ]
    });

    res.status(201).json(fullBook);
  } catch (err) {
    res.status(500).json({ message: 'Create book failed', error: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Author,
          as: "authors",
          through: { attributes: [] }, // ✅ ไม่เอาข้อมูลจาก BookAuthor
          attributes: ["author_id", "email", "firstname", "lastname"], // ✅ เลือกเฉพาะฟิลด์ที่ต้องการ
        },
        {
          model: Publisher,
          as: "publishers",
          through: { attributes: [] }, // ✅ ไม่เอาข้อมูลจาก BookPublisher
          attributes: [
            "pub_id",
            "email",
            "phone",
            "address",
            "pub_name",
          ],
        },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Author,
          as: "authors",
          through: { attributes: [] }, // ✅ ไม่เอาข้อมูลจาก BookAuthor
          attributes: ["author_id", "email", "firstname", "lastname"], // ✅ เลือกเฉพาะฟิลด์ที่ต้องการ
        },
        {
          model: Publisher,
          as: "publishers",
          through: { attributes: [] }, // ✅ ไม่เอาข้อมูลจาก BookPublisher
          attributes: [
            "pub_id",
            "email",
            "phone",
            "address",
            "pub_name",
          ],
        },
      ],
    });
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });

    await book.update(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });

    await book.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

const deleteBookAll = async (req, res) => {
  try {
    await Book.destroy({ where: {} }); // ลบทั้งหมด
    res.json({ message: "Deleted all books successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteBookAll,
};
