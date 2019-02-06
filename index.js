let store = {drivers: [], passengers: [], trips: []}
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
  constructor (name) {
    this.name = name;
    this.id = ++driverId;

    store.drivers.push(this);
  };

  trips() {
    return store.trips.filter(
      function(trips) {
        return driverId === this.id;
      }.bind(this)
    )
  };

  passengers() {
    const trips = this.trips();
    const results = [];
    trips.forEach(trip => {
      results.push(store.passengers.filter(
        function(passengers) {
          return trip.passengerId === passengers.id
        }.bind(this))
      )
    })
    return results.flat()
  }

}

class Passenger {
  constructor (name) {
    this.name = name;
    this.id = ++passengerId;

    store.passengers.push(this);
  };

  trips() {
    return store.trips.filter(
      function(trips) {
        return trips.passengerId === this.id;
      }.bind(this)
    )
  };

  drivers() {
    const trips = this.trips();
    const results = [];
    trips.forEach(trip => {
      results.push(store.drivers.filter(
        function(drivers) {
          return trip.driverId === drivers.id
        }.bind(this))
      )
    })
    return results.flat()
  }

};

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    this.driverId = driver.id;
    this.passengerId = passenger.id;

    store.trips.push(this);
  };

  passenger() {
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    );
  };

  driver() {
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId
      }.bind(this)
    );
  };

}
