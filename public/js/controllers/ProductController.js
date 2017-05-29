/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("ProductController", ['$scope', '$location', '$routeParams', 'ProductsService',
            function ($scope, $location, $routeParams, ProductsService) {
                if($routeParams.id) {
                    ProductsService.getProduct($routeParams.id).then(function (res) {
                        $scope.product =res.data;
                    })
                } else {
                    $scope.product = {};
                    $scope.product.name = "Enter name";
                    $scope.product.price = 0;
                }

                $scope.onCancel = function () {
                    if ($routeParams.fromInvoice)
                        $location.path('/invoices/' + $routeParams.fromInvoice);
                    $location.path('/products');
                }
                $scope.onSubmit = function () {
                   if ($routeParams.id){
                       ProductsService.updateProduct($routeParams.id, $scope.product).then(function (res) {
                           if (res)
                           $location.path("/products");
                       })
                   }
                   else {
                       ProductsService.createProduct($scope.product).then(function(res){
                           if ($routeParams.fromInvoice == 0)
                               $location.path('/invoice/');
                           else
                            if ($routeParams.fromInvoice)
                                $location.path('/invoices/' + $routeParams.fromInvoice);
                            else
                                $location.path('/products');
                       })
                   }
                }
            }
        ]);
})()