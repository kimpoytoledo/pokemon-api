import { Response } from 'express';

export interface CustomResponse extends Response {
  sendJson(body: any): any;
}
