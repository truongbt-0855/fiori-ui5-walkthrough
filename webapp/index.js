sap.ui.define([
	"sap/m/Text"
], (Text) => {
	"use strict";

	new Text({
		text: "hello World"
	}).placeAt("content");
})