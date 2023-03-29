import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendJson: (body: any) => void;
    }
  }
}
