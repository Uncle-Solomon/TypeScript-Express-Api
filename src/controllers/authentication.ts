import { createUser, getUserbyEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ error: "An input field is empty" });
    }

    const existingUser = await getUserbyEmail(email);

    if (existingUser) {
      res.status(400).json({ error: "The user already exists" });
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    res.status(200).json({ user }).end();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
