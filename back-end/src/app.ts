import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import noteRoutes from "./routes/note-routes";

const app = express();

app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Endpoint not found :("));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "an unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({
    error: errorMessage,
  });
});

export default app;
