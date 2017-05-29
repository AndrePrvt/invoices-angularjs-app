
/**
 * Created by andrey on 27.05.2017.
 */
(function(){
    angular.module("InvoicesApplication")
        .controller("InvoiceController", ['$scope', '$location', '$routeParams', 'CustomersService', 'InvoicesService',
            'ProductsService',
            function ($scope, $location, $routeParams, CustomersService, InvoicesService, ProductsService) {
                $scope.activeProducts = [];
                $scope.productsInInvoice = [];
                $scope.viewItems = [];
                $scope.customerSelection = {
                    model: null,
                    availableOptions: []
                }
                $scope.productSelection = {
                    model: null,
                    availableOptions: []
                }
                CustomersService.getCustomersList().then(function(res){
                    $scope.customerSelection.availableOptions = res.data;
                })
                ProductsService.getProductsList().then(function(res){
                    $scope.productSelection.availableOptions = res.data;
                    $scope.activeProducts = res.data;
                })

                $scope.onUpdate=function(){
                    InvoicesService.getInvoice($routeParams.id).then(function (res) {
                        $scope.invoice =res.data;
                        $scope.viewCustomer = CustomersService
                            .getCustomerById($scope.customerSelection.availableOptions, $scope.invoice.customer_id);
                    })
                    InvoicesService.getItems($routeParams.id).then(function (res) {
                        $scope.viewItems =[];
                        $scope.invoice.total = 0;
                        for(var i = 0; i < res.data.length; i++){
                            var product = ProductsService.getProductById(res.data[i].product_id, $scope.activeProducts);
                            if (product){
                                $scope.viewItem = {};
                                $scope.viewItem.id = res.data[i].id;
                                $scope.viewItem.name = product.name;
                                $scope.viewItem.price = product.price;
                                $scope.viewItem.product_id = product.id;
                                $scope.viewItem.quantity = res.data[i].quantity;
                                $scope.invoice.total += Math.round(($scope.viewItem.quantity * $scope.viewItem.price
                                    * (100 - $scope.invoice.discount) / 100) * 100)/100;
                                $scope.viewItems.push($scope.viewItem)
                            }else{ // remove item if product disable
                                InvoicesService.removeItem($routeParams.id, res.data[i].id).then(function(res){
                                    console.log(res);
                                })
                            }
                        }
                    })
                }
                if($routeParams.id) {
                    $scope.onUpdate();
                } else {
                    $scope.invoice = {};
                    $scope.invoice.total = 0;
                    $scope.invoice.discount = 0;
                }
                $scope.onRemoveItem = function(id){
                    InvoicesService.removeItem($routeParams.id, id).then(function (res) {
                        $scope.onUpdate();
                    })
                }
                $scope.createProduct=function(){
                    if($routeParams.id){
                        $location.path("/invoices/product/"+ $routeParams.id);
                    }else{
                        $location.path("/invoices/product/"+ 0);
                    }
                }
                $scope.createCustomer=function(){
                    if($routeParams.id){
                        $location.path("/invoices/customer/"+ $routeParams.id);
                    }else{
                        $location.path("/invoices/customer/"+ 0);
                    }
                }
                $scope.updateTotal = function(){
                    if($routeParams.id) {
                        InvoicesService.updateInvoice($routeParams.id, $scope.invoice).then(function (res) {
                            if (res.data) {
                                $scope.onUpdate();
                            }
                        })
                    }
                }
                $scope.updateItem = function(id, product_id, quantity){
                    InvoicesService.updateItem($routeParams, id, {'product_id':product_id, 'quantity': quantity})
                        .then(function (res) {
                            if(res)
                                $scope.onUpdate();
                        })

                }
                $scope.onExit = function () {
                    if ($scope.customerSelection.model)
                        $scope.invoice.customer_id = $scope.customerSelection.model;
                    InvoicesService.updateInvoice($routeParams.id, $scope.invoice).then(function (res) {
                        $location.path('/invoices')
                    })

                }
                $scope.onAddNewItem = function(){
                    if ($scope.customerSelection.model)
                        $scope.invoice.customer_id = $scope.customerSelection.model;
                    $scope.item = {};
                    $scope.item.product_id = $scope.productSelection.model;
                    $scope.item.quantity = 1;
                    if($routeParams.id){
                        InvoicesService.updateInvoice($routeParams.id, $scope.invoice).then(function(res){
                            if (res.data){
                                $scope.urlId = res.data.id;
                                InvoicesService.createItem(res.data.id, $scope.item).then(function (res) {
                                    $scope.onUpdate();
                                }, function(res){
                                    console.log(res);
                                })
                            }
                        })
                    }else{
                        InvoicesService.createInvoice($scope.invoice).then(function(res){
                            if (res.data){
                                $scope.urlId = res.data.id;
                                InvoicesService.createItem(res.data.id, $scope.item).then(function (res) {
                                    $location.path('/invoices/' + $scope.urlId)
                                }, function(res){
                                    console.log(res);
                                })
                            }
                        })
                    }
                }
            }
        ]);
})()