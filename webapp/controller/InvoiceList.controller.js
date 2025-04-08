sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], (Controller, JsonModel) => {
  'use strict';

  return Controller.extend('ui5.walkthrough.controller.InvoiceList', {
    onInit() {
      const oViewModel = new JsonModel({
        currency: 'EUR'
      });

      this.getView().setModel(oViewModel, 'view_data');
    }
  });
});
