/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("ProductListController", ['$scope', '$http', 'ProductsService', function ($scope, $http, ProductsService) {
            ProductsService.getProductsList().then(function (res) {
                $scope.products = res;
            })


        }]);
})()