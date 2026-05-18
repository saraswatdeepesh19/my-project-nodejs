import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users API Working");
});

export default router;
