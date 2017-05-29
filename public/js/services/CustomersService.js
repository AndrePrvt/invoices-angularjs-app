/**
 * Created by andrey on 27.05.2017.
 */

(function () {
    angular.module("InvoicesApplication")
        .service("CustomersService", ['$http', function ($http) {

            this.getCustomersList = function(){
                return $http.get("/api/customers")
            }

            this.removeCustomer = function (id) {
                return $http.delete("/api/customers/" + id)
            }

            this.updateCustomer = function(id, customer) {
                return $http.put("/api/customers/" + id, customer);
            }

            this.createCustomer =function(customer){
                return $http.post("/api/customers", customer)
            }
            this.getCustomer =function(id){
                return $http.get("/api/customers/" + id)
            }

            this.getCustomerById =function(customers, id){
                if (!id)
                    return
                var customer = customers.filter(function(customer){
                    return customer.id == id;
                })
                return customer[0]
            }

        }])

})()
