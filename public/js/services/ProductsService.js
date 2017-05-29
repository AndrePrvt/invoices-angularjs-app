/**
 * Created by andrey on 27.05.2017.
 */

(function () {
    angular.module("InvoicesApplication")
        .service("ProductsService", ['$http', function ($http) {

            this.getProductsList = function(){
                return $http.get("/api/products")
            }

            this.removeProduct = function (id) {
                return $http.delete("/api/products/" + id)
            }

            this.updateProduct = function(id, product) {
                return $http.put("/api/products/" + id, product);
            }

            this.createProduct =function(product){
                return $http.post("/api/products", product)
            }
            this.getProduct =function(id){
                return $http.get("/api/products/" + id)
            }

            this.getProductById=function(product_id, products){
                var product = products.filter(function(product){
                    return product.id == product_id;
                })
                return product[0]
            }

        }])

})()
