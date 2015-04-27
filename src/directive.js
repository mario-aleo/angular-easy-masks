'use strict';

function wtEasyMask(easyMask) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function link(scope, element, attrs, ngModelCtrl) {
            var mask = attrs.wtEasyMask || attrs.placeholder || '';
            attrs.maxlength || attrs.$set('maxlength', mask.length);

            var isCompleted = function (value) {
                return mask.length === value.length;
            };

            var isValid = function (modelValue, viewValue) {
                return viewValue == null || viewValue.length === 0 || isCompleted(viewValue);
            };

            ngModelCtrl.$validators.mask = function (modelValue, viewValue) {
                return isValid(modelValue, viewValue);
            };

            ngModelCtrl.$formatters.push(function (value) {
                return easyMask(value, mask);
            });

            ngModelCtrl.$parsers.push(function (value) {
                var parsedValue = easyMask(value, mask);
                return parsedValue === '' ? null : parsedValue;
            });

            element.on('keypress', function (event) {
                var keyIsSpace = event.which === 32;
                if (keyIsSpace) {
                    event.preventDefault();
                }
            });

            element.on('input', function (event) {
                var parsedValue = easyMask(element.val(), mask);
                if (ngModelCtrl.$viewValue !== parsedValue) {
                    ngModelCtrl.$setViewValue(parsedValue);
                    ngModelCtrl.$render();
                }
            });
        }
    };
}
