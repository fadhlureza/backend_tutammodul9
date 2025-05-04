const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/user', require('./src/routes/user.route'));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const cors = require("cors");
const corsOptions = {
  origin: "https://os.netlabdte.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));