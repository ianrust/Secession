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
        split.backableVehicle.salePrice.call().then(function (results) {
          split.purchaseListing({ from: accounts[0], value: results });
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
            console.log(ours / results);
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
          lineNumber: 92
        }
      }, 'Create a royalty contract:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.instantiateContract(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          }
        }, _react2.default.createElement('label', { htmlFor: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          }
        }, 'Work Address: '), _react2.default.createElement(_reactForm.Text, { field: 'workAddress', id: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          }
        }), _react2.default.createElement('label', { htmlFor: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          }
        }, 'Number of Shares: '), _react2.default.createElement(_reactForm.Text, { field: 'shares', id: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          }
        }, 'Create Royalty Purchaser'));
      }), 'Send royalty shares:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.transfer(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 109
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          }
        }), _react2.default.createElement('label', { htmlFor: 'toAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 111
          }
        }, 'To: '), _react2.default.createElement(_reactForm.Text, { field: 'toAddress', id: 'toAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 112
          }
        }), _react2.default.createElement('label', { htmlFor: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          }
        }, 'Number of Shares: '), _react2.default.createElement(_reactForm.Text, { field: 'shares', id: 'shares', __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 115
          }
        }, 'Transfer'));
      }), 'Buy the work:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.listWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 122
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        }, 'Buy'));
      }), 'List the owned work for sale:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.buyWork(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 132
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 134
          }
        }), _react2.default.createElement('label', { htmlFor: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          }
        }, 'Buyer Address: '), _react2.default.createElement(_reactForm.Text, { field: 'buyerAddress', id: 'buyerAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          }
        }), _react2.default.createElement('label', { htmlFor: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          }
        }, 'Price: '), _react2.default.createElement(_reactForm.Text, { field: 'price', id: 'price', __source: {
            fileName: _jsxFileName,
            lineNumber: 138
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 139
          }
        }, 'List'));
      }), 'Get Stake:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.getStake(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'splitForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          }
        }, _react2.default.createElement('label', { htmlFor: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 147
          }
        }, 'Royalty Contract Address: '), _react2.default.createElement(_reactForm.Text, { field: 'royaltyAddress', id: 'royaltyAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 148
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          }
        }, 'getStake'));
      }), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, 'Stake: ', this.state.stake, '%'));
    }
  }]);

  return Split;
}(_react.Component);

