'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactForm = require('react-form');

var _BackableVehicle = require('../build/contracts/BackableVehicle.json');

var _BackableVehicle2 = _interopRequireDefault(_BackableVehicle);

var _getWeb = require('./utils/getWeb3');

var _getWeb2 = _interopRequireDefault(_getWeb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ian/provenance/pages/App.js';


var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.state = {
      web3: null
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.

      _getWeb2.default.then(function (results) {
        _this2.setState({
          web3: results.web3
        });
      });
    }
  }, {
    key: 'instantiateContract',
    value: function instantiateContract(description) {
      var contract = require('truffle-contract');
      var backableVehicle = contract(_BackableVehicle2.default);
      backableVehicle.setProvider(this.state.web3.currentProvider);

      // register the work
      this.state.web3.eth.getAccounts(function (error, accounts) {
        backableVehicle.new(description, { from: accounts[0] });
      });
    }
  }, {
    key: 'listWork',
    value: function listWork(submittedValues) {
      var contract = require('truffle-contract');
      var backableVehicle = contract(_BackableVehicle2.default);
      backableVehicle.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var work = backableVehicle.at(submittedValues.workAddress);
        work.listForSale(submittedValues.buyerAddress, web3.toWei(submittedValues.price, "ether"), { from: accounts[0] });
      });
    }
  }, {
    key: 'buyWork',
    value: function buyWork(submittedValues) {
      var contract = require('truffle-contract');
      var backableVehicle = contract(_BackableVehicle2.default);
      backableVehicle.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var work = backableVehicle.at(submittedValues.workAddress);
        work.salePrice.call().then(function (results) {
          work.purchaseListing({ from: accounts[0], value: results });
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', { className: 'App', __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, 'Register Work:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this3.instantiateContract(submittedValues.description);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'registrationForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          }
        }, _react2.default.createElement('label', { htmlFor: 'description', __source: {
            fileName: _jsxFileName,
            lineNumber: 69
          }
        }, 'Art Description: '), _react2.default.createElement(_reactForm.Text, { field: 'description', id: 'description', __source: {
            fileName: _jsxFileName,
            lineNumber: 70
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 71
          }
        }, 'Register'));
      }), 'List Work:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this3.listWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'listForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 78
          }
        }, _react2.default.createElement('label', { htmlFor: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          }
        }, 'Work Address: '), _react2.default.createElement(_reactForm.Text, { field: 'workAddress', id: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          }
        }), _react2.default.createElement('label', { htmlFor: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }, 'Buyer Address: '), _react2.default.createElement(_reactForm.Text, { field: 'buyerAddress', id: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 82
          }
        }), _react2.default.createElement('label', { htmlFor: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 83
          }
        }, 'Price: '), _react2.default.createElement(_reactForm.Text, { field: 'price', id: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }, 'List'));
      }), 'Buy Work:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this3.buyWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'buyForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 92
          }
        }, _react2.default.createElement('label', { htmlFor: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          }
        }, 'Work Address: '), _react2.default.createElement(_reactForm.Text, { field: 'workAddress', id: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        }, 'Buy'));
      }));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL0FwcC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkZvcm0iLCJUZXh0IiwiQmFja2FibGVWZWhpY2xlIiwiZ2V0V2ViMyIsIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3ZWIzIiwidGhlbiIsInNldFN0YXRlIiwicmVzdWx0cyIsImRlc2NyaXB0aW9uIiwiY29udHJhY3QiLCJyZXF1aXJlIiwiYmFja2FibGVWZWhpY2xlIiwic2V0UHJvdmlkZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJldGgiLCJnZXRBY2NvdW50cyIsImVycm9yIiwiYWNjb3VudHMiLCJuZXciLCJmcm9tIiwic3VibWl0dGVkVmFsdWVzIiwid29yayIsImF0Iiwid29ya0FkZHJlc3MiLCJsaXN0Rm9yU2FsZSIsImJ1eWVyQWRkcmVzcyIsInRvV2VpIiwicHJpY2UiLCJzYWxlUHJpY2UiLCJjYWxsIiwicHVyY2hhc2VMaXN0aW5nIiwidmFsdWUiLCJpbnN0YW50aWF0ZUNvbnRyYWN0IiwiZm9ybUFwaSIsInN1Ym1pdEZvcm0iLCJsaXN0V29yayIsImJ1eVdvcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTTs7QUFDZixBQUFPLEFBQXFCOzs7O0FBQzVCLEFBQU8sQUFBYTs7Ozs7Ozs7O0ksQUFFZDsrQkFDSjs7ZUFBQSxBQUFZLE9BQU87d0NBQUE7O2dJQUFBLEFBQ1gsQUFFTjs7VUFBQSxBQUFLO1lBSFksQUFHakIsQUFBYSxBQUNMO0FBREssQUFDWDtXQUVIOzs7Ozt5Q0FFb0I7bUJBQ25COztBQUNBO0FBRUE7O3VCQUFBLEFBQ0MsS0FBSyxtQkFBVyxBQUNmO2VBQUEsQUFBSztnQkFDRyxRQURSLEFBQWMsQUFDRSxBQUVqQjtBQUhlLEFBQ1o7QUFISixBQU1EOzs7O3dDLEFBRW1CLGFBQWEsQUFDL0I7VUFBTSxXQUFOLEFBQU0sQUFBVyxBQUNqQjtVQUFNLGtCQUFOLEFBQXdC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