var express = require('express');
var router = express.Router();
/* GET users listing. */
var userinfo = [{ user: 'admin', pwd: '123456' }, { user: 'wang', pwd: '111222' }];

function authentication(_user, _pwd) {
    for (i in userinfo) {
        if (userinfo[i].user == _user) {
            if (userinfo[i].pwd == _pwd) {
                return 0; //验证成功
            }
            return 1; //密码错误
        }
    }
    return 2; //没有该用户
}
router.get('/', function(req, res, next) {
    switch (authentication(req.query.user, req.query.pwd)) {
        case 0:
            res.end(JSON.stringify({ 'code': 'ok', 'msg': '欢迎' + req.query.user + "登录" }));
            break;
        case 1:
            res.end(JSON.stringify({ 'code': 'err', 'msg': 'password error' }));
            break;
        case 2:
            res.end(JSON.stringify({ 'code': 'err', 'msg': 'user not found' }));
            break;
        default:
            next();
            break;
    }
    console.log('返回结束');
});

module.exports = router;