sap.ui.define([
  'sap/ui/core/Control',
  'sap/m/RatingIndicator',
  'sap/m/Label',
  'sap/m/Button'
], (Control, RatingIndicator, Label, Button) => {
  'use strict';

  return Control.extend('ui5.walkthrough.control.ProductRating', {
    metadata: {
      properties: {
        score: { type: 'float', defaultValue: 0 }
      },
      aggregations: {
        _rating: {
          type: 'sap.m.RatingIndicator',
          multiple: false,
          visibility: 'hidden'
        },
        _label: {
          type: 'sap.m.Label',
          multiple: false,
          visibility: 'hidden'
        },
        _label_score: {
          type: 'sap.m.Label',
          multiple: false,
          visibility: 'show'
        },
        _button: {
          type: 'sap.m.Button',
          multiple: false,
          visibility: 'hidden'
        }
      },
      events: {
        change: {
          parameters: {
            score: { type: 'int' }
          }
        }
      }
    },
    init() {
      console.log('Init Product rating');
      this.setAggregation('_rating', new RatingIndicator({
        value: this.getScore(),
        iconSize: '2rem',
        visualMode: 'Half',
        liveChange: this._onRate.bind(this)
      }));

      this.setAggregation('_label', new Label({
        text: '{model_i18n>productRatingLabelInitial}'
      })).addStyleClass('sapUiSmallMargin');

      this.setAggregation('_label_score', new Label({
        text: `Score ${this.getScore()}`
      })).addStyleClass('sapUiSmallMargin');

      this.setAggregation('_button', new Button({
        text: '{model_i18n>productRatingButton}',
        press: this._onSubmit.bind(this)
      })).addStyleClass('sapUiTinyMarginTopBottom');
    },

    setValue(fValue) {
      this.setProperty('score', fValue, true);
      this.getAggregation('_rating').setValue(fValue);

      return this;
    },

    reset() {
      console.log('reset Product Rating');
      const oResourceBundle = this.getModel('model_i18n').getResourceBundle();

      // this.setValue(0);
      this.getAggregation('_label').setDesign('Standard');
      this.getAggregation('_rating').setEnabled(true);
      this.getAggregation('_label').setText(oResourceBundle.getText('productRatingLabelInitial'));
      this.getAggregation('_button').setEnabled(true);
    },

    _onRate(oEvent) {
      console.log(this.getScore());
      const oResourceBundle = this.getModel('model_i18n').getResourceBundle();
      const fValue = oEvent.getParameter('value');

      this.setProperty('score', fValue, true);

      this.getAggregation('_label').setText(oResourceBundle.getText('productRatingLabelIndicator', [fValue, oEvent.getSource().getMaxValue()]));
      this.getAggregation('_label').setDesign('Bold');
    },

    _onSubmit(oEvent) {
      const oResourceBundle = this.getModel('model_i18n').getResourceBundle();

      this.getAggregation('_rating').setEnabled(false);
      this.getAggregation('_label').setText(oResourceBundle.getText('productRatingLabelFinal'));
      this.getAggregation('_button').setEnabled(false);
      this.fireEvent('change', {
        score: this.getScore()
      });
    },

    renderer(oRM, oControl) {
      oRM.openStart('div', oControl);
      oRM.class('myAppDemoWTProductRating');
      oRM.openEnd();
      oRM.renderControl(oControl.getAggregation('_rating'));
      oRM.renderControl(oControl.getAggregation('_label'));
      oRM.renderControl(oControl.getAggregation('_label_score'));
      oRM.renderControl(oControl.getAggregation('_button'));
      oRM.close('div');
    },

    onAfterRendering() {
      const fScore = this.getScore();  // Lấy score từ XML (4)
      this.getAggregation('_rating').setValue(fScore);  // Đồng bộ _rating
      this.getAggregation('_label_score').setText(`You rated: ${fScore}/5`);
    },
  });
});
