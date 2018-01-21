webpackHotUpdate(5,{

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(45);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactForm = __webpack_require__(486);

var _SplitPurchaser = __webpack_require__(519);

var _SplitPurchaser2 = _interopRequireDefault(_SplitPurchaser);

var _BackableVehicle = __webpack_require__(520);

var _BackableVehicle2 = _interopRequireDefault(_BackableVehicle);

var _getWeb = __webpack_require__(521);

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
      var contract = __webpack_require__(421);
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
      var contract = __webpack_require__(421);
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
      var contract = __webpack_require__(421);
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
      var contract = __webpack_require__(421);
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

      var contract = __webpack_require__(421);
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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/ian/provenance/pages/Split.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/ian/provenance/pages/Split.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (true) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/Split")
  
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5iYzEzZmZjMmExZjUzYzI0MzlkMC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvU3BsaXQuanM/MjhmODA2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtLCBUZXh0IH0gZnJvbSAncmVhY3QtZm9ybSc7XG5pbXBvcnQgU3BsaXRQdXJjaGFzZXIgZnJvbSAnLi4vYnVpbGQvY29udHJhY3RzL1NwbGl0UHVyY2hhc2VyLmpzb24nXG5pbXBvcnQgQmFja2FibGVWZWhpY2xlIGZyb20gJy4uL2J1aWxkL2NvbnRyYWN0cy9CYWNrYWJsZVZlaGljbGUuanNvbidcbmltcG9ydCBnZXRXZWIzIGZyb20gJy4vdXRpbHMvZ2V0V2ViMydcblxuY2xhc3MgU3BsaXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGFrZTogMCxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgLy8gR2V0IG5ldHdvcmsgcHJvdmlkZXIgYW5kIHdlYjMgaW5zdGFuY2UuXG4gICAgLy8gU2VlIHV0aWxzL2dldFdlYjMgZm9yIG1vcmUgaW5mby5cblxuICAgIGdldFdlYjNcbiAgICAudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB3ZWIzOiByZXN1bHRzLndlYjNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGluc3RhbnRpYXRlQ29udHJhY3Qoc3VibWl0dGVkVmFsdWVzKSB7XG4gICAgY29uc3QgY29udHJhY3QgPSByZXF1aXJlKCd0cnVmZmxlLWNvbnRyYWN0JylcbiAgICBjb25zdCBzcGxpdFB1cmNoYXNlciA9IGNvbnRyYWN0KFNwbGl0UHVyY2hhc2VyKVxuICAgIHNwbGl0UHVyY2hhc2VyLnNldFByb3ZpZGVyKHRoaXMuc3RhdGUud2ViMy5jdXJyZW50UHJvdmlkZXIpXG5cbiAgICAvLyByZWdpc3RlciB0aGUgd29ya1xuICAgIHRoaXMuc3RhdGUud2ViMy5ldGguZ2V0QWNjb3VudHMoKGVycm9yLCBhY2NvdW50cykgPT4ge1xuICAgICAgc3BsaXRQdXJjaGFzZXIubmV3KHN1Ym1pdHRlZFZhbHVlcy5zaGFyZXMsIHN1Ym1pdHRlZFZhbHVlcy53b3JrQWRkcmVzcywge2Zyb206IGFjY291bnRzWzBdfSlcbiAgICB9KVxuICB9O1xuXG4gIHRyYW5zZmVyKHN1Ym1pdHRlZFZhbHVlcykge1xuICAgIGNvbnN0IGNvbnRyYWN0ID0gcmVxdWlyZSgndHJ1ZmZsZS1jb250cmFjdCcpXG4gICAgY29uc3Qgc3BsaXRQdXJjaGFzZXIgPSBjb250cmFjdChTcGxpdFB1cmNoYXNlcilcbiAgICBzcGxpdFB1cmNoYXNlci5zZXRQcm92aWRlcih0aGlzLnN0YXRlLndlYjMuY3VycmVudFByb3ZpZGVyKVxuXG4gICAgdGhpcy5zdGF0ZS53ZWIzLmV0aC5nZXRBY2NvdW50cygoZXJyb3IsIGFjY291bnRzKSA9PiB7XG4gICAgICBsZXQgc3BsaXQgPSBzcGxpdFB1cmNoYXNlci5hdChzdWJtaXR0ZWRWYWx1ZXMucm95YWx0eUFkZHJlc3MpO1xuICAgICAgc3BsaXQudHJhbnNmZXIoc3VibWl0dGVkVmFsdWVzLnRvQWRkcmVzcywgc3VibWl0dGVkVmFsdWVzLnNoYXJlcywge2Zyb206IGFjY291bnRzWzBdfSlcbiAgICB9KVxuICB9XG5cbiAgbGlzdFdvcmsoc3VibWl0dGVkVmFsdWVzKSB7XG4gICAgY29uc3QgY29udHJhY3QgPSByZXF1aXJlKCd0cnVmZmxlLWNvbnRyYWN0JylcbiAgICBjb25zdCBzcGxpdFB1cmNoYXNlciA9IGNvbnRyYWN0KFNwbGl0UHVyY2hhc2VyKVxuICAgIHNwbGl0UHVyY2hhc2VyLnNldFByb3ZpZGVyKHRoaXMuc3RhdGUud2ViMy5jdXJyZW50UHJvdmlkZXIpXG5cbiAgICB0aGlzLnN0YXRlLndlYjMuZXRoLmdldEFjY291bnRzKChlcnJvciwgYWNjb3VudHMpID0+IHtcbiAgICAgIGxldCBzcGxpdCA9IHNwbGl0UHVyY2hhc2VyLmF0KHN1Ym1pdHRlZFZhbHVlcy5yb3lhbHR5QWRkcmVzcyk7XG4gICAgICBzcGxpdC5saXN0VmVoaWNsZShzdWJtaXR0ZWRWYWx1ZXMuYnV5ZXJBZGRyZXNzLCAgd2ViMy50b1dlaShzdWJtaXR0ZWRWYWx1ZXMucHJpY2UsIFwiZXRoZXJcIiksIHtmcm9tOiBhY2NvdW50c1swXX0pXG4gICAgfSlcbiAgfVxuXG4gIGJ1eVdvcmsoc3VibWl0dGVkVmFsdWVzKSB7XG4gICAgY29uc3QgY29udHJhY3QgPSByZXF1aXJlKCd0cnVmZmxlLWNvbnRyYWN0JylcbiAgICBjb25zdCBzcGxpdFB1cmNoYXNlciA9IGNvbnRyYWN0KFNwbGl0UHVyY2hhc2VyKVxuICAgIHNwbGl0UHVyY2hhc2VyLnNldFByb3ZpZGVyKHRoaXMuc3RhdGUud2ViMy5jdXJyZW50UHJvdmlkZXIpXG5cbiAgICB0aGlzLnN0YXRlLndlYjMuZXRoLmdldEFjY291bnRzKChlcnJvciwgYWNjb3VudHMpID0+IHtcbiAgICAgIGxldCBzcGxpdCA9IHNwbGl0UHVyY2hhc2VyLmF0KHN1Ym1pdHRlZFZhbHVlcy5yb3lhbHR5QWRkcmVzcyk7XG4gICAgICBjb25zb2xlLmxvZyhcImhlcmVcIilcbiAgICAgIGNvbnNvbGUubG9nKHNwbGl0KVxuICAgICAgc3BsaXQuZ2V0UHJpY2UuY2FsbCgpLnRoZW4oIHJlc3VsdHMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKVxuICAgICAgICBzcGxpdC5wdXJjaGFzZVZlaGljbGUoe2Zyb206IGFjY291bnRzWzBdLCB2YWx1ZTogcmVzdWx0c30pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBnZXRTdGFrZShzdWJtaXR0ZWRWYWx1ZXMpIHtcbiAgICBjb25zdCBjb250cmFjdCA9IHJlcXVpcmUoJ3RydWZmbGUtY29udHJhY3QnKVxuICAgIGNvbnN0IHNwbGl0UHVyY2hhc2VyID0gY29udHJhY3QoU3BsaXRQdXJjaGFzZXIpXG4gICAgc3BsaXRQdXJjaGFzZXIuc2V0UHJvdmlkZXIodGhpcy5zdGF0ZS53ZWIzLmN1cnJlbnRQcm92aWRlcilcblxuICAgIHRoaXMuc3RhdGUud2ViMy5ldGguZ2V0QWNjb3VudHMoKGVycm9yLCBhY2NvdW50cykgPT4ge1xuICAgICAgbGV0IHNwbGl0ID0gc3BsaXRQdXJjaGFzZXIuYXQoc3VibWl0dGVkVmFsdWVzLnJveWFsdHlBZGRyZXNzKTtcbiAgICAgIHNwbGl0LmJhbGFuY2VPZihhY2NvdW50c1swXSkudGhlbiggcmVzdWx0cyA9PiB7XG4gICAgICAgIGxldCBvdXJzID0gcmVzdWx0c1xuICAgICAgICBzcGxpdC50b3RhbFN1cHBseS5jYWxsKCkudGhlbiggcmVzdWx0cyA9PntcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc3Rha2U6IG91cnMvcmVzdWx0cyoxMDAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJTcGxpdFwiPlxuICAgICAgICBDcmVhdGUgYSByb3lhbHR5IGNvbnRyYWN0OlxuICAgICAgICA8Rm9ybSBvblN1Ym1pdD17c3VibWl0dGVkVmFsdWVzID0+IHRoaXMuaW5zdGFudGlhdGVDb250cmFjdChzdWJtaXR0ZWRWYWx1ZXMpfT5cbiAgICAgICAgeyBmb3JtQXBpID0+IChcbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17Zm9ybUFwaS5zdWJtaXRGb3JtfSBpZD1cInNwbGl0Rm9ybVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ3b3JrQWRkcmVzc1wiPldvcmsgQWRkcmVzczogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwid29ya0FkZHJlc3NcIiBpZD1cIndvcmtBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2hhcmVzXCI+TnVtYmVyIG9mIFNoYXJlczogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwic2hhcmVzXCIgaWQ9XCJzaGFyZXNcIiAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q3JlYXRlIFJveWFsdHkgUHVyY2hhc2VyPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApfVxuICAgICAgICA8L0Zvcm0+XG4gICAgICAgIFNlbmQgcm95YWx0eSBzaGFyZXM6XG4gICAgICAgIDxGb3JtIG9uU3VibWl0PXtzdWJtaXR0ZWRWYWx1ZXMgPT4gdGhpcy50cmFuc2ZlcihzdWJtaXR0ZWRWYWx1ZXMpfT5cbiAgICAgICAgeyBmb3JtQXBpID0+IChcbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17Zm9ybUFwaS5zdWJtaXRGb3JtfSBpZD1cInNwbGl0Rm9ybVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJyb3lhbHR5QWRkcmVzc1wiPlJveWFsdHkgQ29udHJhY3QgQWRkcmVzczogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwicm95YWx0eUFkZHJlc3NcIiBpZD1cInJveWFsdHlBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwidG9BZGRyZXNzXCI+VG86IDwvbGFiZWw+XG4gICAgICAgICAgICA8VGV4dCBmaWVsZD1cInRvQWRkcmVzc1wiIGlkPVwidG9BZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwic2hhcmVzXCI+TnVtYmVyIG9mIFNoYXJlczogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwic2hhcmVzXCIgaWQ9XCJzaGFyZXNcIiAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+VHJhbnNmZXI8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICl9XG4gICAgICAgIDwvRm9ybT5cbiAgICAgICAgQnV5IHRoZSB3b3JrOlxuICAgICAgICA8Rm9ybSBvblN1Ym1pdD17c3VibWl0dGVkVmFsdWVzID0+IHRoaXMuYnV5V29yayhzdWJtaXR0ZWRWYWx1ZXMpfT5cbiAgICAgICAgeyBmb3JtQXBpID0+IChcbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17Zm9ybUFwaS5zdWJtaXRGb3JtfSBpZD1cInNwbGl0Rm9ybVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJyb3lhbHR5QWRkcmVzc1wiPlJveWFsdHkgQ29udHJhY3QgQWRkcmVzczogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwicm95YWx0eUFkZHJlc3NcIiBpZD1cInJveWFsdHlBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkJ1eTwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKX1cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgICBMaXN0IHRoZSBvd25lZCB3b3JrIGZvciBzYWxlOlxuICAgICAgICA8Rm9ybSBvblN1Ym1pdD17c3VibWl0dGVkVmFsdWVzID0+IHRoaXMubGlzdFdvcmsoc3VibWl0dGVkVmFsdWVzKX0+XG4gICAgICAgIHsgZm9ybUFwaSA9PiAoXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm1BcGkuc3VibWl0Rm9ybX0gaWQ9XCJzcGxpdEZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicm95YWx0eUFkZHJlc3NcIj5Sb3lhbHR5IENvbnRyYWN0IEFkZHJlc3M6IDwvbGFiZWw+XG4gICAgICAgICAgICA8VGV4dCBmaWVsZD1cInJveWFsdHlBZGRyZXNzXCIgaWQ9XCJyb3lhbHR5QWRkcmVzc1wiIC8+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImJ1eWVyQWRkcmVzc1wiPkJ1eWVyIEFkZHJlc3M6IDwvbGFiZWw+XG4gICAgICAgICAgICA8VGV4dCBmaWVsZD1cImJ1eWVyQWRkcmVzc1wiIGlkPVwiYnV5ZXJBZGRyZXNzXCIgLz5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicHJpY2VcIj5QcmljZTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxUZXh0IGZpZWxkPVwicHJpY2VcIiBpZD1cInByaWNlXCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkxpc3Q8L2J1dHRvbj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICl9XG4gICAgICAgIDwvRm9ybT5cbiAgICAgICAgR2V0IFN0YWtlOlxuICAgICAgICA8Rm9ybSBvblN1Ym1pdD17c3VibWl0dGVkVmFsdWVzID0+IHRoaXMuZ2V0U3Rha2Uoc3VibWl0dGVkVmFsdWVzKX0+XG4gICAgICAgIHsgZm9ybUFwaSA9PiAoXG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm1BcGkuc3VibWl0Rm9ybX0gaWQ9XCJzcGxpdEZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicm95YWx0eUFkZHJlc3NcIj5Sb3lhbHR5IENvbnRyYWN0IEFkZHJlc3M6IDwvbGFiZWw+XG4gICAgICAgICAgICA8VGV4dCBmaWVsZD1cInJveWFsdHlBZGRyZXNzXCIgaWQ9XCJyb3lhbHR5QWRkcmVzc1wiIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5nZXRTdGFrZTwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKX1cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIFN0YWtlOiB7dGhpcy5zdGF0ZS5zdGFrZX0lXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGxpdFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXMvU3BsaXQuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFHQTs7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTs7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBWUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVEE7QUFjQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEE7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQWNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=