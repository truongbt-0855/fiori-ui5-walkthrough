sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator'
], (Controller, JsonModel, Filter, FilterOperator) => {
  'use strict';

  return Controller.extend('ui5.walkthrough.controller.InvoiceList', {
    onInit() {
      const oViewModel = new JsonModel({
        currency: 'EUR'
      });

      this.getView().setModel(oViewModel, 'view_data');
    },

    onFilterInvoices(oEvent) {
      // build filter array
      const aFilter = [];
      const sQuery = oEvent.getParameter('query');
      if (sQuery) {
        aFilter.push(new Filter('ProductName', FilterOperator.Contains, sQuery));
      }

      // filter binding
      const oList = this.byId('invoiceListId');
      const oBinding = oList.getBinding('items');
      oBinding.filter(aFilter);
    },

    onPress(oEvent) {
      const oItem = oEvent.getSource();
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo('detail', {
        invoiceId: window.encodeURIComponent(oItem.getBindingContext('invoice_data').getPath().substring(1))
      });
    }
  });
});
