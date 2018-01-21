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

var _SplitPurchaser = require('../build/contracts/SplitPurchaser.json');

var _SplitPurchaser2 = _interopRequireDefault(_SplitPurchaser);

var _BackableVehicle = require('../build/contracts/BackableVehicle.json');

var _BackableVehicle2 = _interopRequireDefault(_BackableVehicle);

var _getWeb = require('./utils/getWeb3');

var _getWeb2 = _interopRequireDefault(_getWeb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ian/provenance/pages/Split.js';


var Split = function (_Component) {
  (0, _inherits3.default)(Split, _Component);

  function Split(props) {
    (0, _classCallCheck3.default)(this, Split);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Split.__proto__ || (0, _getPrototypeOf2.default)(Split)).call(this, props));

    _this.state = {
      stake: 0
    };
    return _this;
  }

  (0, _createClass3.default)(Split, [{
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
    value: function instantiateContract(submittedValues) {
      var contract = require('truffle-contract');
      var splitPurchaser = contract(_SplitPurchaser2.default);
      splitPurchaser.setProvider(this.state.web3.currentProvider);

      // register the work
      this.state.web3.eth.getAccounts(function (error, accounts) {
        splitPurchaser.new(submittedValues.shares, submittedValues.workAddress, { from: accounts[0] });
      });
    }
  }, {
    key: 'transfer',
    value: function transfer(submittedValues) {
      var contract = require('truffle-contract');
      var splitPurchaser = contract(_SplitPurchaser2.default);
      splitPurchaser.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var split = splitPurchaser.at(submittedValues.royaltyAddress);
        split.transfer(submittedValues.toAddress, submittedValues.shares, { from: accounts[0] });
      });
    }
  }, {
    key: 'listWork',
    value: function listWork(submittedValues) {
      var contract = require('truffle-contract');
      var splitPurchaser = contract(_SplitPurchaser2.default);
      splitPurchaser.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var split = splitPurchaser.at(submittedValues.royaltyAddress);
        split.listVehicle(submittedValues.buyerAddress, web3.toWei(submittedValues.price, "ether"), { from: accounts[0] });
      });
    }
  }, {
    key: 'buyWork',
    value: function buyWork(submittedValues) {
      var contract = require('truffle-contract');
      var splitPurchaser = contract(_SplitPurchaser2.default);
      splitPurchaser.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var split = splitPurchaser.at(submittedValues.royaltyAddress);
        console.log("here");
        console.log(split);
        split.getPrice.call().then(function (results) {
          console.log(results);
          split.purchaseVehicle({ from: accounts[0], value: results });
        });
      });
    }
  }, {
    key: 'getStake',
    value: function getStake(submittedValues) {
      var _this3 = this;

      var contract = require('truffle-contract');
      var splitPurchaser = contract(_SplitPurchaser2.default);
      splitPurchaser.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var split = splitPurchaser.at(submittedValues.royaltyAddress);
        split.balanceOf(accounts[0]).then(function (results) {
          var ours = results;
          split.totalSupply.call().then(function (results) {
            _this3.setState({ stake: ours / results * 100 });
          });
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement('div', { className: 'Split', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, 'Create a royalty contract:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.instantiateContract(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          }
        }, _react2.default.createElement('label', { htmlFor: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          }
        }, 'Work Address: '), _react2.default.createElement(_reactForm.Text, { field: 'workAddress', id: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          }
        }), _react2.default.createElement('label', { htmlFor: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          }
        }, 'Number of Shares: '), _react2.default.createElement(_reactForm.Text, { field: 'shares', id: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          }
        }, 'Create Royalty Purchaser'));
      }), 'Send royalty shares:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.transfer(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 111
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          }
        }), _react2.default.createElement('label', { htmlFor: 'toAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          }
        }, 'To: '), _react2.default.createElement(_reactForm.Text, { field: 'toAddress', id: 'toAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          }
        }), _react2.default.createElement('label', { htmlFor: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 115
          }
        }, 'Number of Shares: '), _react2.default.createElement(_reactForm.Text, { field: 'shares', id: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          }
        }, 'Transfer'));
      }), 'Buy the work:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.buyWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 127
          }
        }, 'Buy'));
      }), 'List the owned work for sale:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.listWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 134
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          }
        }), _react2.default.createElement('label', { htmlFor: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          }
        }, 'Buyer Address: '), _react2.default.createElement(_reactForm.Text, { field: 'buyerAddress', id: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 138
          }
        }), _react2.default.createElement('label', { htmlFor: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 139
          }
        }, 'Price: '), _react2.default.createElement(_reactForm.Text, { field: 'price', id: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 140
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 141
          }
        }, 'List'));
      }), 'Get Stake:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.getStake(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 148
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 151
          }
        }, 'getStake'));
      }), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }, 'Stake: ', this.state.stake, '%'));
    }
  }]);

  return Split;
}(_react.Component);

