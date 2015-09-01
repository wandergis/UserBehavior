/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('demoServices', [])
    .factory('LoadData', ["$http", "$q", function ($http, $q) {
        return {
            query: function (url, data) {
                var deferred = $q.defer();
                $http.jsonp(url, {
                    method: "GET",
                    params: {callback: "JSON_CALLBACK"},
                    data: data
                })
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);