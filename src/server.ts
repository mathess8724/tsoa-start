import { app } from "./app";

const port = process.env.PORT || 3000;
const awsport = 5001;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);