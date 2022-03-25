import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, OAuth } from '../db/models/User';

const config = {
  clientID: '557898764993-m4919nhfs6d07uspbtianuh6ilfr60n4.apps.googleusercontent.com',// clientId 설정하기
  clientSecret:'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', // clientSecret 설정하기
  callbackURL: "/auth/google/callback"
};

async function findOrCreateUser({ name, email }) {
  const user = await User.findByEmail({
    email,
  });

  if (user) { 
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: 'GOOGLE_OAUTH',
    role,
  });

  return created;
}

export default new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
  const { email, name } = profile._json;

  try {
    const user = await findOrCreateUser({ email, name })
    done(null, {
      shortId: user.shortId,
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    done(e, null);
  }
});