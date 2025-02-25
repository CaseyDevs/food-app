import { 
    isNotEmpty,
    isValidEmailFormat,
} from './validation';

export function checkoutValidation(data) {
    const errors = [];
    const customerData = data.order.customer;
    
    // Required fields validation
    if (!isNotEmpty(customerData.name)) {
        errors.push('Name is required');
    }
    if (!isNotEmpty(customerData.email)) {
        errors.push('Email is required');
    }
    if (!isNotEmpty(customerData.street)) {
        errors.push('Address is required');
    }
    if (!isNotEmpty(customerData.city)) {
        errors.push('City is required');
    }
    if (!isNotEmpty(customerData['postal-code'])) {
        errors.push('Postal Code is required');
    }

    // Email validation
    if (isNotEmpty(customerData.email) && !isValidEmailFormat(customerData.email)) {
        errors.push("Please enter a valid email address");
    }

    return errors;
}