/**
 * Created by andrey on 27.05.2017.
 */

(function () {
    angular.module("InvoicesApplication")
        .service("InvoicesService", ['$http', function ($http) {

            this.getInvoicesList = function(){
                return $http.get("/api/invoices")
            }

            this.removeInvoice = function (id) {
                return $http.delete("/api/invoices/" + id)
            }

            this.updateInvoice = function(id, invoice) {
                return $http.put("/api/invoices/" + id, invoice);
            }

            this.createInvoice =function(invoice){
                return $http.post("/api/invoices", invoice)
            }
            this.getInvoice =function(id){
                return $http.get("/api/invoices/" + id)
            }

            this.getItems =function(invoice_id){
                return $http.get('/api/invoices/'+ invoice_id +'/items')
            }

            this.createItem =function(invoice_id, item){
                return $http.post('/api/invoices/'+ invoice_id +'/items', item)
            }

            this.getItem =function(invoice_id, item_id){
                return $http.get('/api/invoices/' + invoice_id + '/items/ ' + item_id)
            }

            this.updateItem =function(invoice_id, item_id, item){
                return $http.put('/api/invoices/' + invoice_id +' /items/' + item_id, item)
            }

            this.removeItem =function(invoice_id, item_id){
                return $http.delete('/api/invoices/' + invoice_id + '/items/ ' + item_id)
            }

        }])

})()
