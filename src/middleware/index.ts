import express from "express";
import { get, identity, merge } from "lodash";

import { getUserbySessionToken } from "db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies("My-Auth");
    if (!sessionToken) {
      res.status(403);
    }

    const existingUser = await getUserbySessionToken(sessionToken);

    if (!existingUser) {
      res.status(403);
    }

    merge(req, { identity: existingUser });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
