var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: '个人网站-登录'});
});
router.get('/index', function (req, res, next) {
    res.render('index', {title: '个人网站-主页'});
});
router.get('/login', function (req, res, next) {
    res.render('login', {title: '个人网站-登录'});
});
router.get('/error', function (req, res, next) {
    res.render('error', {title: '个人网站-错误'});
});
router.get('/timedout', function (req, res, next) {
    res.render('timedout', {title: '个人网站-超时'});
});
module.exports = router;
