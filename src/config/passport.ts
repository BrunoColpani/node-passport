import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "../models/User";

const notautorizedJson = { status: 401, message: "Não autorizado" };

// here configure your passport strategy
passport.use(
  new BasicStrategy(async (email, password, done) => {
    if (email && password) {
      const user = await User.findOne({
        where: { email, password },
      });
      if (user) {
        return done(null, user);
      }
    }
    return done(notautorizedJson, false);
  })
);

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authFunction = passport.authenticate("basic", (err, user) => {
    req.user = user;
    return user ? next() : next(notautorizedJson);
    /*
    if (user) {
      next();
    } else {
      next(notautorizedJson);
    }
    */
  })(req, res, next);
};

export default passport;
