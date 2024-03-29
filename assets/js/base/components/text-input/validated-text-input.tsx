/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import { withInstanceId } from '@wordpress/compose';
import { isString } from '@woocommerce/types';
import { dispatch, useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import TextInput from './text-input';
import './style.scss';
import { ValidationInputError } from '../validation-input-error';

interface ValidatedTextInputProps {
	id?: string;
	instanceId: string;
	className?: string;
	ariaDescribedBy?: string;
	errorId?: string;
	focusOnMount?: boolean;
	showError?: boolean;
	errorMessage?: string;
	onChange: ( newValue: string ) => void;
	value: string;
}

const ValidatedTextInput = ( {
	className,
	instanceId,
	id,
	ariaDescribedBy,
	errorId,
	focusOnMount = false,
	onChange,
	showError = true,
	errorMessage: passedErrorMessage = '',
	value = '',
	...rest
}: ValidatedTextInputProps ): JSX.Element => {
	const [ isPristine, setIsPristine ] = useState( true );
	const inputRef = useRef< HTMLInputElement >( null );

	const { setValidationErrors, hideValidationError, clearValidationError } =
		dispatch( VALIDATION_STORE_KEY );
	const textInputId =
		typeof id !== 'undefined' ? id : 'textinput-' + instanceId;
	const errorIdString = errorId !== undefined ? errorId : textInputId;

	const { getValidationError, getValidationErrorId } = useSelect(
		( select ) => {
			const store = select( VALIDATION_STORE_KEY );
			return {
				getValidationError: store.getValidationError(),
				getValidationErrorId: store.getValidationErrorId(),
			};
		}
	);

	const validateInput = useCallback(
		( errorsHidden = true ) => {
			const inputObject = inputRef.current || null;
			if ( ! inputObject ) {
				return;
			}
			// Trim white space before validation.
			inputObject.value = inputObject.value.trim();
			const inputIsValid = inputObject.checkValidity();
			if ( inputIsValid ) {
				clearValidationError( errorIdString );
			} else {
				const validationErrors = {
					[ errorIdString ]: {
						message:
							inputObject.validationMessage ||
							__(
								'Invalid value.',
								'woo-gutenberg-products-block'
							),
						hidden: errorsHidden,
					},
				};
				setValidationErrors( validationErrors );
			}
		},
		[ clearValidationError, errorIdString, setValidationErrors ]
	);

	/**
	 * Focus on mount
	 *
	 * If the input is in pristine state, focus the element.
	 */
	useEffect( () => {
		if ( isPristine && focusOnMount ) {
			inputRef.current?.focus();
		}
		setIsPristine( false );
	}, [ focusOnMount, isPristine, setIsPristine ] );

	/**
	 * Value Validation
	 *
	 * Runs validation on state change if the current element is not in focus. This is because autofilled elements do not
	 * trigger the blur() event, and so values can be validated in the background if the state changes elsewhere.
	 */
	useEffect( () => {
		if (
			inputRef.current?.ownerDocument?.activeElement !== inputRef.current
		) {
			validateInput( true );
		}
		// We need to track value even if it is not directly used so we know when it changes.
	}, [ value, validateInput ] );

	// Remove validation errors when unmounted.
	useEffect( () => {
		return () => {
			clearValidationError( errorIdString );
		};
	}, [ clearValidationError, errorIdString ] );

	const errorMessage = getValidationError( errorIdString );

	if ( isString( passedErrorMessage ) && passedErrorMessage !== '' ) {
		errorMessage.message = passedErrorMessage;
	}

	const hasError = errorMessage?.message && ! errorMessage?.hidden;
	const describedBy =
		showError && hasError && getValidationErrorId( errorIdString )
			? getValidationErrorId( errorIdString )
			: ariaDescribedBy;

	return (
		<TextInput
			className={ classnames( className, {
				'has-error': hasError,
			} ) }
			aria-invalid={ hasError === true }
			id={ textInputId }
			onBlur={ () => {
				validateInput( false );
			} }
			feedback={
				showError && (
					<ValidationInputError
						errorMessage={ passedErrorMessage }
						propertyName={ errorIdString }
					/>
				)
			}
			ref={ inputRef }
			onChange={ ( val ) => {
				hideValidationError( errorIdString );
				onChange( val );
			} }
			ariaDescribedBy={ describedBy }
			value={ value }
			{ ...rest }
		/>
	);
};

export default withInstanceId( ValidatedTextInput );
