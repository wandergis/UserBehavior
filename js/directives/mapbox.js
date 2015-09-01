/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('mapboxDirective',[])
    .directive('mapbox', function ($q) {
        return {
            restrict:"EA",
            replace:true,
            scope:{
                layers:"="
            },
            transclude:true,
            template:'<div><div ng-transclude></div></div>',
            controller: function () {
                
            },
            link: function (scope, element, attrs, ctrl) {
                L.mapbox.accessToken = 'pk.eyJ1Ijoid2FuZGVyZ2lzIiwiYSI6InJhc0VUN1EifQ.V7rg9aAMQZQGx19VR6HE_Q';
                var map = L.mapbox.map(element[0], 'mapbox.streets')
                    .setView([40, -74.50], 9);
            }
        }
    });