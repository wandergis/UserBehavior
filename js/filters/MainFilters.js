/**
 * Created by Administrator on 2015/9/6.
 */
angular.module("MainFilters",[])
.filter('RoleInChinese', function () {
        return function (input) {
            var role="";
            switch(input){
                case 'driver':
                    role="司机";
                    break;
                case 'car':
                    role="车主";
                    break;
                case 'bill':
                    role="货主";
                    break;
                case 'forwarders':
                    role="货代";
                    break;
                default :
                    role="未设置";
                    break;
            }
            return role;
        }
    });