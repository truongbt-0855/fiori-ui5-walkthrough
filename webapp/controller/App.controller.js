sap.ui.define([
  'sap/ui/core/mvc/Controller'
], (Controller) => {
  'use strict';

  return Controller.extend('ui5.walkthrough.controller.App', {
    onInit: function () {
      console.log('onInit');
    },
    onRender: function () {
      console.log('onRender');
    },
    onShowHello() {
      alert('Hello World!');
    }
  });
});
