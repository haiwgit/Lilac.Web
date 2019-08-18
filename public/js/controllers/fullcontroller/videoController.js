define([
    'index-module'
], function (app) {
    'use strict';
    app.controller('videoController', function ($scope, $sce, $stateParams) {
        $scope.viewModel = {}
        $scope.currentVideo = {
            text: "视频详情",
            _url: 'video/勇敢的心.mp4',
            get url() {
                return $scope.videoUrl(this._url);
            },
            set url(value) {
                this._url = value;
            },
            type: 'video/mp4'
        }
        $scope.videoUrl = function (url) {
            return $sce.trustAsResourceUrl(url);
        };
        var option = {
            "autoplay": false,
            "controls": true,
            height: 320,
            width: 490,
            "loop": false,
            poster: 'http://vjs.zencdn.net/v/oceans.png',
            "preload": "auto",
            // children: [
            //     // "mediaLoader",
            //     "posterImage",
            //     "textTrackDisplay",
            //     "loadingSpinner",
            //     "bigPlayButton",
            //     "controlBar",
            //     "errorDisplay",
            //     "textTrackSettings",
            //     "resizeManager",
            // ],
            // ControlBar:{//控制条
            //     PlayToggle:{}
            // }

        };
        var palyer;

        function initvideo() {
            palyer = $scope.palyer = videojs("my-video", option, function () {
                this.on('play', function () {
                    console.log('start')
                });
                this.on('pause', function () {
                    console.log('zt');
                });

                this.on('ended', function () {
                    this.pause();
                });
                this.on('timeupdate', function () {
                    console.log('geg')
                })
            })
        }

        $scope.initMe = function () {
            $scope.palyer = null;
            initvideo();
        }
    })
});