/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('mapboxDirective', [])
    .directive('mapbox', function ($q) {
        return {
            restrict: "EA",
            replace: true,
            scope: {
                layers: "="
            },
            transclude: true,
            template: '<div><div ng-transclude></div></div>',
            controller: function () {

            },
            link: function (scope, element, attrs, ctrl) {
                L.mapbox.accessToken = 'pk.eyJ1Ijoid2FuZGVyZ2lzIiwiYSI6InJhc0VUN1EifQ.V7rg9aAMQZQGx19VR6HE_Q';
                var map = L.mapbox.map(element[0], 'mapbox.streets')
                    .setView([40, -74.50], 9);
            }
        }
    }).directive('querybox',function (LoadData) {
        return {
            restrict: "EA",
            replace: true,
            transclude: true,
            controller: function ($scope) {
                $scope.phonenum = "15252485058";
            },
            scope: {},
            templateUrl: 'js/directives/query.html',
            link: function (scope, element, attrs, ctrl) {
                angular.element(element.children().eq(0).children().eq(1)).bind('click', function (e) {
                    var promise=LoadData.query("http://portal.dwuliu.com:8888/getloc",{});
                    promise.then(function (data) {
                        console.log(data);
                    }, function (data) {
                    });
                });
            }
        }
    }).directive('queryDetail', function () {
        return{
            restrict: "EA",
            replace: true,
            transclude: true,
            controller: function ($scope) {
            },
            scope: {},
            templateUrl: 'js/directives/queryDetail.html',
            link: function (scope, element, attrs, ctrl) {

            }
        }
    });