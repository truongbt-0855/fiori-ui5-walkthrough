sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  'sap/m/MessageToast',
  'sap/ui/model/json/JSONModel'
], (Controller, History, MessageToast, JSONModel) => {
  'use strict';

  return Controller.extend('ui5.walkthrough.controller.Detail', {
    onInit() {
      const oViewModel = new JSONModel({
        currency: 'EUR'
      });
      this.getView().setModel(oViewModel, 'view_data');

      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute('detail').attachPatternMatched(this.onObjectMatched, this);
    },

    onObjectMatched(oEvent) {
      this.byId('rating').reset();
      this.getView().bindElement({
        path: '/' + window.decodeURIComponent(oEvent.getParameter('arguments').invoiceId),
        model: 'invoice_data'
      });
    },

    onNavBack() {
      const oHistory = History.getInstance();
      const sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo('overview', {}, true);
      }
    },

    onRatingChange(oEvent) {
      const fValue = oEvent.getParameter('score');
      const oResourceBundle = this.getView().getModel('model_i18n').getResourceBundle();

      MessageToast.show(oResourceBundle.getText('ratingConfirmation', [fValue]));
    }
  });
});
