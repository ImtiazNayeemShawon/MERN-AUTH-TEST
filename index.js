const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
//middlewares

app.use(cookieParser());
app.use(express.json());

app.use(cors({ credentials: true, origin: "https://loquacious-dodol-b798c5.netlify.app/" }));

app.post("/login", async (req, res) => {
  try {
    const jwttoken = jwt.sign(req.body, "yourSecretKey");
    res
      .cookie("jwttoken", jwttoken)
      .status(200)
      .json("Cookie set successfully");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

app.get("/get", (req, res) => {
  try {
    const token = req.cookies.jwttoken;
    if (token) {
      const decoded = jwt.verify(token, "yourSecretKey");
      res.status(200).json({
        message: "Token verified",
        data: decoded,
      });
    } else {
      res.status(400).json("Invalid token");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong in server side",
      error: error,
    });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("jwttoken").status(200).json("Logout successful");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong during logout",
      error: error,
    });
  }
});
app.listen(8000, () => console.log("Server started on port 8000"));
