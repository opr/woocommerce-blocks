# Adding an endpoint to ExtendRestAPI

This document is intended for contrubtors to WooCommerce Blocks plugin, if you feel like a new endpoint should be added, feel free to open an issue or a PR detailing why.

## Extending `GET` endpoints in Store API.

ExtendRestAPI needs to expose each endpoint individually. If you want to expose a new endpoint, you have to follow these steps:

1. In `ExtendRestApi` class, add your endpoint `IDENTIFIER` to the `$endpoints` variable.

```php

use Automattic\WooCommerce\Blocks\StoreApi\Schemas\BillingAddressSchema;

private $endpoints = [ /* other identifiers */, BillingAddressSchema::IDENTIFIER ];

```

This is to prevent accidentally exposing new endpoints.

2. Inside your endpoint schema class (for this example, inside `BillingAddressSchema`), in its `get_properties` method, add this call at the end of the returned array.

You can pass extra parameters to `get_extended_schema` and those would be passed to third party code.

```php
self::EXTENDING_KEY    => $this->get_extended_schema( self::IDENTIFIER ),
```

`EXTENDING_KEY` value is `extensions`, we use a constant to make sure we don't have a typo.

3. Inside the same class, in `get_item_response`, add the below line. Like `get_extended_schema`, you can pass extra parameters here as well.

Make sure to only expose what's needed.

```php
self::EXTENDING_KEY    => $this->get_extended_data( self::IDENTIFIER, $cart_item ),
```

That's it, your endpoint would now contain `extensions` in your endpoint, and you can consume it in the frontend.

Extending a new endpoint is usually half the work, you will need to receive this data in the frontend and pass it to any other extensibility point (Slot, Filter, Event).

<!-- FEEDBACK --><br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We're hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`./docs/extensibility/extend-rest-api-new-endpoint.md`">Leave feedback about this document here.</a></p><!-- /FEEDBACK -->

