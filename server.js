import { app } from "./app.js";

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8800;
const url =
  process.env.NODE_ENV === "production"
    ? "https://agency-client-crud-backend.onrender.com"
    : `http://localhost:${port}`;
app.listen(process.env.PORT, () => console.log(`Server is running at ${url}`));
