<!---

Normally this README is automatically generated but not for now...

-->

[![Build status](https://travis-ci.org/dorel/radon-product.svg?branch=master)](https://travis-ci.org/dorel/radon-product)

_[Demo and API docs](https://github.com/dorel/radon-product)_


##&lt;radon-product&gt;

`radon-product` is an element to integrate Magento e-commerce through its [RESTful APIs](http://devdocs.magento.com/guides/v2.0/get-started/bk-get-started-api.html).

The radon-product element is an [extension for Polymer](https://elements.polymer-project.org) all available elements are based on the testing results presented in [this](https://github.com/dorel/Magento-2-REST-API-BDD) Magento 2 BDD RESTful API repo.

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

## Response object

The available information is based on the following repsonse object.

```json
{
  "id": 0,
  "sku": "string",
  "name": "string",
  "attributeSetId": 0,
  "price": 0,
  "status": 0,
  "visibility": 0,
  "typeId": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "weight": 0,
  "extensionAttributes": {
    "bundleProductOptions": [
      {
        "optionId": 0,
        "title": "string",
        "required": true,
        "type": "string",
        "position": 0,
        "sku": "string",
        "productLinks": [
          {
            "id": "string",
            "sku": "string",
            "optionId": 0,
            "qty": 0,
            "position": 0,
            "isDefault": true,
            "price": 0,
            "priceType": 0,
            "canChangeQuantity": 0,
            "extensionAttributes": {}
          }
        ],
        "extensionAttributes": {}
      }
    ],
    "downloadableProductLinks": [
      {
        "id": 0,
        "title": "string",
        "sortOrder": 0,
        "isShareable": 0,
        "price": 0,
        "numberOfDownloads": 0,
        "linkType": "string",
        "linkFile": "string",
        "linkFileContent": {
          "fileData": "string",
          "name": "string",
          "extensionAttributes": {}
        },
        "linkUrl": "string",
        "sampleType": "string",
        "sampleFile": "string",
        "sampleFileContent": {
          "fileData": "string",
          "name": "string",
          "extensionAttributes": {}
        },
        "sampleUrl": "string",
        "extensionAttributes": {}
      }
    ],
    "downloadableProductSamples": [
      {
        "id": 0,
        "title": "string",
        "sortOrder": 0,
        "sampleType": "string",
        "sampleFile": "string",
        "sampleFileContent": {
          "fileData": "string",
          "name": "string",
          "extensionAttributes": {}
        },
        "sampleUrl": "string",
        "extensionAttributes": {}
      }
    ],
    "stockItem": {
      "itemId": 0,
      "productId": 0,
      "stockId": 0,
      "qty": 0,
      "isInStock": true,
      "isQtyDecimal": true,
      "showDefaultNotificationMessage": true,
      "useConfigMinQty": true,
      "minQty": 0,
      "useConfigMinSaleQty": 0,
      "minSaleQty": 0,
      "useConfigMaxSaleQty": true,
      "maxSaleQty": 0,
      "useConfigBackorders": true,
      "backorders": 0,
      "useConfigNotifyStockQty": true,
      "notifyStockQty": 0,
      "useConfigQtyIncrements": true,
      "qtyIncrements": 0,
      "useConfigEnableQtyInc": true,
      "enableQtyIncrements": true,
      "useConfigManageStock": true,
      "manageStock": true,
      "lowStockDate": "string",
      "isDecimalDivided": true,
      "stockStatusChangedAuto": 0,
      "extensionAttributes": {}
    },
    "configurableProductOptions": [
      {
        "id": 0,
        "attributeId": "string",
        "label": "string",
        "position": 0,
        "isUseDefault": true,
        "values": [
          {
            "valueIndex": 0,
            "extensionAttributes": {}
          }
        ],
        "extensionAttributes": {},
        "productId": 0
      }
    ],
    "configurableProductLinks": [
      0
    ]
  },
  "productLinks": [
    {
      "sku": "string",
      "linkType": "string",
      "linkedProductSku": "string",
      "linkedProductType": "string",
      "position": 0,
      "extensionAttributes": {
        "qty": 0
      }
    }
  ],
  "options": [
    {
      "productSku": "string",
      "optionId": 0,
      "title": "string",
      "type": "string",
      "sortOrder": 0,
      "isRequire": true,
      "price": 0,
      "priceType": "string",
      "sku": "string",
      "fileExtension": "string",
      "maxCharacters": 0,
      "imageSizeX": 0,
      "imageSizeY": 0,
      "values": [
        {
          "title": "string",
          "sortOrder": 0,
          "price": 0,
          "priceType": "string",
          "sku": "string",
          "optionTypeId": 0
        }
      ],
      "extensionAttributes": {}
    }
  ],
  "mediaGalleryEntries": [
    {
      "id": 0,
      "mediaType": "string",
      "label": "string",
      "position": 0,
      "disabled": true,
      "types": [
        "string"
      ],
      "file": "string",
      "content": {
        "base64EncodedData": "string",
        "type": "string",
        "name": "string"
      },
      "extensionAttributes": {
        "videoContent": {
          "mediaType": "string",
          "videoProvider": "string",
          "videoUrl": "string",
          "videoTitle": "string",
          "videoDescription": "string",
          "videoMetadata": "string"
        }
      }
    }
  ],
  "tierPrices": [
    {
      "customerGroupId": 0,
      "qty": 0,
      "value": 0,
      "extensionAttributes": {}
    }
  ],
  "customAttributes": [
    {
      "attributeCode": "string",
      "value": "string"
    }
  ]
}
```