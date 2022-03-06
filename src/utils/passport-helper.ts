import passport from 'passport';
import passportJwt from 'passport-jwt';

export interface TokenData {
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

const jwtOpts = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const usePassport = (): void => {
  const jwtStrategy = new passportJwt.Strategy(
    jwtOpts,
    async (payload: { _id: string }, done: passportJwt.VerifiedCallback) => {
      return done(null, payload);
    },
  );

  passport.use(jwtStrategy);
};
