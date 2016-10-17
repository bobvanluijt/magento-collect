# magento-collect

Master branch | Develop branch
--- | --- | ---
[![Build Status](https://travis-ci.org/dorel/bobvanluijt/magento-collect.svg?branch=master)](https://travis-ci.org/dorel/Magento-2-REST-API-BDD) | [![Build Status](https://travis-ci.org/bobvanluijt/magento-collect.svg?branch=develop)](https://travis-ci.org/dorel/Magento-2-REST-API-BDD)

_Note: this element is still in progress, watch it to follow the progress_

[#UseThePlatform](https://twitter.com/hashtag/usetheplatform)! The `magento` element is used to integrate Magento 2 through its [RESTful APIs](http://devdocs.magento.com/guides/v2.0/get-started/bk-get-started-api.html) directly into a Polymer app or website.

The `magento-collect` element is an [extension for Polymer](https://elements.polymer-project.org) and handles the collection of Magento 2 data through its REST API. All available elements are based on the testing results presented in [this](https://github.com/dorel/Magento-2-REST-API-BDD) Magento 2 BDD RESTful API repo.

## Installation

TODO: Describe the installation process

## Usage

### &lt;magento-collect-product&gt; vs. &lt;magento-collect-products&gt;

- The `magento-collect-product` element collects all product information based on a SKU and it returns a product object.
- The `magento-collect-products` element collects all product information based on a filter and it returns an array with product object.

#### &lt;magento-collect-product&gt;

```html
<magento-collect-product sku=""></magento-collect-product>
```

The complete product becomes available with double curly braces. The 

```html
<magento-collect-product sku="24-MB01">
	<h1>{{ name }}</h1>
</magento-collect-product>
```

You can also combine data bindings and conditionals.

```html
<magento-collect-product sku="24-MB01">
	<h1>{{ name }}</h1>
	<template is="dom-repeat" items="{{ media_gallery_entries.item }}">
		<iron-image is="dom-if" src="{{ file }}"></iron-image>
	</template>
</magento-collect-product>
```

#### &lt;magento-collect-products&gt;

You can also collect products using filters, for example all products that start with a certain name. This might also be use to collect multiple products.

You can define multiple filters by using a semicolon as seperator.

```html
<magento-collect-products filter="key1=val1;key2=val2"></magento-collect-products>
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

### Response object

Response objects are defined here: http://devdocs.magento.com/swagger/index_20.html

| Element | Resource |
| -------------------------|-----------------------------------------------------|
| `magento-collect-products` | catalogProductRepositoryV1 - GET /V1/products       |
| `magento-collect-product`  | catalogProductRepositoryV1 - GET /V1/products/{sku} |

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

Bob van Luijt (@bobvanluijt)

## License

See license.md file.
