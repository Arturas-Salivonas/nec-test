'use client';

import { useState, FormEvent } from 'react';
import { userSchema } from '@/lib/validation';
import { COUNTRIES, INTERESTS } from '@/lib/constants';
import { UserFormData, FormErrors } from '@/types/user';
import { ZodError } from 'zod';

interface UserFormProps {
  onAddUser: (user: UserFormData) => void;
}

export default function UserForm({ onAddUser }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    age: 0,
    country: '',
    interests: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullName: true,
      age: true,
      country: true,
      interests: true,
    });

    try {
      // Validate form data
      const validatedData = userSchema.parse({
        ...formData,
        age: Number(formData.age) || 0,
      });

      // Clear errors and submit
      setErrors({});
      onAddUser(validatedData);

      // Reset form
      setFormData({
        fullName: '',
        age: 0,
        country: '',
        interests: [],
      });
      setTouched({});

      // Announce success to screen readers
      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.focus();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          formErrors[field] = err.message;
        });
        setErrors(formErrors);

        // Focus on error summary
        setTimeout(() => {
          const errorSummary = document.getElementById('error-summary');
          if (errorSummary) {
            errorSummary.focus();
          }
        }, 0);
      }
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value];
      return { ...prev, interests: newInterests };
    });
    setTouched((prev) => ({ ...prev, interests: true }));
  };

  const hasErrors = Object.keys(errors).length > 0;
  const errorCount = Object.keys(errors).length;

  return (
    <div className="nec-form-wrapper">
      {hasErrors && (
        <div
          className="nec-error-summary"
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
          id="error-summary"
        >
          <h2 className="nec-error-summary__title" id="error-summary-title">
            Please correct the {errorCount} error{errorCount > 1 ? 's' : ''} below
          </h2>
          <div className="nec-error-summary__body">
            <ul className="nec-list nec-error-summary__list">
              {errors.fullName && (
                <li>
                  <a href="#full-name">{errors.fullName}</a>
                </li>
              )}
              {errors.age && (
                <li>
                  <a href="#age">{errors.age}</a>
                </li>
              )}
              {errors.country && (
                <li>
                  <a href="#country">{errors.country}</a>
                </li>
              )}
              {errors.interests && (
                <li>
                  <a href="#interests">{errors.interests}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div
          className={`nec-form-group ${
            errors.fullName && touched.fullName ? 'nec-form-group--error' : ''
          }`}
        >
          <label className="nec-label nec-label--m" htmlFor="full-name">
            Full name
          </label>
          {errors.fullName && touched.fullName && (
            <p id="full-name-error" className="nec-error-message">
              <span className="nec-visually-hidden">Error:</span> {errors.fullName}
            </p>
          )}
          <input
            className={`nec-input ${
              errors.fullName && touched.fullName ? 'nec-input--error' : ''
            }`}
            id="full-name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            onBlur={() => setTouched({ ...touched, fullName: true })}
            aria-describedby={
              errors.fullName && touched.fullName ? 'full-name-error' : undefined
            }
          />
        </div>

        {/* Age */}
        <div
          className={`nec-form-group ${
            errors.age && touched.age ? 'nec-form-group--error' : ''
          }`}
        >
          <label className="nec-label nec-label--m" htmlFor="age">
            Age
          </label>
          <div className="nec-hint" id="age-hint">
            You must be 18 or older
          </div>
          {errors.age && touched.age && (
            <p id="age-error" className="nec-error-message">
              <span className="nec-visually-hidden">Error:</span> {errors.age}
            </p>
          )}
          <input
            className={`nec-input nec-input--width-5 ${
              errors.age && touched.age ? 'nec-input--error' : ''
            }`}
            id="age"
            name="age"
            type="number"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            onBlur={() => setTouched({ ...touched, age: true })}
            aria-describedby={`age-hint ${
              errors.age && touched.age ? 'age-error' : ''
            }`}
          />
        </div>

        {/* Country */}
        <div
          className={`nec-form-group ${
            errors.country && touched.country ? 'nec-form-group--error' : ''
          }`}
        >
          <label className="nec-label nec-label--m" htmlFor="country">
            Country
          </label>
          {errors.country && touched.country && (
            <p id="country-error" className="nec-error-message">
              <span className="nec-visually-hidden">Error:</span> {errors.country}
            </p>
          )}
          <select
            className={`nec-select ${
              errors.country && touched.country ? 'nec-select--error' : ''
            }`}
            id="country"
            name="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            onBlur={() => setTouched({ ...touched, country: true })}
            aria-describedby={
              errors.country && touched.country ? 'country-error' : undefined
            }
          >
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div
          className={`nec-form-group ${
            errors.interests && touched.interests ? 'nec-form-group--error' : ''
          }`}
        >
          <fieldset className="nec-fieldset" aria-describedby="interests-hint">
            <legend className="nec-fieldset__legend nec-fieldset__legend--m">
              <h2 className="nec-fieldset__heading">Interests</h2>
            </legend>
            <div className="nec-hint" id="interests-hint">
              Select all that apply
            </div>
            {errors.interests && touched.interests && (
              <p id="interests-error" className="nec-error-message">
                <span className="nec-visually-hidden">Error:</span> {errors.interests}
              </p>
            )}
            <div className="nec-checkboxes" id="interests">
              {INTERESTS.map((interest) => (
                <div className="nec-checkboxes__item" key={interest.value}>
                  <input
                    className="nec-checkboxes__input"
                    id={`interests-${interest.value}`}
                    name="interests"
                    type="checkbox"
                    value={interest.value}
                    checked={formData.interests.includes(interest.value)}
                    onChange={() => handleCheckboxChange(interest.value)}
                  />
                  <label
                    className="nec-label nec-checkboxes__label"
                    htmlFor={`interests-${interest.value}`}
                  >
                    {interest.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="nec-button" data-module="nec-button">
          Add user
        </button>
      </form>
    </div>
  );
}
