

import express from "express";
import authRoutes from "./auth/routes/auth.routes.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
    res.json({
        message: "Movie Watchlist API is running",
    });
});

export default app;