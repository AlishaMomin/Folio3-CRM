const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// check 1111
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const companyRouter = require("./routes/company");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

const optionOpenAPI = require("./openapi.json")

const app = express();
app.db = db;
const port = process.env.PORT || 3001;
const swaggerDocs = swaggerJsDoc(optionOpenAPI);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/Role", rolesRouter);
app.use("/User", usersRouter);
app.use("/Company", companyRouter);
app.use("/Product", productRouter);
app.use("/Order", orderRouter);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});