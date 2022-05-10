import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Server as HTTPServer } from "http";
import { GlobalSettings } from "./utils/GlobalSettings";
import app from "./app";
import Logger from "./utils/Logger";

const httpServer = new HTTPServer(app);

mongoose.set("useFindAndModify", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect(GlobalSettings.database.connectionString, (err) => {
    if (!err) {
        httpServer.listen(GlobalSettings.app.port, () => {
            console.log("API SERVER IS LISTENING ON PORT ", GlobalSettings.app.port);
        });
    } else {
        console.log("Mongodb connection error ", err);
        Logger.error("Failed to connect to the database. Exiting App", err);
        process.exit(1);
    }
});
