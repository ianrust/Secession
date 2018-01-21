'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWeb3 = new _promise2.default(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function () {
    var results;
    var web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new _web2.default(web3.currentProvider);

      results = {
        web3: web3
      };

      console.log('Injected web3 detected.');

      resolve(results);
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new _web2.default.providers.HttpProvider('http://127.0.0.1:9545');

      web3 = new _web2.default(provider);

      results = {
        web3: web3
      };

      console.log('No web3 instance injected, using Local web3.');

      resolve(results);
    }
  });
});

exports.default = getWeb3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3V0aWxzL2dldFdlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsImdldFdlYjMiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHMiLCJ3ZWIzIiwiY3VycmVudFByb3ZpZGVyIiwiY29uc29sZSIsImxvZyIsInByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTzs7Ozs7O0FBRVAsSUFBSSxnQ0FBc0IsVUFBQSxBQUFTLFNBQVQsQUFBa0IsUUFBUSxBQUNsRDtBQUNBO1NBQUEsQUFBTyxpQkFBUCxBQUF3QixRQUFRLFlBQVcsQUFDekM7UUFBQSxBQUFJLEFBQ0o7UUFBSSxPQUFPLE9BQVgsQUFBa0IsQUFFbEI7O0FBQ0E7UUFBSSxPQUFBLEFBQU8sU0FBWCxBQUFvQixhQUFhLEFBQy9CO0FBQ0E7YUFBTyxBQUFJLGtCQUFLLEtBQWhCLEFBQU8sQUFBYyxBQUVyQjs7O2NBQUEsQUFBVSxBQUNGLEFBR1I7QUFKVSxBQUNSOztjQUdGLEFBQVEsSUFBUixBQUFZLEFBRVo7O2NBQUEsQUFBUSxBQUNUO0FBWEQsV0FXTyxBQUNMO0FBQ0E7QUFDQTtVQUFJLFdBQVcsSUFBSSxjQUFBLEFBQUssVUFBVCxBQUFtQixhQUFsQyxBQUFlLEFBQWdDLEFBRS9DOzthQUFPLEFBQUksa0JBQVgsQUFBTyxBQUFTLEFBRWhCOzs7Y0FBQSxBQUFVLEFBQ0YsQUFHUjtBQUpVLEFBQ1I7O2NBR0YsQUFBUSxJQUFSLEFBQVksQUFFWjs7Y0FBQSxBQUFRLEFBQ1Q7QUFDRjtBQS9CRCxBQWdDRDtBQWxDRCxBQUFjLEFBb0NkLENBcENjOztrQkFvQ2QsQUFBZSIsImZpbGUiOiJnZXRXZWIzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pYW4vcHJvdmVuYW5jZSJ9