var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let host = 'http://127.0.0.1:52401/';

describe("App Tests", () => {
  test('has city data', () => {
    return getCities(host + 'assets/data/cities.json').then(data => {
      expect(data).not.toBeUndefined();
    });
  });
  test('cities are valid json', () => {
    return getCities(host + 'assets/data/cities.json').then(data => {
      expect(() => JSON.parse(data)).not.toThrow();
    });
  });

  test('cities has text and v key', () => {
    return getCities(host + 'assets/data/cities.json').then(data => {
      data = JSON.parse(data);
      expect(data[0].text).not.toBeUndefined();
      expect(data[0].v).not.toBeUndefined();
    });
  });

})

function getCities(url, target) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    // req.overrideMimeType("application/json");
    req.open('GET', url, true);
    req.onload = function () {
      resolve(req.responseText);
    };
    req.send(null);
  });

}
