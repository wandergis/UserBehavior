/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('demoControllers',[])
.controller('mainController',['$scope',function ($scope) {
        $scope.greeting={
            text:"xsxasxsaxsa"
        };
        //var promise=LoadData.query("",{});
        //promise.then(function (data) {
        //    $scope.data=data;
        //}, function (data) {
        //    $scope.data={error:"未请求到数据"}
        //});
    }]);