define([
    'index-module'
], function (app) {
    'use strict';
    app.controller('videoController', function ($scope, $sce) {
        $scope.viewModel = {

        }
        $scope.currentVideo = {
            Text: "视频详情",
            URL: 'video/勇敢的心.mp4'
        }
        $scope.videoUrl = function (url) {
            return $sce.trustAsResourceUrl(url);
        };
        var option = {
            autoplay: false,
            controls: true,
            height: 320,
            width: 490,
            loop: false,
            poster: "http://vjs.zencdn.net/v/oceans.png",
            preload: "auto",
            children: [
                'bigPlayButton',
                'controlBar'
            ],
            sources: [{
                src: 'http://vjs.zencdn.net/v/oceans.mp4',//$scope.videoUrl('video/勇敢的心.mp4'),
                type: 'video/mp4'
            }],
            controlBar: {
                muteToggle: false,
                captionsButton: false,
                chaptersButton: false,
                playbackRateMenuButton: true,
                LiveDisplay: true,
                subtitlesButton: false,
                remainingTimeDisplay: true,

                progressControl: true,

                volumeMenuButton: {
                    inline: false,
                    vertical: true
                },//竖着的音量条
                fullscreenToggle: true
            }
        };
        var palyer=$scope.palyer = videojs("myVideo", option, function() {
            videojs.log('播放器已经准备好了!');
            this.play();

            this.on('ended', function () {
                videojs.log('播放结束了!');
            });
        })
    })
});