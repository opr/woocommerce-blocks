```php
// The action callback function.
function my_function_callback( $features, $gateway ) {
    if ( 'my-gateway' !== $gateway->id ) {
			return $features;
		}
    $features[] = 'some-feature';
    return $features;
}

add_filter( '__experimental_woocommerce_blocks_payment_gateway_features_list', 'my_function_callback', 10, 2 );
```

<!-- FEEDBACK --><br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We're hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`./docs/examples/payment-gateways-features-list.md`">Leave feedback about this document here.</a></p><!-- /FEEDBACK -->

