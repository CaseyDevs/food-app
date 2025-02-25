// Generic validation utilities for all forms
export function isNotEmpty(value) {
    return value.trim() !== '';
  }
  
  export function hasMinLength(value, minLength) {
    return value.length >= minLength;
  }
  
  export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
  }
  
  export function isValidNameFormat(value) {
    return /^[a-zA-Z\s-']+$/.test(value);
  }
  
  export function isValidEmailFormat(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }