define(['knockout'],
function (ko) {
    'use strict';
    function model(context) {
        var self = this;
        self.searchName = ko.observable();
        self.searchDate = ko.observable();
        self.searchSuburb = ko.observable();  
        self.searchWeather = ko.observable("cape+town");
        self.searchInformation = ko.observable();
        self.searchMap = ko.observable();
        self.long = ko.observable();
        self.lat = ko.observable();
        self.allEvents = ko.observableArray([]);
        self.allWeather = ko.observableArray([]);            
        var holder1 = [];
        var holder2 = [];

        self.nameClick = function (eventName) {
            alert(eventName)
            $.ajax({
                url: 'https://www.eventbriteapi.com/v3/events/search/?q=' + eventName.toLowerCase().split(" ").join("+") + '&token=5LZXCGDQFEZREXX25CG7',
                type: 'get'
            }).then(
                function (result) {
                    for (var i = 0; i < result.events.length; i++) {
                        holder1.push({
                            //Name
                            name: result.events[i].name.text,
                            //Date
                            date: result.events[i].start.local,
                            //Suburb
                            suburb: result.events[i].end.timezone,
                            //Information
                            information: result.events[i].description.text
                        });
                    }
                    self.allEvents(holder1);
                    console.log(JSON.stringify(self.allEvents()));
                })

            //Weather
            $.ajax({
                url: 'http://samples.openweathermap.org/data/2.5/weather?q=' + self.searchWeather() + '&units=metric&appid=280906c819ca502ccfcf2d5bd117ad46',
                type: 'get'
            }).then(
                function (result) {
                    for (var i = 0; i < result.length; i++) {
                        holder2.push({
                            //Weather description
                            description: result[i].weather.description,
                            //Weather temperature
                            temp: result[i].main.temp_max
                        });
                    }
                    self.allWeather(holder2);
                    console.log(JSON.stringify(self.allWeather()));
                })

            //Map
            //Map JS goes here

        }
    }
    return model;
});