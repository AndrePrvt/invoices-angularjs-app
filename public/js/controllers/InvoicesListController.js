/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("InvoicesListController", ['$scope', '$http', 'InvoicesService', function ($scope, $http, InvoicesService) {
            InvoicesService.getInvoicesList().then(function (res) {
                $scope.invoices = res;
            })


        }]);
})()