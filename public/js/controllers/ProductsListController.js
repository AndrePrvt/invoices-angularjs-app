/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("ProductListController", ['$scope', '$location', 'ProductsService', function ($scope, $location, ProductsService) {
            ProductsService.getProductsList().then(function (res) {
                $scope.products = res.data;
            })
            $scope.onRemove = function (id) {
                ProductsService.removeProduct(id)
                    .then(function () {
                        ProductsService.getProductsList()
                            .then(function (res) {
                                $scope.products = res.data;
                            });
                    });
            };
            $scope.onEdit = function(id){
                $location.path('/products/' + id);
            }

        }]);
})()