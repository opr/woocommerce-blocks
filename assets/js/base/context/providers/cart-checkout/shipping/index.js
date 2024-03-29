/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useMemo,
	useRef,
} from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { ERROR_TYPES, DEFAULT_SHIPPING_CONTEXT_DATA } from './constants';
import { hasInvalidShippingAddress } from './utils';
import { errorStatusReducer } from './reducers';
import {
	EMIT_TYPES,
	emitterObservers,
	reducer as emitReducer,
	emitEvent,
} from './event-emit';
import { useStoreCart } from '../../../hooks/cart/use-store-cart';
import { useSelectShippingRate } from '../../../hooks/shipping/use-select-shipping-rate';
import { useShippingData } from '../../../hooks/shipping/use-shipping-data';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').ShippingDataContext} ShippingDataContext
 * @typedef {import('react')} React
 */

const { NONE, INVALID_ADDRESS, UNKNOWN } = ERROR_TYPES;
const ShippingDataContext = createContext( DEFAULT_SHIPPING_CONTEXT_DATA );

/**
 * @return {ShippingDataContext} Returns data and functions related to shipping methods.
 */
export const useShippingDataContext = () => {
	return useContext( ShippingDataContext );
};

/**
 * The shipping data provider exposes the interface for shipping in the checkout/cart.
 *
 * @param {Object}             props          Incoming props for provider
 * @param {React.ReactElement} props.children
 */
export const ShippingDataProvider = ( { children } ) => {
	const { incrementCalculating, decrementCalculating } =
		useDispatch( CHECKOUT_STORE_KEY );
	const { shippingRates, isLoadingRates, cartErrors } = useStoreCart();
	const { isSelectingRate } = useSelectShippingRate();
	const { selectedRates } = useShippingData();
	const [ shippingErrorStatus, dispatchErrorStatus ] = useReducer(
		errorStatusReducer,
		NONE
	);
	const [ observers, observerDispatch ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const eventObservers = useMemo(
		() => ( {
			onShippingRateSuccess:
				emitterObservers( observerDispatch ).onSuccess,
			onShippingRateFail: emitterObservers( observerDispatch ).onFail,
			onShippingRateSelectSuccess:
				emitterObservers( observerDispatch ).onSelectSuccess,
			onShippingRateSelectFail:
				emitterObservers( observerDispatch ).onSelectFail,
		} ),
		[ observerDispatch ]
	);

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	// increment/decrement checkout calculating counts when shipping is loading.
	useEffect( () => {
		if ( isLoadingRates ) {
			incrementCalculating();
		} else {
			decrementCalculating();
		}
	}, [ isLoadingRates, incrementCalculating, decrementCalculating ] );

	// increment/decrement checkout calculating counts when shipping rates are being selected.
	useEffect( () => {
		if ( isSelectingRate ) {
			incrementCalculating();
		} else {
			decrementCalculating();
		}
	}, [ incrementCalculating, decrementCalculating, isSelectingRate ] );

	// set shipping error status if there are shipping error codes
	useEffect( () => {
		if (
			cartErrors.length > 0 &&
			hasInvalidShippingAddress( cartErrors )
		) {
			dispatchErrorStatus( { type: INVALID_ADDRESS } );
		} else {
			dispatchErrorStatus( { type: NONE } );
		}
	}, [ cartErrors ] );

	const currentErrorStatus = useMemo(
		() => ( {
			isPristine: shippingErrorStatus === NONE,
			isValid: shippingErrorStatus === NONE,
			hasInvalidAddress: shippingErrorStatus === INVALID_ADDRESS,
			hasError:
				shippingErrorStatus === UNKNOWN ||
				shippingErrorStatus === INVALID_ADDRESS,
		} ),
		[ shippingErrorStatus ]
	);

	// emit events.
	useEffect( () => {
		if (
			! isLoadingRates &&
			( shippingRates.length === 0 || currentErrorStatus.hasError )
		) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_FAIL,
				{
					hasInvalidAddress: currentErrorStatus.hasInvalidAddress,
					hasError: currentErrorStatus.hasError,
				}
			);
		}
	}, [
		shippingRates,
		isLoadingRates,
		currentErrorStatus.hasError,
		currentErrorStatus.hasInvalidAddress,
	] );

	useEffect( () => {
		if (
			! isLoadingRates &&
			shippingRates.length > 0 &&
			! currentErrorStatus.hasError
		) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_SUCCESS,
				shippingRates
			);
		}
	}, [ shippingRates, isLoadingRates, currentErrorStatus.hasError ] );

	// emit shipping rate selection events.
	useEffect( () => {
		if ( isSelectingRate ) {
			return;
		}
		if ( currentErrorStatus.hasError ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_FAIL,
				{
					hasError: currentErrorStatus.hasError,
					hasInvalidAddress: currentErrorStatus.hasInvalidAddress,
				}
			);
		} else {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_SUCCESS,
				selectedRates.current
			);
		}
	}, [
		selectedRates,
		isSelectingRate,
		currentErrorStatus.hasError,
		currentErrorStatus.hasInvalidAddress,
	] );

	/**
	 * @type {ShippingDataContext}
	 */
	const ShippingData = {
		shippingErrorStatus: currentErrorStatus,
		dispatchErrorStatus,
		shippingErrorTypes: ERROR_TYPES,
		...eventObservers,
	};

	return (
		<>
			<ShippingDataContext.Provider value={ ShippingData }>
				{ children }
			</ShippingDataContext.Provider>
		</>
	);
};
