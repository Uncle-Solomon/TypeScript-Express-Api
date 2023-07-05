import express from "express";

import { getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUsers();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
