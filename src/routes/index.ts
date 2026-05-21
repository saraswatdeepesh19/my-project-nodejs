import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;
  res.send({ title: "Express", query });
});

export default router;
