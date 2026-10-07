

import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Movie Watchlist API is running",
    });
});

export default app;