/**
 * Created by andrey on 27.05.2017.
 */

(function () {
    angular.module("InvoicesApplication")
        .service("InvoicesService", ['$http', function ($http) {

            this.getInvoicesList = function(){
                 return $http.get("/api/invoices")
            }
        }])
    
})()
