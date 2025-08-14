import type { Request, Response,NextFunction } from "express";
export const logger=((req:Request,_:Response,next:NextFunction) =>{
    req.Date = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path, req.time);
    next();
});