exports.default = Split;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL1NwbGl0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiRm9ybSIsIlRleHQiLCJTcGxpdFB1cmNoYXNlciIsIkJhY2thYmxlVmVoaWNsZSIsImdldFdlYjMiLCJTcGxpdCIsInByb3BzIiwic3RhdGUiLCJzdGFrZSIsInRoZW4iLCJzZXRTdGF0ZSIsIndlYjMiLCJyZXN1bHRzIiwic3VibWl0dGVkVmFsdWVzIiwiY29udHJhY3QiLCJyZXF1aXJlIiwic3BsaXRQdXJjaGFzZXIiLCJzZXRQcm92aWRlciIsImN1cnJlbnRQcm92aWRlciIsImV0aCIsImdldEFjY291bnRzIiwiZXJyb3IiLCJhY2NvdW50cyIsIm5ldyIsInNoYXJlcyIsIndvcmtBZGRyZXNzIiwiZnJvbSIsInNwbGl0IiwiYXQiLCJyb3lhbHR5QWRkcmVzcyIsInRyYW5zZmVyIiwidG9BZGRyZXNzIiwibGlzdFZlaGljbGUiLCJidXllckFkZHJlc3MiLCJ0b1dlaSIsInByaWNlIiwiYmFja2FibGVWZWhpY2xlIiwic2FsZVByaWNlIiwiY2FsbCIsInB1cmNoYXNlTGlzdGluZyIsInZhbHVlIiwiYmFsYW5jZU9mIiwib3VycyIsInRvdGFsU3VwcGx5IiwiY29uc29sZSIsImxvZyIsImluc3RhbnRpYXRlQ29udHJhY3QiLCJmb3JtQXBpIiwic3VibWl0Rm9ybSIsImxpc3RXb3JrIiwiYnV5V29yayIsImdldFN0YWtlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU07O0FBQ2YsQUFBTyxBQUFvQjs7OztBQUMzQixBQUFPLEFBQXFCOzs7O0FBQzVCLEFBQU8sQUFBYTs7Ozs7Ozs7O0lBRWQsQTtpQ0FDSjs7aUJBQUEsQUFBWSxPQUFPO3dDQUFBOztvSUFBQSxBQUNYLEFBQ047O1VBQUEsQUFBSzthQUZZLEFBRWpCLEFBQWEsQUFDSjtBQURJLEFBQ1g7V0FFSDs7Ozs7eUNBRW9CO21CQUNu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aEM7d0JBRkYsQUFFRSxBQUNBO0FBREE7NEJBQ0EsY0FBQSxZQUFRLE1BQVIsQUFBYTtzQkFBYjt3QkFBQTtBQUFBO1dBSkYsQUFDQSxBQUdFO0FBakNOLEFBNEJFLFVBVUEsaURBQUEsQUFBQyxpQ0FBSyxVQUFVLG1DQUFBO2lCQUFtQixPQUFBLEFBQUssUUFBeEIsQUFBbUIsQUFBYTtBQUFoRDtvQkFBQTtzQkFBQSxBQUNFO0FBREY7NEJBQ0U7K0JBQ0EsY0FBQSxVQUFNLFVBQVUsUUFBaEIsQUFBd0IsWUFBWSxJQUFwQyxBQUF1QztzQkFBdkM7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQSxXQUFPLFNBQVAsQUFBZTtzQkFBZjt3QkFBQTtBQUFBO1dBREYsQUFDRSxBQUNBLCtDQUFBLEFBQUMsaUNBQUssT0FBTixBQUFZLGtCQUFpQixJQUE3QixBQUFnQztzQkFBaEM7d0JBRkYsQUFFRSxBQUNBO0FBREE7NEJBQ0EsY0FBQSxXQUFPLFNBQVAsQUFBZTtzQkFBZjt3QkFBQTtBQUFBO1dBSEYsQUFHRSxBQUNBLG9DQUFBLEFBQUMsaUNBQUssT0FBTixBQUFZLGdCQUFlLElBQTNCLEFBQThCO3NCQUE5Qjt3QkFKRixBQUlFLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLFdBQU8sU0FBUCxBQUFlO3NCQUFmO3dCQUFBO0FBQUE7V0FMRixBQUtFLEFBQ0EsNEJBQUEsQUFBQyxpQ0FBSyxPQUFOLEFBQVksU0FBUSxJQUFwQixBQUF1QjtzQkFBdkI7d0JBTkYsQUFNRSxBQUNBO0FBREE7NEJBQ0EsY0FBQSxZQUFRLE1BQVIsQUFBYTtzQkFBYjt3QkFBQTtBQUFBO1dBUkYsQUFDQSxBQU9FO0FBL0NOLEFBc0NFLFVBY0EsOEJBQUEsQUFBQyxpQ0FBSyxVQUFVLG1DQUFBO2lCQUFtQixPQUFBLEFBQUssU0FBeEIsQUFBbUIsQUFBYztBQUFqRDtvQkFBQTtzQkFBQSxBQUNFO0FBREY7NEJBQ0U7K0JBQ0EsY0FBQSxVQUFNLFVBQVUsUUFBaEIsQUFBd0IsWUFBWSxJQUFwQyxBQUF1QztzQkFBdkM7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQSxXQUFPLFNBQVAsQUFBZTtzQkFBZjt3QkFBQTtBQUFBO1dBREYsQUFDRSxBQUNBLCtDQUFBLEFBQUMsaUNBQUssT0FBTixBQUFZLGtCQUFpQixJQUE3QixBQUFnQztzQkFBaEM7d0JBRkYsQUFFRSxBQUNBO0FBREE7NEJBQ0EsY0FBQSxZQUFRLE1BQVIsQUFBYTtzQkFBYjt3QkFBQTtBQUFBO1dBSkYsQUFDQSxBQUdFO0FBekROLEFBb0RFLEFBU0EsMEJBQUEsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBQ1UsZ0JBQUEsQUFBSyxNQURmLEFBQ3FCLE9BL0R6QixBQUNFLEFBNkRFLEFBS0w7Ozs7O0FBdkppQixBLEFBMEpwQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJTcGxpdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaWFuL3Byb3ZlbmFuY2UifQ==