/**
 * Created by andrey on 27.05.2017.
 */

(function () {
    angular.module("InvoicesApplication")
        .service("ProductsService", ['$http', function ($http) {

            this.getProductsList = function(){
                return $http.get("/api/products")
            }
        }])

})()
