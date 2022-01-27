# Product Attribute Terms API

```http
GET /products/attributes/:id/terms
GET /products/attributes/:id/terms&orderby=slug
```

| Attribute | Type    | Required | Description                                                                   |
| :-------- | :------ | :------: | :---------------------------------------------------------------------------- |
| `id`      | integer |   Yes    | The ID of the attribute to retrieve terms for.                                |
| `order`   | string  |    no    | Order ascending or descending. Allowed values: `asc`, `desc`                  |
| `orderby` | string  |    no    | Sort collection by object attribute. Allowed values: `name`, `slug`, `count`. |

```http
curl "https://example-store.com/wp-json/wc/store/products/attributes/1/terms"
```

**Example response:**

```json
[
	{
		"id": 22,
		"name": "Blue",
		"slug": "blue",
		"count": 5
	},
	{
		"id": 48,
		"name": "Burgundy",
		"slug": "burgundy",
		"count": 1
	}
]
```

<!-- FEEDBACK --><br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We're hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`./src/StoreApi/docs/product-attribute-terms.md`">Leave feedback about this document here.</a></p><!-- /FEEDBACK -->

