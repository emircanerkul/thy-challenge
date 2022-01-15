function FlightChallengeViewModel() {
  let self = this;

  self.state = ['search', 'order', 'result'];
  self.currentState = ko.observable('order');

  self.availableOrigins = ko.observable();
  getJson('assets/data/cities.json', self.availableOrigins);

  console.log(self.availableOrigins);
  self.availableDestinations = self.availableOrigins;

  self.passengerClass = ko.observable('economy');
  self.passengerCount = ko.observable(1);
  self.addPassenger = function () {
    self.passengerCount(self.passengerCount() + 1);
  }
  self.removePassenger = function () {
    if (self.passengerCount() > 1)
      self.passengerCount(self.passengerCount() - 1);
  }

  self.search = function () {
    self.changeState('apply')
  }

  self.flights = ko.observable([0, 0, 0, 0, 0, 0, 0, 0]);

  // Behaviours
  self.changeState = function (state) { self.currentState(state); };

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

ko.applyBindings(new FlightChallengeViewModel());


function getJson(url, target) {
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', url, true);
  req.onload = function () {
    target(JSON.parse(req.responseText));
    // do something with jsonResponse
  };
  req.send(null);
}
