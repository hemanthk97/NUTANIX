(function () {
    "use strict";

    var app = angular.module('Nutanix', ['chieffancypants.loadingBar', 'ngAnimate'])
    app.config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });

    var products = [];
    var totallikes;
    var apihits = [];
    app.controller("ProdController", ['$scope', '$http','total', 'cfpLoadingBar', function ($scope, $http,total,cfpLoadingBar) {
        cfpLoadingBar.start();
        $http.get("//nutanix.0x10.info/api/deals?type=json&query=list_deals").success(function (data) {
            var i;
            for (i = 0; i <= data.deals.length - 1 ; i++) {
                var newUser = "like"
                var newValue = 1;
               data.deals[i][newUser] = newValue;

            }
            if (localStorage.getItem("likelocalstorage") === null) {
                $scope.products = data;
                $scope.totallikes = total.say($scope.products.deals.length, $scope.products);
                
            }
            else
            {
                $scope.products = JSON.parse(localStorage.getItem("likelocalstorage"));
                $scope.totallikes = total.say($scope.products.deals.length,$scope.products);
            }

        });
        $http.get("//nutanix.0x10.info/api/deals?type=json&query=api_hits").success(function (data) {
            $scope.apihits = data;
        });
        this.like1 = function (se) {
            cfpLoadingBar.start();
            var num = parseInt($scope.products.deals[se].like) + 1;
            $scope.products.deals[se].like = num;
            localStorage.setItem("likelocalstorage", JSON.stringify($scope.products));
            $scope.products = JSON.parse(localStorage.getItem("likelocalstorage"));
            $scope.totallikes = total.say($scope.products.deals.length,$scope.products);
            cfpLoadingBar.complete();
        }
        cfpLoadingBar.complete();
    }])
    app.factory('total', function () {
        return {
            say: function (len,dat) {
                var total = 0;
                for (var i = 0; i < len; i++) {
                    total += parseInt(dat.deals[i].like, 10);
                }
                return total;
            }
        }
    });
})();

