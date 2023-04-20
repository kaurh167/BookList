const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const url =
  "mongodb+srv://gillkaur268myfoodapp:9vTcF5eXHm69deVT@cluster0.aerew49.mongodb.net/bookList?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const DataB = new mongoose.Schema({
  title: String,
  author: String,
  description:String
});

const Books = mongoose.model("300358558-Harmanpreet", DataB);



router.route("/").get((req, res) => {
  Books.find().then((data) => res.json(data));
});

router.route("/add").post((req, res) => {
  const DataB = req.body;
  console.log(DataB);

  const book = new Books(DataB);

  book
    .save()
    .then(() => res.json("It has been added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Books.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
router.route("/update/:id").put((req, res) => {
  Books.findById(req.params.id)
    .then((book) => {
      book= req.body;
      console.log(book)
      
     
        Books.findByIdAndUpdate(req.params.id,book)
        .then(() => res.json("Todo updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Books.findByIdAndDelete(req.params.id)
  .then(() => res.json("Deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

app.use(cors());
app.use(express.json());
app.use("/bookList", router);
app.listen(5000, () => {
  console.log("Running on port 5000");
});
