/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('MainServices', [])
    .factory('getUserFriends', ["$http", "$q", function($http, $q) {
        return {
            query: function(mobileno) {
                var deferred = $q.defer();
                $http.jsonp("http://***.***.com/getUserFriends", {
                        method: "GET",
                        params: {
                            callback: "JSON_CALLBACK",
                            mobileno: mobileno
                        }
                    })
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }])
    .value('relationship', []);