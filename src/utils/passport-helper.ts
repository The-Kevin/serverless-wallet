import passport from 'passport';
import passportJwt from 'passport-jwt';

export interface TokenData {
  _id: string;
}

const JWT_AUDIENCE = '';
const JWT_ISSUER = '';
const JWT_SECRET = process.env.JWT_SECRET;

const jwtOpts = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE,
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
