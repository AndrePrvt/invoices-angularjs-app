/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("InvoicesListController", ['$scope', '$location', 'InvoicesService', 'CustomersService',
            function ($scope, $location, InvoicesService, CustomersService) {
            $scope.onReload= function(){
                CustomersService.getCustomersList().then(function (res) {
                    $scope.activeCustomers = res.data;
                });
                InvoicesService.getInvoicesList().then(function (res) {
                    $scope.invoices = res.data;
                    $scope.invoicesViews = [];
                    for(var i = 0; i < res.data.length; i++){
                        var customer = CustomersService.getCustomerById($scope.activeCustomers, res.data[i].customer_id);
                        if (customer){
                            $scope.viewInovice = {};
                            $scope.viewInovice.id = res.data[i].id;
                            $scope.viewInovice.name = customer.name;
                            $scope.viewInovice.discount = res.data[i].discount;
                            $scope.viewInovice.total = res.data[i].total;
                            $scope.invoicesViews.push($scope.viewInovice)
                        }else { // remove invoice if customer disable or customer expected
                            InvoicesService.removeInvoice(res.data[i].id).then(function (res) {
                                console.log(res);
                            })
                        }

                    }
                })
            }
            $scope.onReload();
            $scope.onDeleteInvoice= function(id){
                InvoicesService.removeInvoice(id).then(function (res) {
                    $scope.onReload();
                })
            }
            $scope.onEditInvoice = function(id){
                $location.path('invoices/' + id);
            }

        }]);
})()