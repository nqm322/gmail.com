const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Определение схемы данных пользователя
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Создание модели пользователя
const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Роут для сохранения данных пользователя в базу данных
app.post("/", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Ошибка при сохранении пользователя в базу данных");
    } else {
      res.send("Данные пользователя успешно сохранены в базе данных");
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
