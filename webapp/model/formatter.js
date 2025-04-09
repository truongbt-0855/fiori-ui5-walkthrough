sap.ui.define([], () => {
  'use strict';

  return {
    statusText(sStatus) {
      // We access the data model via the component using this.getOwnerComponent().getModel() instead of using this.getView().getModel().
      // The latter call might return undefined, because the view might not have been attached to the component yet
      // and thus the view can't inherit a model from the component.
      const oResourceBundle = this.getOwnerComponent().getModel('model_i18n').getResourceBundle();

      switch (sStatus) {
        case 'A':
          return oResourceBundle.getText('invoiceStatusA');
        case 'B':
          return oResourceBundle.getText('invoiceStatusB');
        case 'C':
          return oResourceBundle.getText('invoiceStatusC');
        default:
          return sStatus;
      }
    }
  };
});
