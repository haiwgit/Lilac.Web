define([
    'index-module', 'd3', 'routerService', 'dialog', 'messager',
    'ctrls/indexManager/picManger/userController'
], function (app, d3) {
    'use strict';
    app.controller('indexController', function ($scope, $interval, $cookies, $window, $http, routerService, dialog, messager) {
        $scope.slides = [];
        var radius = 30; var toothRadius = 3; var holeRadius = 5; var speed = 2; var timeFrame; var timeLoad;

        $scope.slides.push({ imgUrl: '/images/index/carousel/1.jpg', ContenURL: "", ID: 13, text: '亲爱的你，情人节快乐' });
        $scope.slides.push({ imgUrl: '/images/index/carousel/2.jpg', ContenURL: "", ID: 131, text: '亲爱的你，情人节快乐' });
        $scope.slides.push({ imgUrl: '/images/index/carousel/3.jpg', ContenURL: "", ID: 1314, text: '亲爱的你，情人节快乐' });
        $scope.changeData = function (item) {

        }
        $scope.news = [];
        $scope.news.push({ TEXT: '程序员成功研发去马赛克神器 高清无码效果感人', ID: 1 });
        $scope.news.push({ TEXT: 'IDC：全球智能手机出货量连续四个季度下滑', ID: 2 });
        $scope.news.push({ TEXT: '手机电池进步太慢，iPhoneXS续航还比不上iP', ID: 3 });
        $scope.news.push({ TEXT: '为什么你的手机信号突然变差了', ID: 4 });
        $scope.news.push({ TEXT: 'Surface性能飙升 微软新品发布会重点都有啥', ID: 5 });
        $scope.news.push({ TEXT: '新一代Kindle发布 这些亮点能否激起你的购买欲', ID: 6 });
        $scope.news.push({ TEXT: '联想入局滑盖全面屏手机竞争 概念股普涨', ID: 7 });
        $scope.news.push({ TEXT: '荣耀Magic2携智慧生命体YOYO，普通人也能当', ID: 8 });
        $scope.news.push({ TEXT: '谷歌目前还无法解决Android碎片化问题', ID: 9 });
        $scope.news.push({ TEXT: '微软发首款Surface耳机:支持降噪随时唤醒', ID: 10 });
        $scope.news.push({ TEXT: '谷歌安卓App新规生效：老应用该更新了', ID: 11 });
        $scope.showNews = function (parm) {
            var temp = {
                templateUrl: '/template/indexManager/picManger/userinfo.html',
                controller: 'userController',
                animation: true,
                backdrop: 'static',
                width: 500,
                data: parm,
                type: 'news'
            }
            $scope.newView();
        }
        $scope.newView = function (temp) {
            var moal = dialog.open({
                templateUrl: temp.templateUrl,
                controller: temp.controller,
                animation: true,
                backdrop: 'static',
                width: temp.width,
                resolve: {
                    items: function () {
                        return temp.data
                    }
                }
            })
            moal.result.then(function (res) {
            });
        }
        $scope.conform = function () {
            messager.confirm("确认是否继续", function () {
                alert(1)
            })
        }
        $scope.alert = function () {
            messager.alert("输出提示消息")
        }
        $scope.error = function () {
            messager.error('错误信息');
        }
        $scope.redirect = function (item, code) {
            routerService.go({
                parem: item,
                rate: "/" + item,
                moduleCode: code
            }, { id: 0, type: 12 });
        }
        $scope.initMe = function () {
            initGear();
            initLoad();
            initCanvas();
        }
        function initGear() {
            var svgFull = document.getElementById("gear");
            var W = svgFull.clientWidth;
            var H = svgFull.clientHeight;
            var start = Date.now();
            var x = Math.sin(2 * Math.PI / 3);
            var y = Math.cos(2 * Math.PI / 3);
            var framePath = [
                { fill: "#c6dbef", teeth: 60, radius: -radius * 5, origin: [0, 0], annulus: true },
                { fill: "#6baed6", teeth: 12, radius: radius, origin: [0, 0] },
                { fill: "#9ecae1", teeth: 24, radius: -radius * 2, origin: [0, -radius * 3] },
                { fill: "#9ecae1", teeth: 24, radius: -radius * 2, origin: [-radius * 3 * x, -radius * 3 * y] },
                { fill: "#9ecae1", teeth: 24, radius: -radius * 2, origin: [radius * 3 * x, -radius * 3 * y] }
            ]
            // var frameRadius = H > W ? (W / 2) : H / 2;
            var frameRadius = Math.min(W, H) / 2;
            var svg = d3.select("#gear")
                .append("svg")
                .attr("width", W)
                .attr("height", H)
                .style("background", "#fff");  //
            var frame = svg.append("g")
                .attr("transform", "translate(" + W / 2 + "," + H / 2 + ")")
                .append("g").datum({ radius: +frameRadius });
            var path = frame.selectAll("g").data(framePath).join("g")
                .attr("transform", function (d) {
                    return "translate(" + d.origin + ")"
                })
                .append("path")
                .attr("stroke", "black")
                .attr("fill", function (d) {
                    return d.fill
                })
                .attr("d", gear);
            d3.interval(function () {
                var angle = (Date.now() - start) * speed;
                var transform = function (d) {
                    return 'rotate(' + angle / d.radius + ')';
                };
                path.attr("transform", transform);
                frame.attr("transform", transform);
                svg.node();
            }, 100)
        };
        function gear({ teeth, radius, annulus }) {
            var n = teeth;
            var r2 = Math.abs(radius);
            var r0 = r2 - toothRadius;
            var r1 = r2 + toothRadius;
            var r3 = holeRadius;
            if (annulus) r3 = r0, r0 = r1, r1 = r3, r3 = r2 + toothRadius * 3;
            var da = Math.PI / n;
            var a0 = -Math.PI / 2 + (annulus ? Math.PI / n : 0);
            var path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
            var i = -1;
            while (++i < n) { // TODO Template literal.
                path.push(
                    "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
                    "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
                    "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
                    "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
                    "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
                    "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)
                );
            }
            path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
            return path.join("");
        }
        function initLoad() {
            var svgFull = document.getElementById("loadId");
            var compute = d3.interpolate(d3.rgb(255, 0, 0), d3.rgb(0, 255, 0));
            var W = svgFull.clientWidth;
            var H = svgFull.clientHeight;
            var R = Math.min(W, H) / 2 - 15;
            var r = 6;
            var start = Date.now();
            //默认背景圆环
            var arcGenerator = d3.arc().innerRadius(R - r * 2).outerRadius(R).startAngle(0);
            //开始的半角
            var sPoiot = d3.arc()
                .outerRadius(r)
                .innerRadius(0)
                .startAngle(Math.PI)
                .endAngle(2 * Math.PI);
            var ePoiot = d3.arc()
                .outerRadius(r)
                .innerRadius(0)
                .startAngle(0)
                .endAngle(2 * Math.PI);
            //时空
            var spacetime = d3.select("#loadId");
            //空间
            var svg = spacetime.append("svg")
                .attr("width", W)
                .attr("height", H)
                //.style("background", "#fff");  //
                .append("g")
                .attr("transform", "translate(" + W / 2 + "," + H / 2 + ")");
            var dataText = svg.append("g").append('text')
                .text(0 + "%")
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '38px')
            //圆环
            var backGround = svg.append("path")
                .datum({ endAngle: 2 * Math.PI })
                .style("fill", "#FFC125")
                .attr("d", arcGenerator);
            //圆环开始半圆sPoiot
            var parStart = svg.append("path")
                .attr("class", "parStart")
                .datum({ startAngle: 0, endAngle: 2 * Math.PI })
                .style("fill", "#2394F5")
                .attr("d", sPoiot)
                .attr("transform", "translate(0," + -(R - r) + ")");
            //已经加载
            var upperGround = svg.append('path')
                .datum({ endAngle: 0 })
                .style('fill', '#2394F5')
                .attr('d', arcGenerator);
            //圆环开始半圆ePoiot
            var parEnd = svg.append("path")
                .attr("class", "parEnd")
                .datum({ endAngle: 2 * Math.PI, startAngle: 0 })
                .style("fill", "#2394F5")
                .attr("d", ePoiot)
                .attr("transform", "translate(0," + -(R - r) + ")");
            function getAngle(angle) {
                var num = parseInt(angle / (2 * Math.PI));
                return angle - (2 * Math.PI * num)
            }

            var colorLinear1 = d3.scaleLinear().domain([0, 2 * Math.PI]).range(["#BDF436", "#2394F5"]);
            var colorLinear2 = d3.scaleLinear().domain([0, 2 * Math.PI]).range(["#2394F5", "#BDF436"]);
            var index = 0;
            d3.interval(function () {
                parStart.transition().duration(10).attrTween('d', function (d) {
                    var rl = (R - r);
                    var compute1 = d3.interpolate(d.startAngle, getAngle(d.startAngle + 2 * Math.PI / 360));
                    var compute2 = d3.interpolate(d.endAngle, getAngle(d.endAngle + 2 * Math.PI / 360));
                    return function (t) {
                        d.startAngle = compute1(t);
                        d.endAngle = compute2(t);
                        return sPoiot(d);
                    }
                }).styleTween('fill', function (d) {
                    return function (t) {
                        var data = d.startAngle;
                        //返回数值对应的色值
                        if ((index / 360) % 2 == 0) {
                            //返回数值对应的色值
                            return colorLinear1(data);
                        } else {
                            //返回数值对应的色值
                            return colorLinear2(data);
                        }
                    }
                })
                parEnd.transition().duration(10).attrTween('d', function (d) {
                    var rl = (R - r);
                    var compute1 = d3.interpolate(d.startAngle, getAngle(d.startAngle + 2 * Math.PI / 360));
                    var compute2 = d3.interpolate(d.endAngle, getAngle(d.endAngle + 2 * Math.PI / 360));
                    d3.select(".parEnd").attr("transform", "translate(" + rl * Math.sin(d.startAngle) + "," + -rl * Math.cos(d.startAngle) + ")")
                    d3.select('text').text((getAngle(d.startAngle) / (2 * Math.PI) * 100).toFixed(2) + '%').attr("fill", colorLinear2(d.startAngle));
                    return function (t) {
                        d.startAngle = compute1(t);
                        d.endAngle = compute2(t);
                        return ePoiot(d);
                    }
                }).styleTween('fill', function (d) {
                    return function (t) {
                        var data = d.startAngle;
                        //返回数值对应的色值
                        if ((index / 360) % 2 == 0) {
                            //返回数值对应的色值
                            return colorLinear1(data);
                        } else {
                            //返回数值对应的色值
                            return colorLinear2(data);
                        }
                    }
                })
                upperGround.transition().duration(10).attrTween('d', function (d) {
                    var compute = d3.interpolate(d.endAngle, getAngle(d.endAngle + 2 * Math.PI / 360));
                    return function (t) {
                        d.endAngle = compute(t);
                        return arcGenerator(d);

                    }
                }).styleTween('fill', function (d) {
                    return function (t) {
                        var data = d.endAngle;
                        if ((index / 360) % 2 == 0) {
                            //返回数值对应的色值
                            return colorLinear1(data);
                        } else {
                            //返回数值对应的色值
                            return colorLinear2(data);
                        }
                    }
                });
                index++;
                if (index > 2 * 360) {
                    index = 0;
                }
            }, 100)
        }
        function initCanvas() {
            var cDiv = document.getElementById("myCanvas");
            var context = cDiv.getContext("2d");
            draw1(context,300,300,1.7);
            var f = document.getElementById("Canvas");
            var cx = f.getContext("2d");
            draw2(cx,300,300,1.7);
        }
        function draw1(c, w, h, r) {
            c.fillStyle = "#red";
            c.strokeStyle = "red";//填充边框颜色
            // c.lineWidth=1;
            for(var i=0;i<w;i++){
                for(var j=0;j<h;j++){
                    //c.fillRect(i*r, j*r, r, r);
                    c.strokeRect(i*r, j*r, r, r);//对边框的设置
                }
            }
            
           
        }
        function draw2(c, w, h, r) {
            c.scale(r,r)
            //c.fillStyle = "red"; 
            c.strokeStyle = "red";//填充边框颜色
            // c.lineWidth=1;
            for(var i=0;i<w;i++){
                for(var j=0;j<h;j++){
                    //c.fillRect(i, j, 1, 1);
                    c.strokeRect(i, j, 1, 1);//对边框的设置
                }
            }
            
           
        }
    })
});