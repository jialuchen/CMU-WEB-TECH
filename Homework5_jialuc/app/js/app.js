(function () {
    "use strict";

    var usStates = {
        AL: "ALABAMA",AK: "ALASKA",AS: "AMERICAN SAMOA",AZ: "ARIZONA",AR: "ARKANSAS",CA: "CALIFORNIA",CO: "COLORADO",
        CT: "CONNECTICUT",DE: "DELAWARE",DC: "DISTRICT OF COLUMBIA",FM: "FEDERATED STATES OF MICRONESIA",FL: "FLORIDA",
        GA: "GEORGIA",GU: "GUAM",HI: "HAWAII",ID: "IDAHO",IL: "ILLINOIS",IN: "INDIANA",IA: "IOWA",KS: "KANSAS",KY: "KENTUCKY",
        LA: "LOUISIANA",ME: "MAINE",MH: "MARSHALL ISLANDS",MD: "MARYLAND",MA: "MASSACHUSETTS",MI: "MICHIGAN",MN: "MINNESOTA",
        MS: "MISSISSIPPI",MO: "MISSOURI",MT: "MONTANA",NE: "NEBRASKA",NV: "NEVADA",NH: "NEW HAMPSHIRE",NJ: "NEW JERSEY",
        NM: "NEW MEXICO",NY: "NEW YORK",NC: "NORTH CAROLINA",ND: "NORTH DAKOTA",MP: "NORTHERN MARIANA ISLANDS",OH: "OHIO",
        OK: "OKLAHOMA",OR: "OREGON",PW: "PALAU",PA: "PENNSYLVANIA",PR: "PUERTO RICO",RI: "RHODE ISLAND",SC: "SOUTH CAROLINA",
        SD: "SOUTH DAKOTA",TN: "TENNESSEE",TX: "TEXAS",UT: "UTAH",VT: "VERMONT",VI: "VIRGIN ISLANDS",VA: "VIRGINIA",
        WA: "WASHINGTON",WV: "WEST VIRGINIA",WI: "WISCONSIN",WY: "WYOMING"};

    angular.module('contactApp', ['file-data-url', 'ngRoute', 'LocalStorageModule', 'ngMap'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/contactList.html',
                controller: 'contactListController'
            }).when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            }).when('/contact/:id', {
                templateUrl: 'views/contact.html',
                controller: 'contactController'
            });
            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');
        })
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('08724.hw5');
        })
        .controller('contactListController', function ($scope, localStorageService, $location) {
            $scope.submittedAddresses = [];

            $scope.add = function () {
                $location.path("/contact");
            };

            $scope.removeAddress = function (index, key) {
                $scope.submittedAddresses.splice(index, 1);
                localStorageService.remove(key);
            };
            $scope.edit = function (id) {
                $location.path("/contact/" + id);
            };
            var keys = localStorageService.keys();
            for (var index in keys) {
                var object = localStorageService.get(keys[index]);
                $scope.submittedAddresses.push(object);
            }


        })
        .controller('contactController', function ($scope, localStorageService, $routeParams, $location) {

            $scope.address = localStorageService.get($routeParams.id);
            $scope.stateOptions = usStates;
            $scope.submit = function () {
                var currentIndex = $routeParams.id;
                console.log(currentIndex);

                if (currentIndex === undefined || currentIndex === null || isNaN(currentIndex)) {
                    var keys = localStorageService.keys();
                    var maxIndex = 0;
                    for (var index in keys) {
                        maxIndex = keys[index];
                        console.log(maxIndex);
                    }

                    currentIndex = (1 + parseInt(maxIndex));
                    $scope.address.key = currentIndex;
                }

                localStorageService.set(currentIndex, $scope.address);
                $location.path("/");
            }

        });

})();