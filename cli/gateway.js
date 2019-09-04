let noble = require('noble');
let advlib = require('advlib');
let axios = require('axios');

let url = 'https://bluebase-backend.herokuapp.com';
let key = process.env.GATEWAY_KEY;
let scanningWindow = 60000;
let scanPeriod = 60000;
let scanIntervalTimeout;
let whitelist = [];
let callback;

function registerGateway() {
  axios.request({
    url: url + '/api/gateway',
    data: {
      gatewayId: noble._bindings._hci.address,
      gatewayType: 'noble',
      mac: noble._bindings._hci.address,
      name: 'Unnamed Gateway'
    },
    headers: {
      Authorization: key,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}

function start(aKey, aCallback) {
  key = aKey;
  callback = aCallback;
  noble.on('stateChange', state => {
    if (state === 'poweredOn') {
      registerGateway();
      noble.startScanning([]);
      setInterval(() => {
        startScan();
      }, scanPeriod + scanningWindow);
    } else {
      noble.stopScanning();
    }
  });
  startDiscovery();
}

function startScan() {
  noble.startScanning([]);
  scanIntervalTimeout = setTimeout(() => {
    noble.stopScanning();
  }, scanningWindow);
}

function parseServiceData(uuid, serviceData) {
  const switched = advlib.ble.data.gap.solicitation.process(uuid);
  return advlib.ble.data.gap.servicedata.process(switched + serviceData);
}
function getBatteryDataFromServiceData(obj) {
  if (obj.minew) {
    return {
      batteryPercentage: parseInt(obj.minew.batteryPercent, 10)
    };
  } else if (obj.eddystone && obj.eddystone.type === 'TLM') {
    return {
      batteryVoltage: parseInt(obj.eddystone.batteryVoltage.split('mV')[0], 10)
    };
  }
}

function startDiscovery() {
  let batteryObj = {};
  noble.on('discover', peripheral => {
    if (whitelist.length === 0 || !whitelist.indexOf(peripheral.address)) {
      for (const serviceData of peripheral.advertisement.serviceData) {
        batteryObj = getBatteryDataFromServiceData(
          parseServiceData(serviceData.uuid, serviceData.data.toString('hex'))
        );
      }

      const requestPayload = {
        gatewayId: noble._bindings._hci.address,
        advertisement: JSON.stringify(peripheral.advertisement),
        mac: peripheral.address,
        rssi: String(peripheral.rssi),
        name: 'test',
        gatewayType: 'noble'
      };
      axios
        .request({
          url: url + '/api/advertisement',
          data: requestPayload,
          headers: {
            Authorization: key,
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        .then(() => {
          callback(requestPayload);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  });
}

module.exports = {
  registerGateway: registerGateway,
  start: start,
  startDiscovery: startDiscovery
};
