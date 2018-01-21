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

var _jsxFileName = '/Users/ian/provenance/pages/WorkInfo.js';


var WorkInfo = function (_Component) {
  (0, _inherits3.default)(WorkInfo, _Component);

  function WorkInfo(props) {
    (0, _classCallCheck3.default)(this, WorkInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WorkInfo.__proto__ || (0, _getPrototypeOf2.default)(WorkInfo)).call(this, props));

    _this.state = {
      set: false
    };
    return _this;
  }

  (0, _createClass3.default)(WorkInfo, [{
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
    key: 'getWorkInfo',
    value: function getWorkInfo(submittedValues) {
      var _this3 = this;

      var contract = require('truffle-contract');
      var backableVehicle = contract(_BackableVehicle2.default);
      backableVehicle.setProvider(this.state.web3.currentProvider);

      this.state.web3.eth.getAccounts(function (error, accounts) {
        var work = backableVehicle.at(submittedValues.workAddress);

        // Get all the data
        work.owner.call().then(function (results) {
          _this3.setState({ owner: results });
        });
        work.buyer.call().then(function (results) {
          _this3.setState({ buyer: results });
        });
        work.salePrice.call().then(function (results) {
          _this3.setState({ price: web3.fromWei(results, "ether").toNumber() });
        });
        work.description.call().then(function (results) {
          _this3.setState({ description: results });
        });

        _this3.setState({ set: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var form = _react2.default.createElement('div', { className: 'WorkInfo', __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, 'Get Work Info:', _react2.default.createElement(_reactForm.Form, { onSubmit: function onSubmit(submittedValues) {
          return _this4.getWorkInfo(submittedValues);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, function (formApi) {
        return _react2.default.createElement('form', { onSubmit: formApi.submitForm, id: 'infoForm', __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          }
        }, _react2.default.createElement('label', { htmlFor: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          }
        }, 'Work Address: '), _react2.default.createElement(_reactForm.Text, { field: 'workAddress', id: 'workAddress', __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          }
        }), _react2.default.createElement('button', { type: 'submit', __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          }
        }, 'Get Info'));
      }));
      if (this.state.set) {
        return [form, [_react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 72
          }
        }, 'Owner: ', this.state.owner), _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          }
        }, 'Description: ', this.state.description), _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 78
          }
        }, 'Buyer: ', this.state.buyer), _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }, 'Price: ', this.state.price)]];
      } else {
        return form;
      }
    }
  }]);

  return WorkInfo;
}(_react.Component);

