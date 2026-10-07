

import "dotenv/config";
import app from "./app.js";
import { AppDataSource } from "./config/data-source.js";

const PORT = process.env.PORT;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });