[![Build status](https://travis-ci.org/dorel/radon-collect.svg?branch=master)](https://travis-ci.org/dorel/radon-collect)

_[Demo and API docs](https://github.com/dorel/radon-collect)_

## &lt;radon-collect&gt;

The `radon` element is used to integrate Magento 2 through its [RESTful APIs](http://devdocs.magento.com/guides/v2.0/get-started/bk-get-started-api.html) directly into a Polymer app or website.

The `radon-collect` element is an [extension for Polymer](https://elements.polymer-project.org) and handles the collection of Magento 2 data through its REST API. All available elements are based on the testing results presented in [this](https://github.com/dorel/Magento-2-REST-API-BDD) Magento 2 BDD RESTful API repo.

## Initialise
...

## &lt;radon-collect-product&gt; vs. &lt;radon-collect-products&gt;

- The `radon-collect-product` element collects all product information based on a SKU and it returns a product object.
- The `radon-collect-products` element collects all product information based on a filter and it returns an array with product object.

### &lt;radon-collect-product&gt;

```html
<radon-collect-product sku=""></radon-collect-product>
```

The complete product becomes available with double curly braces. The 

```html
<radon-collect-product sku="24-MB01">
	<h1>{{ name }}</h1>
</radon-collect-product>
```

You can also combine data bindings and conditionals.

```html
<radon-collect-product sku="24-MB01">
	<h1>{{ name }}</h1>
	<template is="dom-repeat" items="{{ media_gallery_entries.item }}">
		<iron-image is="dom-if" src="{{ file }}"></iron-image>
	</template>
</radon-collect-product>
```

### &lt;radon-collect-products&gt;

You can also collect products using filters, for example all products that start with a certain name. This might also be use to collect multiple products.

You can define multiple filters by using a semicolon as seperator.

```html
<radon-collect-products filter="key1=val1;key2=val2"></radon-collect-products>
```

The complete product becomes available with double curly braces. The filtering work as follows:
- Add `filter=""` tag and add 

```html
<radon-collect-products filter="name['Leggings']&condition_type=['like'];name['Parachute']&condition_type=['like'];">
  <template is="dom-repeat" items="{{ collection }}">
    <iron-image is="dom-if" src="{{ name }}"></iron-image>
  </template>
</radon-collect-products>
```

The filters and criteria are based on the [Magento 2 WebAPI Search Criteria](http://devdocs.magento.com/guides/v2.1/howdoi/webapi/search-criteria.html).

## Response object

Response objects are defined here: http://devdocs.magento.com/swagger/index_20.html

| Element | Resource |
| -------------------------|-----------------------------------------------------|
| `radon-collect-products` | catalogProductRepositoryV1 - GET /V1/products       |
| `radon-collect-product`  | catalogProductRepositoryV1 - GET /V1/products/{sku} |