exports.default = WorkInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL1dvcmtJbmZvLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiRm9ybSIsIlRleHQiLCJCYWNrYWJsZVZlaGljbGUiLCJnZXRXZWIzIiwiV29ya0luZm8iLCJwcm9wcyIsInN0YXRlIiwic2V0IiwidGhlbiIsInNldFN0YXRlIiwid2ViMyIsInJlc3VsdHMiLCJzdWJtaXR0ZWRWYWx1ZXMiLCJjb250cmFjdCIsInJlcXVpcmUiLCJiYWNrYWJsZVZlaGljbGUiLCJzZXRQcm92aWRlciIsImN1cnJlbnRQcm92aWRlciIsImV0aCIsImdldEFjY291bnRzIiwiZXJyb3IiLCJhY2NvdW50cyIsIndvcmsiLCJhdCIsIndvcmtBZGRyZXNzIiwib3duZXIiLCJjYWxsIiwiYnV5ZXIiLCJzYWxlUHJpY2UiLCJwcmljZSIsImZyb21XZWkiLCJ0b051bWJlciIsImRlc2NyaXB0aW9uIiwiZm9ybSIsImdldFdvcmtJbmZvIiwiZm9ybUFwaSIsInN1Ym1pdEZvcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTTs7QUFDZixBQUFPLEFBQXFCOzs7O0FBQzVCLEFBQU8sQUFBYTs7Ozs7Ozs7O0lBRWQsQTtvQ0FDSjs7b0JBQUEsQUFBWSxPQUFPO3dDQUFBOzswSUFBQSxBQUNYLEFBRU47O1VBQUEsQUFBSztXQUhZLEFBR2pCLEFBQWEsQUFDTjtBQURNLEFBQ1g7V0FFSDs7Ozs7eUNBRW9CO21CQUNuQjs7QUFDQTtBQUVBOzt1QkFBQSxBQUNDLEtBQUssbUJBQVcsQUFDZjtlQUFBLEFBQUs7Z0JBQ0csUUFEUixBQUFjLEFBQ0UsQUFFakI7QUFIZSxBQUNaO0FBSEosQUFNRDs7OztnQ0FFVyxBLGlCQUFpQjttQkFDM0I7O1VBQU0sV0FBTixBQUFNLEFBQVcsQUFDakI7VUFBTSxrQkFBTixBQUF3QixBQUFTLEFBQ2pDO3NCQUFBLEFBQWdCLFlBQVksS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUF2QyxBQUE0QyxBQUU1Qzs7V0FBQSxBQUFLLE1BQUwsQUFBVyxLQUFYLEFBQWdCLElBQWhCLEFBQW9CLFlBQVksVUFBQSxBQUFDLE9BQUQsQUFBUSxVQUFhLEFBQ25EO1lBQUksT0FBTyxnQkFBQSxBQUFnQixHQUFHLGdCQUE5QixBQUFXLEFBQW1DLEFBRTlDOztBQUNBO2FBQUEsQUFBSyxNQUFMLEFBQVcsT0FBWCxBQUFrQixLQUFNLG1CQUFXLEFBQ2pDO2lCQUFBLEFBQUssU0FBUyxFQUFFLE9BQWhCLEFBQWMsQUFBUyxBQUN4QjtBQUZELEFBR0E7YUFBQSxBQUFLLE1BQUwsQUFBVyxPQUFYLEFBQWtCLEtBQU0sbUJBQVcsQUFDakM7aUJBQUEsQUFBSyxTQUFTLEVBQUUsT0FBaEIsQUFBYyxBQUFTLEFBQ3hCO0FBRkQsQUFHQTthQUFBLEFBQUssVUFBTCxBQUFlLE9BQWYsQUFBc0IsS0FBTSxtQkFBVyxBQUNyQztpQkFBQSxBQUFLLFNBQVMsRUFBRSxPQUFPLEtBQUEsQUFBSyxRQUFMLEFBQWEsU0FBYixBQUFzQixTQUE3QyxBQUFjLEFBQVMsQUFBK0IsQUFDdkQ7QUFGRCxBQUdBO2FBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLEtBQU0sbUJBQVcsQUFDdkM7aUJBQUEsQUFBSyxTQUFTLEVBQUUsYUFBaEIsQUFBYyxBQUFlLEFBQzlCO0FBRkQsQUFJQTs7ZUFBQSxBQUFLLFNBQVMsRUFBRSxLQUFoQixBQUFjLEFBQU8sQUFDdEI7QUFsQkQsQUFtQkQ7Ozs7NkJBRVE7bUJBQ1A7O1VBQUksdUJBQ0YsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQTtBQUFBO09BQUEsRUFFRSxrQ0FBQSxBQUFDLGlDQUFLLFVBQVUsbUNBQUE7aUJBQW1CLE9BQUEsQUFBSyxZQUF4QixBQUFtQixBQUFpQjtBQUFwRDtvQkFBQTtzQkFBQSxBQUNFO0FBREY7NEJBQ0U7K0JBQ0EsY0FBQSxVQUFNLFVBQVUsUUFBaEIsQUFBd0IsWUFBWSxJQUFwQyxBQUF1QztzQkFBdkM7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQSxXQUFPLFNBQVAsQUFBZTtzQkFBZjt3QkFBQTtBQUFBO1dBREYsQUFDRSxBQUNBLG1DQUFBLEFBQUMsaUNBQUssT0FBTixBQUFZLGVBQWMsSUFBMUIsQUFBNkI7c0JBQTdCO3dCQUZGLEFBRUUsQUFDQTtBQURBOzRCQUNBLGNBQUEsWUFBUSxNQUFSLEFBQWE7c0JBQWI7d0JBQUE7QUFBQTtXQUpGLEFBQ0EsQUFHRTtBQVJSLEFBQ0UsQUFFRSxBQVdKO1VBQUksS0FBQSxBQUFLLE1BQVQsQUFBZSxLQUFLLEFBQ2xCO2VBQVEsQ0FBQSxBQUNOLE1BQ0EsaUJBQ0UsY0FBQTs7c0JBQUE7d0JBQUE7QUFBQTtBQUFBLFNBQUEsRUFDVSxnQkFBQSxBQUFLLE1BRmpCLEFBQ0UsQUFDcUIsd0JBRXJCLGNBQUE7O3NCQUFBO3dCQUFBO0FBQUE7QUFBQSxTQUFBLEVBQ2dCLHNCQUFBLEFBQUssTUFMdkIsQUFJRSxBQUMyQiw4QkFFM0IsY0FBQTs7c0JBQUE7d0JBQUE7QUFBQTtBQUFBLFNBQUEsRUFDVSxnQkFBQSxBQUFLLE1BUmpCLEFBT0UsQUFDcUIsd0JBRXJCLGNBQUE7O3NCQUFBO3dCQUFBO0FBQUE7QUFBQSxTQUFBLEVBQ1UsZ0JBQUEsQUFBSyxNQWJuQixBQUFRLEFBRU4sQUFVRSxBQUNxQixBQUkxQjtBQWxCRCxhQWtCTyxBQUNMO2VBQUEsQUFBTyxBQUNSO0FBQ0Y7Ozs7O0FBbkZvQixBLEFBc0Z2Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJXb3JrSW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaWFuL3Byb3ZlbmFuY2UifQ==