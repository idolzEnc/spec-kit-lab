import express from "express";
import { rollRoutes } from "./routes/rollRoutes";
import { ApiError, toErrorResponse } from "./lib/errors";
import { logger, requestCorrelation } from "./lib/logger";

const app = express();

app.use(express.json());
app.use(requestCorrelation);
app.use(rollRoutes);

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json(toErrorResponse(err));
      return;
    }

    logger.error("unhandled_error", { error: err });
    res
      .status(500)
      .json({ errorCode: "UNEXPECTED_ERROR", message: "Unexpected error" });
  },
);

export default app;

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    logger.info("server_started", { port });
  });
}
