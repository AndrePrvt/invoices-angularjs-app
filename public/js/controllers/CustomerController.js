/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("CustomerController", ['$scope', '$location', '$routeParams', 'CustomersService',
            function ($scope, $location, $routeParams, CustomersService) {
                if($routeParams.id) {
                    CustomersService.getCustomer($routeParams.id).then(function (res) {
                        $scope.customer =res.data;
                    })
                } else {
                    $scope.customer = {};
                    $scope.customer.name = "Name is required";
                    $scope.customer.phone = "000-000-0000"
                    $scope.customer.address = "Addres is required";
                }
                    $scope.phonePatern =
                $scope.onCancel = function () {
                    $location.path('/customers');
                }
                $scope.onSubmit = function () {
                    if ($routeParams.id){
                        CustomersService.updateCustomer($routeParams.id, $scope.customer).then(function (res) {
                            if (res)
                                $location.path("/customers");
                        })
                    }
                    else {
                        CustomersService.createCustomer($scope.customer).then(function(res){

                            if ($routeParams.fromInvoice == 0)
                                $location.path('/invoice/');
                            else
                            if ($routeParams.fromInvoice)
                                $location.path('/invoices/' + $routeParams.fromInvoice);
                            else
                                $location.path('/customers');
                        })
                    }
                }
            }
        ]);
})()