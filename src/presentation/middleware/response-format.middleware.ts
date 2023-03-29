import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../custom-response.interface';

@Injectable()
export class JsonMiddleware implements NestMiddleware {
  use(req: Request, res: Response & CustomResponse, next: NextFunction) {
    res.sendJson = (body: any) => {
      res.type('application/json');
      res.send({ success: true, data: body });
    };
    next();
  }
}
