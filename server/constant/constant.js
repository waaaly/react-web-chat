// const crypto = require('crypto');

module.exports = {
  // MD5_SUFFIX: 'luffyZhouNodeCrawler我是一个固定长度的盐值',
  // md5: pwd => {
  //   let md5 = crypto.createHash('md5');
  //   return md5.update(pwd).digest('hex');
  // },
  secretKey: 'wechatroom_jwttoken',
  avatarGetAddr: 'http://1.12.246.138:4000/avatar',
  // avatarGetAddr: 'http://139.186.70.223:4000/avatar',
  avatarLocalAddr: './static/avatar',
  facebagLocalAddr:'./static/facebag',
  exitPath: [
    '/login',
    '/register',
    '/'
  ]
};
