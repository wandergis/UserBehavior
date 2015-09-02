/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('demoControllers',[])
.controller('MainController',['$scope','LoadData',function ($scope,LoadData) {
        var promise=LoadData.query("http://portal.dwuliu.com:8888/getloc",{});
        promise.then(function (data) {
            $scope.data=data;
        }, function (data) {
            $scope.data={error:"未请求到数据"}
        });
    }]);