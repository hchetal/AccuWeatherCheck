<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AccuWeatherDisplay.aspx.cs" Inherits="AccuWeatherCheck.Account.AccuWeatherDisplay" %>

<asp:Content ID="AccuweatherCheckPlaceHolder" ContentPlaceHolderID="MainContent" runat="server">

    <script src="../Scripts/angular.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="../Scripts/myJs.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


    <div class="jumbotron">
        <h1>AccuWeatherCheck</h1>
        <p class="lead">Application for checking the Weather.</p>
    </div>


    <div class="form-horizontal" ng-app="myAccuWebCheckApp" ng-controller="myAccuWebCheckController">
        <div ng-hide="requestcompleted" style="color:green" class="check-element funky-show-hide">
            <span>{{successmessage}}</span>
        </div>
        <div ng-hide="requesterror" style="color:red" class="check-element funky-show-hide">
            <span>{{errormessage}}</span>
        </div>
        <h4>Type place name to select</h4>
        <hr />
        <div class="form-group">
            <asp:Label runat="server" CssClass="col-md-2 control-label">Region</asp:Label>
            <div class="col-md-10">
                <select name="drpRegion" id="drpRegion" ng-model="selectedregion" ng-change="selectedRegion()" ng-options="obj.ID as obj.EnglishName for obj in region">
                    <option value="">Select Region</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" CssClass="col-md-2 control-label">Country</asp:Label>
            <div class="col-md-10">
                <select name="drpCountry" id="drpCountry" ng-model="selectedcountry" ng-change="selectedCountry()" ng-options="obj.ID as obj.EnglishName for obj in country">
                    <option value="">Select Country</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" CssClass="col-md-2 control-label">Place</asp:Label>
            <div class="col-md-10">
                <div class="ui-widget">
                    <label for="txtPlace"></label>
                    <input id="txtPlace" ng-model="place" ng-keyup="complete()" />
                    <input id="btnAddtoFav" type="button" value="Add" ng-model="placeselectedasfavourites" ng-click="AddToFavorites()" class="btn btn-default" />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="button" value="Show" ng-click="ShowWeather()" class="btn btn-default" />&nbsp;&nbsp;&nbsp;  
            <input type="button" value="Favourites" ng-click="ShowFavorites()" class="btn btn-default" />
            </div>
            <div class="col-md-offset-2 col-md-14">
                &nbsp;
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <div ng-repeat="userFav in userfavourites" id="{{userFav.LocationKey}}">
                    <label>
                        <input type="radio" name="userFav"
                            ng-model="selectedValue.LocationKey"
                            ng-click="handleRadioClickForSelectedFav(userFav)" value="userFav.LocationKey">
                        {{userFav.Place + " ," + userFav.Country + " ," + userFav.Region}}
                    </label>
                </div>
            </div>
        </div>


        <div>
            <div class="jumbotron" ng-hide="reportHide">
                <h2>Weather report</h2>
                <p><b><span>Region:</span></b><span>{{regionSelected}}</span>&nbsp;&nbsp;<b><span>Country:</span></b><span>{{countrySelected}}</span> </p>
                <p>
                    <b>
                        <span>City:</span></b><span>{{citySelected}}</span>
                </p>
                <p>
                    <b>
                        <span>Projected Weather:</span></b><span>{{cityWeatherText}}</span>
                </p>
                <p>
                    <b>
                        <span>Temprature:</span></b><span>{{cityTemperatureValue + "o"+ cityTemperatureUnit}}</span>
                </p>
                <p>
                    <b>
                        <span>Date and Time:</span></b><span>{{timeOftheDay}}</span>
                </p>


                <p><span ng-hide="true">Location Key: </span><span ng-hide="true">{{locationKeySelected}}</span> </p>
            </div>
            <div>
            <div class="jumbotron" ng-hide="reportHideAlternate">
                <h2>Weather report</h2>
                <p><b><span>Region:</span></b><span>{{regionSelectedRadio}}</span>&nbsp;&nbsp;<b><span>Country:</span></b><span>{{countrySelectedRadio}}</span> </p>
                <p>
                    <b>
                        <span>City:</span></b><span>{{citySelectedRadio}}</span>
                </p>
                <p>
                    <b>
                        <span>Projected Weather:</span></b><span>{{cityWeatherTextRadio}}</span>
                </p>
                <p>
                    <b>
                        <span>Temprature:</span></b><span>{{cityTemperatureValueRadio + "o"+ cityTemperatureUnitRadio}}</span>
                </p>
                <p>
                    <b>
                        <span>Date and Time:</span></b><span>{{timeOftheDayRadio}}</span>
                </p>


                <p>
            </div>
        </div>
        <asp:HiddenField ID="userLoggedIn" runat="server" />
        <input type="text" ng-bind="userloggedin" id="txtuser" ng-hide="true" />
    </div>

    <script type="text/javascript">
        $(document).ready(function () {
            var username = document.getElementById('MainContent_userLoggedIn').value;
            $("#txtuser").val(username);
        })

    </script>

    </div>
</asp:Content>
