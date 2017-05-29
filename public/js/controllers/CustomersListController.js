/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("CustomersListController", ['$scope', '$location', 'CustomersService',
            function ($scope, $location, CustomersService) {
                CustomersService.getCustomersList().then(function (res) {
                    $scope.customers = res.data;
                })
                $scope.onRemove = function (id) {
                    CustomersService.removeCustomer(id)
                        .then(function () {
                            CustomersService.getCustomersList()
                                .then(function (res) {
                                    $scope.customers = res.data;
                                });
                        });
                };
                $scope.onEdit = function(id){
                    $location.path('/customers/' + id);
                }
            }
        ]);
})()
