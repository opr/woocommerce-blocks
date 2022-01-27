# Product Attributes API <!-- omit in toc -->

- [List Product Attributes](#list-product-attributes)
- [Single Product Attribute](#single-product-attribute)

## List Product Attributes

```http
GET /products/attributes
```

There are no parameters required for this endpoint.

```http
curl "https://example-store.com/wp-json/wc/store/products/attributes"
```

Example response:

```json
[
	{
		"id": 1,
		"name": "Color",
		"slug": "pa_color",
		"type": "select",
		"order": "menu_order",
		"has_archives": false
	},
	{
		"id": 2,
		"name": "Size",
		"slug": "pa_size",
		"type": "select",
		"order": "menu_order",
		"has_archives": false
	}
]
```

## Single Product Attribute

Get a single attribute taxonomy.

```http
GET /products/attributes/:id
```

| Attribute | Type    | Required | Description                          |
| :-------- | :------ | :------: | :----------------------------------- |
| `id`      | integer |   Yes    | The ID of the attribute to retrieve. |

```http
curl "https://example-store.com/wp-json/wc/store/products/attributes/1"
```

**Example response:**

```json
{
	"id": 1,
	"name": "Color",
	"slug": "pa_color",
	"type": "select",
	"order": "menu_order",
	"has_archives": false
}
```

<!-- FEEDBACK --><br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We're hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`./src/StoreApi/docs/product-attributes.md`">Leave feedback about this document here.</a></p><!-- /FEEDBACK -->

