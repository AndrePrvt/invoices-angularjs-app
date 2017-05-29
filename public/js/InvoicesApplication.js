/**
 * Created by andrey on 27.05.2017.
 */
angular.module('InvoicesApplication', [
    'ngRoute'
    ])
    .config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/invoices.html',
                controller: 'InvoicesListController'
            })
            .when('/products', {
                templateUrl: '/views/products.html',
                controller:'ProductListController'
            })
            .when('/products/:id',{
                templateUrl: 'views/product.html',
                controller:"ProductController"
            })
            .when('/product',{
                templateUrl: 'views/product.html',
                controller:"ProductController"
            })
            .when('/customers', {
                templateUrl: '/views/customers.html',
                controller: 'CustomersListController'
            })
            .when('/customers/:id',{
                templateUrl: 'views/customer.html',
                controller:"CustomerController"
            })
            .when('/customer',{
                templateUrl: 'views/customer.html',
                controller:"CustomerController"
            })
            .when('/invoices',{
                templateUrl: '/views/invoices.html',
                controller: 'InvoicesListController'
            })
            .when('/invoice',{
                templateUrl: '/views/invoice.html',
                controller: 'InvoiceController'
            })
            .when('/invoices/:id',{
                templateUrl: '/views/invoice.html',
                controller: 'InvoiceController'
            })
            .when('/invoices/product/:fromInvoice',{
                templateUrl: '/views/product.html',
                controller: 'ProductController'
            })
            .when('/invoices/customer/:fromInvoice',{
                templateUrl: '/views/customer.html',
                controller: 'CustomerController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.hashPrefix('').html5Mode(true);
    }]);