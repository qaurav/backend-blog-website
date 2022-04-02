const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "pictures");
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpeg");
    },
});


const upload = multer({storage:storage});
app.post("backend_blog_website/upload", upload.single("file"), (req,res) => {
    res.status(200).json("file has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

app.listen(80, () => {
    console.log("Backend is running")
})