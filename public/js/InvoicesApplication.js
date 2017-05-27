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
            .when('/customers', {
                templateUrl: '/views/customers.html'
            })
            .when('/invoices',{
                templateUrl: '/views/invoices.html',
                controller: 'InvoicesListController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.hashPrefix('').html5Mode(true);
    }]);