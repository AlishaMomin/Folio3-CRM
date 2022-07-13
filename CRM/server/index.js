const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");


const adapter = new FileSync("db.json");
const db = low(adapter);


db.defaults({ books: [] }).write();
const booksRouter = require("./routes/books");
const optionOpenAPI = require("./openapi.json")

const app = express();
app.db = db;
const port = process.env.PORT || 3001;
const swaggerDocs = swaggerJsDoc(optionOpenAPI);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/books", booksRouter);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
