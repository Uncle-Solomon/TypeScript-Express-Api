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

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "An input field is empty" });
    }

    const user = await getUserbyEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      res.status(400).json({
        error: "The user doesn't exist, try registering the user again",
      });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password != expectedHash) {
      res.status(400);
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    res.cookie("My-Auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
