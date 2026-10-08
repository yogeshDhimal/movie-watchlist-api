

import express from "express";
import authRoutes from "./auth/routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
    res.json({
        message: "Movie Watchlist API is running",
    });
});

export default app;