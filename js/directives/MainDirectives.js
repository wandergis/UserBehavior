/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('MainDirectives', [])
    .directive('mapbox', ['$q','relationship',function ($q,relationship) {
        return {
            restrict: "EA",
            replace: true,
            scope: {
                layers: "=",
                center:"="
            },
            transclude: true,
            template: '<div></div>',
            link: function (scope, element, attrs, ctrl) {
                L.mapbox.accessToken = 'pk.eyJ1Ijoid2FuZGVyZ2lzIiwiYSI6InJhc0VUN1EifQ.V7rg9aAMQZQGx19VR6HE_Q';
                var map = L.mapbox.map(element[0])
                    .setView([38,118], 5,{animate:true});

                // Add a CloudMade tile layer with style #999
                var mapboxLayer1 = L.tileLayer('https://a.tiles.mapbox.com/v3/examples.bc17bb2a/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var mapboxLayer2 = L.tileLayer('https://a.tiles.mapbox.com/v3/examples.c7d2024a/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var mapboxLayer5 = L.tileLayer('https://d.tiles.mapbox.com/v3/examples.fb8f9523/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var mapboxLayer6 = L.tileLayer('https://a.tiles.mapbox.com/v3/examples.map-qfyrx5r8/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var mapboxLayer8 = L.tileLayer('https://b.tiles.mapbox.com/v3/examples.map-3gisupiu/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var mapboxLayer9 = L.tileLayer('https://d.tiles.mapbox.com/v3/financialtimes.map-w7l4lfi8/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var githubLayer = L.tileLayer('https://c.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var foursquareLayer = L.tileLayer('https://a.tiles.mapbox.com/v3/foursquare.map-0y1jh28j/{z}/{x}/{y}.png', {
                    attribution: 'Map &copy; Pacific Rim Coordination Center (PRCC).  Certain data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    styleId: 22677
                });
                var baseLayers = {
                    '高德地图': L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {subdomains: "1234"}).addTo(map),
                    '高德影像': L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {subdomains: "1234"}), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {subdomains: "1234"})]),
                    'GeoQ灰色底图': L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'),
                    '游戏地图':mapboxLayer1,
                    '黑暗地图':mapboxLayer5,
                    '高清影像':mapboxLayer6,
                    '绿色地图':mapboxLayer8,
                    '立体地图':mapboxLayer2,
                    '金融时报底图':mapboxLayer9,
                    'Github Map':githubLayer,
                    'Foursquare':foursquareLayer
                };

                var overlays = {
                };
                L.control.layers(baseLayers, overlays, {position: 'topleft'}).addTo(map);
                scope.$watch('layers', function (newValue, oldValue, scope) {
                    if (newValue.hasOwnProperty('friendsLayer')) {
                        //console.log(relationship);
                        angular.forEach(oldValue, function (value, key) {
                            map.removeLayer(value);
                        });
                        angular.forEach(newValue, function (value, key) {
                            map.addLayer(value);
                            if (key == 'friendsLayer') {
                                map.fitBounds(value.getBounds());
                            }
                        });
                    }
                });
                scope.$watch('center', function (newValue, oldValue, scope) {
                    if (newValue) {
                        map.setView(newValue.cpt,14,{animate:true});
                        var popup = L.popup()
                            .setLatLng(L.latLng(newValue.cpt[0],newValue.cpt[1]))
                            .setContent(newValue.name)
                            .openOn(map);
                    }
                });
            }
        }
    }]);