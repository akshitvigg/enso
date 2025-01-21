import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface JwtPayload {
  userId: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? "";
  const decryptedToken = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

  if (decryptedToken) {
    req.userId = decryptedToken.userId;
    next();
  } else {
    res.json({
      message: "unauthorized",
    });
  }
};
