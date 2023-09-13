import { NextFunction, Request, RequestHandler, Response } from "express";
import NoteModel from "../models/note-model";

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await NoteModel.find().exec();
    return res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
