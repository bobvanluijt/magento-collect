<!---

Normally this README is automatically generated but not for now...

-->

[![Build status](https://travis-ci.org/dorel/radon-product.svg?branch=master)](https://travis-ci.org/orel/radon-product)

_[Demo and API docs](https://github.com/dorel/radon-product)_


##&lt;radon-product&gt;

`radon-product` is an element to integrate Magento e-commerce through its [RESTful APIs](http://devdocs.magento.com/guides/v2.0/get-started/bk-get-started-api.html).

The radon-product element is an [extension for Polymer](https://elements.polymer-project.org).

The radon-product should contain a SKU.

```html
<radon-product sku=""></radon-product>
```

The complete product becomes available with double curly bracket.

```html
<radon-product sku="24-MB01">
	<radon-product-title>{{ name }}</radon-product-title>
</radon-product>
```

You can also combine data bindings and conditionals.

```html
<radon-product sku="24-MB01">
	<radon-product-title>{{ name }}</radon-product-title>
	<template is="dom-repeat" items="{{ media_gallery_entries.item }}">
		<iron-image is="dom-if" src="{{ file }}"></iron-image>
	</template>
</radon-product>
```