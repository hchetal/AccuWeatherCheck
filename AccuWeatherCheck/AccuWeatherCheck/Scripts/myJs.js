angular.module("myAccuWebCheckApp", [])

.controller("myAccuWebCheckController", function ($scope, $http) {
    var apiKey = "hfUru7DySD7gr3fAImEJFj25YA5gWxbZ";
    var languageReturned = "en-us";
    var requestRegionUrl = "http://dataservice.accuweather.com/locations/v1/regions";
    $scope.reportHide = true;
    $scope.reportHideAlternate = true;
    $http.get(requestRegionUrl, { params: { apikey: apiKey, language: languageReturned } }).
    success(function (data) {
        $scope.region = data;
    })
   .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });

    $scope.ShowFavorites = function () {
        $scope.reportHide = true;
        var getFavouritesofUser = "http://localhost:49375/ServiceDB.svc/GetUsersFavourites/" + $("#txtuser").val();
        $http.get(getFavouritesofUser).
       success(function (data) {
           $scope.userfavourites = data;
          
       })
       .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });

    }
    

    $scope.selectedRegion = function () {
        var requestCountryUrl = "http://dataservice.accuweather.com/locations/v1/countries/" + $scope.selectedregion;
        $http.get(requestCountryUrl, { params: { apikey: apiKey, language: languageReturned } }).
   success(function (data) {
       $scope.country = data;
   })
   .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });
    }    


    $scope.selectedCountry = function () {

    }

    $scope.complete = function () {
        var requestPlaceUrl = "http://dataservice.accuweather.com/locations/v1/" +
            $scope.selectedcountry +
            "/search";
        var requestedPlace = $scope.place;
        $scope.availablePlaces = [];
        $http.get(requestPlaceUrl,
            {
                params: {
                    apikey: apiKey,
                    q: requestedPlace,
                    language: languageReturned,
                    details: "false",
                    offset: 2,
                    alias: "Never"
                }
            })
            .success(function (data) {

                $scope.data = data;
                angular.forEach($scope.data,
                    function (value, key) {
                        $scope.availablePlaces.push(value.EnglishName +
                            " , " +
                            value.AdministrativeArea.EnglishName +
                            " , " +
                            value.Country.EnglishName +
                            " , " +
                            value.Region.EnglishName +
                            "," +
                            value.Key);
                    });

                $("#txtPlace")
                    .autocomplete({
                        source: $scope.availablePlaces,

                        select: function () {
                            var selectedLocation = [];
                            selectedLocation = this.value.split(',');
                            $scope.citySelected = selectedLocation[0];
                            $scope.countrySelected = selectedLocation[1];
                            $scope.regionSelected = selectedLocation[2];
                            $scope.locationKeySelected = selectedLocation[selectedLocation.length - 1];
                        }
                    });
            })
            .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });
    };




    $scope.ShowWeather = function () {
        $scope.reportHideAlternate = true;
        var requestedWeatherforLocation = "http://dataservice.accuweather.com/currentconditions/v1/" +
            $scope.locationKeySelected;
        $http.get(requestedWeatherforLocation, { params: { apikey: apiKey, language: languageReturned, details: "false" } }).
        success(function (data) {
            $scope.reportHide = false;
            $scope.cityWeatherText = data[0].WeatherText;
            $scope.cityTemperatureValue = data[0].Temperature.Metric.Value;
            $scope.cityTemperatureUnit = data[0].Temperature.Metric.Unit;
            $scope.timeOftheDay = dateFormat(data[0].LocalObservationDateTime, "ddd mmm dd yyyy HH:MM:ss");
        })
        .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });
    }


    $scope.handleRadioClickForSelectedFav = function (userFav) {
        $scope.reportHide = true;
        var userSelectedKey = userFav.LocationKey;        
        var requestedWeatherforLocation = "http://dataservice.accuweather.com/currentconditions/v1/" +
            userSelectedKey;      
        $http.get(requestedWeatherforLocation, { params: { apikey: apiKey, language: languageReturned, details: "false" } }).
        success(function (data) {            
            $scope.reportHideAlternate = false;
            $scope.cityWeatherTextRadio = data[0].WeatherText;
            $scope.cityTemperatureValueRadio = data[0].Temperature.Metric.Value;
            $scope.cityTemperatureUnitRadio = data[0].Temperature.Metric.Unit;
            $scope.timeOftheDayRadio = dateFormat(data[0].LocalObservationDateTime, "ddd mmm dd yyyy HH:MM:ss");
            $scope.regionSelectedRadio = userFav.Region;
            $scope.countrySelectedRadio = userFav.Country;
            $scope.citySelectedRadio = userFav.Place;
        })
        .error(function () { alert("Error in loading the data. Please refresh the page and try again"); });
    }






    $scope.AddToFavorites = function () {
        var userloggedin = $("#txtuser").val();
        var addtofavouritesurl = "http://localhost:49375/ServiceDB.svc/AddFavouritesToDb/" + $scope.locationKeySelected + "/" + $scope.citySelected + "/" + $scope.countrySelected + "/" + $scope.regionSelected + "/" + userloggedin;       
        $http({
            method: "GET",
            url: addtofavouritesurl,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
            }
        })
            .then(function successCallback(data) {               
                $scope.successmessage = data.data;
                $scope.requestcompleted = false;;
                $scope.requesterror = true;
            },
        function errorCallBack(response) {           
            $scope.errormessage = "Error in saving record. Please try again after some time";
            $scope.requestcompleted = true;
            $scope.requesterror = false;
        })
    }




    var dateFormat = function () {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

});

