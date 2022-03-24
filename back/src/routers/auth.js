import { Router } from 'express';
import { authenticate } from 'passport';
import { util } from '../common/utils';

const router = Router();

router.post('/', authenticate('local', { session: false }), (req, res, next) => {
  util.setUserToken(res,req.user);
  res.redirect('/');
});

router.get('/google', authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', authenticate('google', { session: false }), (req, res, next) => {
  util.setUserToken(res,req.user);//setUserToken설정하기
  res.redirect('/');
});

module.exports = router;