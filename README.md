# magento-collect

Master branch | Develop branch
--- | --- | ---
[![Build Status](https://travis-ci.org/bobvanluijt/magento-collect.svg?branch=master)](https://travis-ci.org/bobvanluijt/magento-collect) | [![Build Status](https://travis-ci.org/bobvanluijt/magento-collect.svg?branch=develop)](https://travis-ci.org/bobvanluijt/magento-collect)

_Note: this element is still in progress, watch it to follow the progress. This is like [Agile and stuff](https://media.makeameme.org/created/agile-quotmindsetquot.jpg)_

[#UseThePlatform](https://twitter.com/hashtag/usetheplatform)! The `magento-collect` element is used to integrate Magento 2 through its [RESTful APIs](http://devdocs.magento.com/guides/v2.0/get-started/bk-get-started-api.html) directly into a Polymer app or website.

## Installation

`$ bower install --save bobvanluijt/magento-collect`

Setup within Magento:
- Enable the API: In case you setup Magento via the UI: webapi -> security -> allow insecure = true
- Enable the API: in MySql: `REPLACE INTO core_config_data (path, value) VALUES("webapi/webapisecurity/allow_insecure", 1);`
- Enable CORS on your webserver. [Nginx CORS](http://enable-cors.org/server_nginx.html), [Apache 2 CORS](http://enable-cors.org/server_apache.html)

You need to define these global settings:

```
<script>
Polymer({
	ready: function() {
		window.MageConfig = {
			RESTurl = 'https://someurl.com/rest/V1', // current domain by default
			immutableStore = true // true by default
		};
	}
});
</script>
```

## Architectural principle

[Magento 2](https://github.com/magento/magento2) has a [RESTful API](http://devdocs.magento.com/guides/v2.0/rest/bk-rest.html).

The API follows the plural nouns RESTful approach. Example: `/products/{id}` for a single product and `/products` for a list of products.

The `magento-collect` element follows this pattern by using plural and singular nouns. Based on Swagger document: http://devdocs.magento.com/swagger/index_20.html

| Element | Resource |
| -----------------------------|-------------------------------------------------------|
| `magento-collect-products`   | catalogProductRepositoryV1  - GET /V1/products        |
| `magento-collect-product`    | catalogProductRepositoryV1  - GET /V1/products/{id}   |
| `magento-collect-categories` | catalogCategoryManagementV1 - GET /V1/categories      |
| `magento-collect-category`   | catalogCategoryRepositoryV1 - GET /V1/categories/{id} |

The `collector` attribute defines which `{id}` should be collected.

The object returned is available through the `<magento-item key="{objectKey}">` element.

A complete example:

```
<magento-collect-product collector="24-UB02">
	<h1><magento-item key="name"></magento-item></h1>
	<h3><magento-item key="created_at"></magento-item></h3>
</magento-collect-product>
```

## Immutable Store

Immutable storage is inspired by [Netflix's Falcor](https://github.com/Netflix/falcor). If you collect data, you can store it locally during a session. When a user goes back to a previously visited page, it will first travel the local object to find the information needed rather than going to the API directly.

## Usage and overview of available sub-elements

Overview:
- [magento-collect-product](#magento-collect-product)
- [magento-collect-products](#magento-collect-products)
- [magento-collect-item](#magento-collect-item)
- _...soon more to follow..._

#### &lt;magento-collect-product&gt;

```html
<magento-collect-product collector=""></magento-collect-product>
```

The complete product becomes available with by binding it within the tags. 

```html
<magento-collect-product collector="24-MB01">
  <!-- More information -->
</magento-collect-product>
```

You can also combine data bindings with conditionals.

```html
<magento-collect-product collector="24-MB01">
	<template is="dom-repeat" items="{{ MAGE.product.media_gallery_entries.item }}">
		<iron-image is="dom-if" src="{{ file }}"></iron-image>
	</template>
</magento-collect-product>
```

#### &lt;magento-collect-products&gt;

You can also collect products using filters, for example all products that start with a certain name. This might also be use to collect multiple products.

You can define multiple filters by using a semicolon as seperator.

```html
<magento-collect-products></magento-collect-products>
```

The complete product becomes available with double curly braces. The filtering work as follows:
- Add `filter=""` tag and add 

```html
<magento-collect-products filter="name['Leggings']&condition_type=['like'];name['Parachute']&condition_type=['like'];">
  <template is="dom-repeat" items="{{ collection }}">
    <iron-image is="dom-if" src="{{ name }}"></iron-image>
  </template>
</magento-collect-products>
```

The filters and criteria are based on the [Magento 2 WebAPI Search Criteria](http://devdocs.magento.com/guides/v2.1/howdoi/webapi/search-criteria.html).

### The Mage-Polymer-Object

The Magento 2 Object is saved following the GET endpoint responses.

For example:

When an element has the following bindings: `{{ MAGE.product.name}}` and `{{ MAGE.product.weigth}}` it will result in the request: `[RESTURL]/products/24-MB01?fields=name,weigth`. It will locally create the following MAGE object:

```
{
	"MAGE": {
		"/products/24-MB01": {
			"name": "Joust Duffle Bag",
			"weight": 0
		}
	}
}
```

If a new call is done to the Magento 2 API it will first check the collected information in the `MAGE` object. If it is not available in the object it will collect it from the Magento API setting the filter for this specific values.

In the above example, requesting: `{{ MAGE.product.name }}` and `{{ MAGE.product.type_id }}` will result in the request: `[RESTURL]/products/24-MB01?fields=type_id`

This feature can be disabled (see (Installation)[#Installation] )

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

Bob van Luijt (@bobvanluijt)

## License

See license.md file.
