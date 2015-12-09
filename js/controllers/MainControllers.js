/**
 * Created by Administrator on 2015/9/1.
 */
angular.module('MainControllers', [])
    .controller('MainController', ['$scope', '$window', 'getUserFriends', 'relationship', function ($scope, $window, getUserFriends, relationship) {
        $scope.mobileno = null;
        $scope.friends = [];
        $scope.user = null;
        $scope.locateCount = 0;
        $scope.error = null;
        $scope.overlaylayers = {};
        $scope.clickcount = 0;
        $scope.Keyup = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.query($scope.mobileno, true);
            }
        };
        $scope.tableheight = $window.document.documentElement.clientHeight - 380;
        /**
         * 执行查询操作
         * @param mobileno 用户手机号
         * @param isdelete 是否删除缓存的关系点
         */
        $scope.query = function (mobileno, isdelete) {
            if (isdelete) {
                relationship = [];
            }
            var promise = getUserFriends.query(mobileno);
            promise.then(function (data) {
                $scope.friends = data.friends;
                $scope.user = data.user;
                if (data.friends.length == 0 || data.user == {}) {
                    relationship.pop();
                    return;
                }

                var locateCount = 0;
                var unlocateCount = 0;
                //构造geojson数据，分别是关系线图层、朋友点图层、和用户点图层
                var relationlines = {
                    "type": "FeatureCollection",
                    "features": []
                };
                var friendspoints = {
                    "type": "FeatureCollection",
                    "features": []
                };
                var userpoint = {
                    "type": "FeatureCollection",
                    "features": []
                };
                var overlaylayers = {};
                if (data.user.lng != 0 || data.user.lat != 0) {
                    //用户图层
                    var user = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [data.user.lng, data.user.lat]
                        },
                        "properties": data.user
                    };
                    userpoint.features.push(user);
                    angular.forEach(data.friends, function (value, index) {
                        if (value.lastlocatelat == 0 || value.lastlocatelng == 0) {
                            //暂时不处理
                        }
                        else {
                            var friend = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [value.lastlocatelng, value.lastlocatelat]
                                },
                                "properties": value
                            };
                            friendspoints.features.push(friend);
                            //关系图层
                            var relationline = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates": [
                                        [data.user.lng, data.user.lat], [value.lastlocatelng, value.lastlocatelat]
                                    ]
                                },
                                "properties": {
                                    direction: data.user.name + '->' + value.name
                                }
                            };
                            relationlines.features.push(relationline);
                            locateCount++;
                        }
                    });
                }
                else {
                    angular.forEach(data.friends, function (value, index) {
                        if (value.lastlocatelat == 0 || !value.lastlocatelng == 0) {
                            //暂时不处理
                        }
                        else {
                            var friend = {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [value.lastlocatelng, value.lastlocatelat]
                                },
                                "properties": value
                            };
                            friendspoints.features.push(friend);
                            locateCount++;
                        }
                    });
                }


                var index = 0;
                //添加关系图层
                if (relationlines.features.length) {
                    angular.forEach(relationship, function (value, index) {
                        if (relationship[index + 1]) {
                            relationlines.features.push(
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": [
                                            [value.lng, value.lat], [relationship[index + 1].lng, relationship[index + 1].lat]
                                        ]
                                    },
                                    "properties": {
                                        direction: value.name + '->' + relationship[index + 1].name
                                    }
                                }
                            );
                        }
                    });
                    $scope.locateCount = locateCount;
                    var color = Please.make_color({
                        colors_returned: relationlines.features.length + 2 //设置返回颜色数目
                    });
                    overlaylayers.relationLayer = L.geoJson(relationlines, {
                        style: function (feature) {
                            index++;
                            return {
                                color: color[index],
                                weight: 2

                            };
                        },
                        onEachFeature: function (feature, layer) {
                            layer.bindPopup(feature.properties.direction);
                        }
                    });
                }
                if (userpoint.features.length) {
                    overlaylayers.userLayer = L.geoJson(userpoint, {
                        pointToLayer: function (featureData, latlng) {
                            var icon = L.icon({
                                iconUrl: 'images/user.png',
                                iconSize: [24, 24]
                            });
                            return L.marker(latlng, {
                                icon: icon
                            }).bindLabel(featureData.properties.name);
                        }
                    });
                }
                if (friendspoints.features.length) {
                    angular.forEach(relationship, function (value, index) {
                        if (relationship[index + 1]) {
                            friendspoints.features.push(
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [value.lng, value.lat]

                                    },
                                    "properties": value
                                }
                            );
                        }
                    });
                    overlaylayers.friendsLayer = L.geoJson(friendspoints, {
                        pointToLayer: function (featureData, latlng) {
                            var icon = L.icon({
                                iconUrl: 'images/friend.png',
                                iconSize: [18, 18]
                            });
                            return L.marker(latlng, {
                                icon: icon
                            }).bindLabel(featureData.properties.name);
                        },
                        onEachFeature: function (feature, layer) {
                            layer.on('click', function (e) {
                                $scope.clickcount++;
                                relationship.push(data.user);
                                $scope.query(feature.properties.mobileno, false);
                            })
                        }
                    });
                }

                $scope.overlaylayers = overlaylayers;


            }, function (error) {
                $scope.error = "未请求到数据";
                console.log(error);
            });
        };
        $scope.center = function (friend) {
            $scope.centerpoint = {
                cpt: [friend.lastlocatelat, friend.lastlocatelng],
                name: friend.name
            };
        }
    }]);