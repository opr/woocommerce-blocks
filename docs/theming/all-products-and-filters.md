# All Products and filters

## Price slider accent color

The Filter Products by Price block includes a price slider which uses an accent color to show the selected range.

<img src="https://user-images.githubusercontent.com/3616980/96570001-2053f900-12ca-11eb-8a75-8a54f243bda3.png" alt="Price filter screenshot" width="286" />

By default, it uses the WooCommerce purple shade, but it can be easily modified by themes with the following code:

```CSS
.wc-block-components-price-slider__range-input-progress,
.rtl .wc-block-components-price-slider__range-input-progress {
	--range-color: #ee6948;
}
```

<img src="https://user-images.githubusercontent.com/3616980/96569858-f0a4f100-12c9-11eb-8011-05227bb60277.png" alt="Price filter screenshot with custom styles" width="286" />

Notice the code snippet above uses a CSS custom property, so the default color might still be available in some browsers that don't support it like Internet Explorer 11. If your theme supports IE11, you can add the following lines to target it:

```CSS
/* Target only IE11 */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
	.wc-block-components-price-slider__range-input-progress {
		background: #ee6948;
	}
}
```

<!-- FEEDBACK --><br/><br/><p align="center"><a href="https://woocommerce.com/"><img src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce@2x.png" alt="WooCommerce" height="28px" style="filter: grayscale(100%);opacity: 0.2;" /></a></p><p align="center"><a href="https://woocommerce.com/careers/">We're hiring</a>! Come work with us!</p><p align="center">🐞 Found a mistake, or have a suggestion? <a href="https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/new?assignees=&labels=type%3A+documentation&template=--doc-feedback.md&title=Feedback%20on%20`./docs/theming/all-products-and-filters.md`">Leave feedback about this document here.</a></p><!-- /FEEDBACK -->

