import express from "express";
import next from "next";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
import bp from "body-parser";

import routerShopping from "./routes/shopping";

app.prepare().then(() => {
  const server = express();

  server.use(bp.json());
  server.use(bp.urlencoded({ extended: true }));

  server.use("/api/shopping", routerShopping);

  server.get("*/*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
