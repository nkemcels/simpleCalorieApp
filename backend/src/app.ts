import express, { Request } from "express";
import cors from "cors";
import { NotFoundError } from "./errorTypes/NotFoundErrror";
import { errorHandler } from "./middlewares/errorHandler";
import apiV1Router from "./services";

const app = express();

app.use(cors());

app.use(
    express.json({
        limit: "500mb",
        verify: function (req: Request, res, buf) {
            req.rawBody = buf;
        },
    })
);

app.use(
    express.urlencoded({
        limit: "500mb",
        extended: true,
        verify: function (req: Request, res, buf) {
            req.rawBody = buf;
        },
    })
);

// register app routes
app.use("/api/v1", apiV1Router);

// for any unhandled routes, throw a 404 response
app.all("*", () => {
    throw new NotFoundError();
});

// report thrown errors
app.use(errorHandler);

export default app;
