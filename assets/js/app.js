function FlightChallengeViewModel(data) {
  let self = this;
  self.firstLoad = true;
  self.state = ['search', 'order', 'result'];

  self.data = data;
  self.availableOrigins = ko.observable();
  getCities('assets/data/cities.json', self.availableOrigins);

  self.currentState = ko.observable(data.currentState);
  self.isPromotionEnabled = ko.observable(data.isPromotionEnabled == 'true');
  self.selectedFlight = ko.observable(data.selectedFlight.length == 0 ? undefined : data.selectedFlight);
  self.passengerClass = ko.observable(data.passengerClass);
  self.passengerCount = ko.observable(parseInt(data.passengerCount));

  self.origin = ko.observable();
  self.originText = ko.computed(function (e) {
    if (self.availableOrigins()) {
      let city = self.availableOrigins().filter(e => e.v == self.origin());
      if (city.length != 0) {
        return city[0].text;
      }
    }
  }, this);

  self.destination = ko.observable();
  self.destinationText = ko.computed(function (e) {
    if (self.availableOrigins()) {
      let city = self.availableOrigins().filter(e => e.v == self.destination());
      if (city.length != 0) {
        return city[0].text;
      }
    }
  }, this);

  self.defaultShortBy = ko.observable('economy');

  self.availableDestinations = self.availableOrigins;

  self.flights = ko.observable();
  self.hasAnyFlights = ko.computed(function () {
    if (self.flights()) {
      return self.flights().length != 0;
    }
    return false;
  }, this);

  getFlights('assets/data/flights.json', self.flights);

  self.addPassenger = function () {
    self.passengerCount(parseInt(self.passengerCount()) + 1);
  }

  self.removePassenger = function () {
    if (self.passengerCount() > 1)
      self.passengerCount(parseInt(self.passengerCount()) - 1);
  }

  self.sort = function (context, event) {
    self.defaultShortBy(event.target.dataset.sort);
  }

  self.search = function () {
    let flights = self.flights();
    flights = flights.filter((v) => v.originAirport.code == self.origin() && v.destinationAirport.code == self.destination())
    self.flights(flights);

    self.changeState('order');
  }

  self.flights.subscribe(function (v) {
    if (self.firstLoad && self.currentState() == 'order') {
      self.firstLoad = !self.firstLoad;
      self.search();
    }
  });

  self.clearAllStages = function () {
    self.currentState('search');
    self.passengerCount(1);
    self.passengerClass('economy');
    self.isPromotionEnabled(false);
    self.selectedFlight(undefined);
    self.defaultShortBy('economy');
    getFlights('assets/data/flights.json', self.flights);

    localStorage.clear();
  };

  self.changeState = function (state) {
    self.currentState(state);

    document.querySelector('#passenger-options-toggler').checked = false;
  };

  self.selectFlight = function (flight) {
    self.selectedFlight(flight);
    self.changeState('result')
  };

  // Popper
  const passenger = document.querySelector('#passenger');
  const passengerOptions = document.querySelector('#passenger-options');

  Popper.createPopper(passenger, passengerOptions, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
};
let flightChallengeViewModel = new FlightChallengeViewModel({
  currentState: localStorage.getItem('currentState') || 'search',
  passengerCount: localStorage.getItem('passengerCount') || 1,
  passengerClass: localStorage.getItem('passengerClass') || 'economy',
  isPromotionEnabled: localStorage.getItem('isPromotionEnabled') || 'false',
  selectedFlight: JSON.parse(localStorage.getItem('selectedFlight') || '[]'),
  origin: JSON.parse(localStorage.getItem('origin')),
  destination: JSON.parse(localStorage.getItem('destination')),
});
ko.applyBindings(flightChallengeViewModel);

flightChallengeViewModel.defaultShortBy.subscribe(function (v) {
  let flights = flightChallengeViewModel.flights();
  if (v == 'arrival') {
    flights = flights.sort((f, s) => f.fareCategories.ECONOMY.subcategories[0].price.amount - s.fareCategories.ECONOMY.subcategories[0].price.amount)
  } else {
    flights = flights.sort((f, s) => f.departureDateTimeDisplay.split(':')[0] - s.departureDateTimeDisplay.split(':')[0])
  }
  flightChallengeViewModel.flights(flights);
});

flightChallengeViewModel.currentState.subscribe(function (v) {
  if (flightChallengeViewModel.flights().length != 0) {
    localStorage.setItem('currentState', v)
  }
});

flightChallengeViewModel.passengerCount.subscribe(function (v) {
  localStorage.setItem('passengerCount', v)
});

flightChallengeViewModel.passengerClass.subscribe(function (v) {
  localStorage.setItem('passengerClass', v)
});

flightChallengeViewModel.isPromotionEnabled.subscribe(function (v) {
  localStorage.setItem('isPromotionEnabled', v)
});

flightChallengeViewModel.selectedFlight.subscribe(function (v) {
  localStorage.setItem('selectedFlight', JSON.stringify(v))
});

flightChallengeViewModel.origin.subscribe(function (v) {
  localStorage.setItem('origin', JSON.stringify(v))
});

flightChallengeViewModel.destination.subscribe(function (v) {
  localStorage.setItem('destination', JSON.stringify(v))
});


function getFlights(url, target) {
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', url, true);
  req.onload = function () {
    let data = JSON.parse(req.responseText);
    data = data.map(e => {
      e.preferedClass = ko.observable(undefined);
      return e;
    });
    target(data);
  };
  req.send(null);
}

function getCities(url, target) {
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', url, true);
  req.onload = function () {
    target(JSON.parse(req.responseText));
    flightChallengeViewModel.origin(flightChallengeViewModel.data.origin || 'IST');
    flightChallengeViewModel.destination(flightChallengeViewModel.data.destination || 'AYT');
  };
  req.send(null);
}