exports.default = Split;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL1NwbGl0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiRm9ybSIsIlRleHQiLCJTcGxpdFB1cmNoYXNlciIsIkJhY2thYmxlVmVoaWNsZSIsImdldFdlYjMiLCJTcGxpdCIsInByb3BzIiwic3RhdGUiLCJzdGFrZSIsInRoZW4iLCJzZXRTdGF0ZSIsIndlYjMiLCJyZXN1bHRzIiwic3VibWl0dGVkVmFsdWVzIiwiY29udHJhY3QiLCJyZXF1aXJlIiwic3BsaXRQdXJjaGFzZXIiLCJzZXRQcm92aWRlciIsImN1cnJlbnRQcm92aWRlciIsImV0aCIsImdldEFjY291bnRzIiwiZXJyb3IiLCJhY2NvdW50cyIsIm5ldyIsInNoYXJlcyIsIndvcmtBZGRyZXNzIiwiZnJvbSIsInNwbGl0IiwiYXQiLCJyb3lhbHR5QWRkcmVzcyIsInRyYW5zZmVyIiwidG9BZGRyZXNzIiwibGlzdFZlaGljbGUiLCJidXllckFkZHJlc3MiLCJ0b1dlaSIsInByaWNlIiwiY29uc29sZSIsImxvZyIsImdldFByaWNlIiwiY2FsbCIsInB1cmNoYXNlVmVoaWNsZSIsInZhbHVlIiwiYmFsYW5jZU9mIiwib3VycyIsInRvdGFsU3VwcGx5IiwiaW5zdGFudGlhdGVDb250cmFjdCIsImZvcm1BcGkiLCJzdWJtaXRGb3JtIiwiYnV5V29yayIsImxpc3RXb3JrIiwiZ2V0U3Rha2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTTs7QUFDZixBQUFPLEFBQW9COzs7O0FBQzNCLEFBQU8sQUFBcUI7Ozs7QUFDNUIsQUFBTyxBQUFhOzs7Ozs7Ozs7SUFFZCxBO2lDQUNKOztpQkFBQSxBQUFZLE9BQU87d0NBQUE7O29JQUFBLEFBQ1gsQUFDTjs7VUFBQSxBQUFLO2FBRlksQUFFakIsQUFBYSxBQUNKO0FBREksQUFDWDtXQUVIOzs7Ozt5Q0FFb0I7bUJBQ25COztBQUNBO0FBRUE7O3VCQUFB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LEFBQWdDO3NCQUFoQzt3QkFGRixBQUVFLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLFlBQVEsTUFBUixBQUFhO3NCQUFiO3dCQUFBO0FBQUE7V0FKRixBQUNBLEFBR0U7QUFqQ04sQUE0QkUsVUFVQSxpREFBQSxBQUFDLGlDQUFLLFVBQVUsbUNBQUE7aUJBQW1CLE9BQUEsQUFBSyxTQUF4QixBQUFtQixBQUFjO0FBQWpEO29CQUFBO3NCQUFBLEFBQ0U7QUFERjs0QkFDRTsrQkFDQSxjQUFBLFVBQU0sVUFBVSxRQUFoQixBQUF3QixZQUFZLElBQXBDLEFBQXVDO3NCQUF2Qzt3QkFBQSxBQUNFO0FBREY7U0FBQSxrQkFDRSxjQUFBLFdBQU8sU0FBUCxBQUFlO3NCQUFmO3dCQUFBO0FBQUE7V0FERixBQUNFLEFBQ0EsK0NBQUEsQUFBQyxpQ0FBSyxPQUFOLEFBQVksa0JBQWlCLElBQTdCLEFBQWdDO3NCQUFoQzt3QkFGRixBQUVFLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLFdBQU8sU0FBUCxBQUFlO3NCQUFmO3dCQUFBO0FBQUE7V0FIRixBQUdFLEFBQ0Esb0NBQUEsQUFBQyxpQ0FBSyxPQUFOLEFBQVksZ0JBQWUsSUFBM0IsQUFBOEI7c0JBQTlCO3dCQUpGLEFBSUUsQUFDQTtBQURBOzRCQUNBLGNBQUEsV0FBTyxTQUFQLEFBQWU7c0JBQWY7d0JBQUE7QUFBQTtXQUxGLEFBS0UsQUFDQSw0QkFBQSxBQUFDLGlDQUFLLE9BQU4sQUFBWSxTQUFRLElBQXBCLEFBQXVCO3NCQUF2Qjt3QkFORixBQU1FLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLFlBQVEsTUFBUixBQUFhO3NCQUFiO3dCQUFBO0FBQUE7V0FSRixBQUNBLEFBT0U7QUEvQ04sQUFzQ0UsVUFjQSw4QkFBQSxBQUFDLGlDQUFLLFVBQVUsbUNBQUE7aUJBQW1CLE9BQUEsQUFBSyxTQUF4QixBQUFtQixBQUFjO0FBQWpEO29CQUFBO3NCQUFBLEFBQ0U7QUFERjs0QkFDRTsrQkFDQSxjQUFBLFVBQU0sVUFBVSxRQUFoQixBQUF3QixZQUFZLElBQXBDLEFBQXVDO3NCQUF2Qzt3QkFBQSxBQUNFO0FBREY7U0FBQSxrQkFDRSxjQUFBLFdBQU8sU0FBUCxBQUFlO3NCQUFmO3dCQUFBO0FBQUE7V0FERixBQUNFLEFBQ0EsK0NBQUEsQUFBQyxpQ0FBSyxPQUFOLEFBQVksa0JBQWlCLElBQTdCLEFBQWdDO3NCQUFoQzt3QkFGRixBQUVFLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLFlBQVEsTUFBUixBQUFhO3NCQUFiO3dCQUFBO0FBQUE7V0FKRixBQUNBLEFBR0U7QUF6RE4sQUFvREUsQUFTQSwwQkFBQSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FDVSxnQkFBQSxBQUFLLE1BRGYsQUFDcUIsT0EvRHpCLEFBQ0UsQUE2REUsQUFLTDs7Ozs7QUF6SmlCLEEsQUE0SnBCOztrQkFBQSxBQUFlIiwiZmlsZSI6IlNwbGl0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pYW4vcHJvdmVuYW5jZSJ9