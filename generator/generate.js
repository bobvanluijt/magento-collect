'use strict';
var beautifyJs = require('js-beautify').js_beautify;
var beautifyHtml = require('js-beautify').html_beautify;
var _ = require('underscore');

/**
 * Load the Swagger API.
 */
const mageWebApi = JSON.parse(require('fs').readFileSync('magento-2.1-swagger.json', 'utf8'));

/**
 * Loop through setup
 */
_.each(JSON.parse(require('fs').readFileSync('config.json', 'utf8')), ((configItem) => {
		
		var parameters = mageWebApi.paths[configItem.endpoint][configItem.method].parameters;

		var output = `<link rel="import" href="../polymer/polymer.html">
			<dom-module id="` + configItem.element + `">
			  <template>
			  <style>
			      :host {
			        display: block;
			      }
			    </style>

			  <iron-ajax auto
		          url="https://magentourl.com` + configItem.endpoint.replace('{', '{{this.').replace('}', '}}') + `"
		          params="{}"
		          handle-as="json"
		          last-response="{{ajaxResponse}}"></iron-ajax>

			  </template>
			  <script>
			    (function() {
			      Polymer({
			      	is: '` + configItem.element + `',
			      	properties: {
			      		filter: { type: String },`;

		/**
		 * Loop through all parameters
		 */
		var chop = false;
		_.each(parameters, (parameter) => {
			if(parameter.in === 'path'){
				output += parameter.name + ': { type: String },';
				chop = true;
			}
		});
		if(chop === true){
			output = output.substring(0, output.length - 1);
		}

		output += `}
			      })
			    })();
			  </script>
			</dom-module>`;

		/**
		 * Write the file
		 */
		require('fs').writeFileSync( '../' + configItem.element + '.html', beautifyHtml(output) );

	})
)