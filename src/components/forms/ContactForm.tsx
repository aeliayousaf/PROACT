"use client";

import { FormEvent, useId, useState } from "react";
import { practiceAreas } from "../../../content/practice-areas";
import { site } from "../../../content/site";

type FieldErrors = Record<string, string[] | undefined>;

const initial = {
  name: "",
  email: "",
  phone: "",
  preferredContact: "either",
  practiceArea: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});
    setServerError("");

    const clientErrors: FieldErrors = {};
    if (values.name.trim().length < 2) {
      clientErrors.name = ["Please enter your name."];
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      clientErrors.email = ["Please enter a valid email address."];
    }
    if (values.phone.trim().length < 7) {
      clientErrors.phone = ["Please enter a phone number."];
    } else if (!/^[0-9+\-().\s]+$/.test(values.phone.trim())) {
      clientErrors.phone = ["Phone number contains invalid characters."];
    }
    if (!values.practiceArea) {
      clientErrors.practiceArea = ["Please select a practice area."];
    }
    if (values.message.trim().length < 10) {
      clientErrors.message = ["Please include a brief message (at least 10 characters)."];
    }
    if (!values.consent) {
      clientErrors.consent = ["Consent is required before submitting."];
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setServerError("Please fix the highlighted fields and try again.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          preferredContact: values.preferredContact as
            | "email"
            | "phone"
            | "either",
          consent: Boolean(values.consent),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields ?? {});
        const fieldMessages = data.fields
          ? Object.values(data.fields as FieldErrors)
              .flat()
              .filter(Boolean)
              .slice(0, 3)
          : [];
        setServerError(
          fieldMessages.length
            ? fieldMessages.join(" ")
            : (data.error ?? "Submission failed."),
        );
        setStatus("error");
        return;
      }
      setValues(initial);
      setStatus("success");
    } catch {
      setServerError("Network error. Please try again or contact us directly.");
      setStatus("error");
    }
  }

  function fieldError(name: string) {
    return errors[name]?.[0];
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-describedby={`${formId}-notice`}
    >
      <p
        id={`${formId}-notice`}
        className="border border-gold/30 bg-gold/10 p-4 text-sm text-warm-white"
      >
        {site.disclaimerShort}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Full name"
          error={fieldError("name")}
        >
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="field-input"
          />
        </Field>
        <Field
          id={`${formId}-email`}
          label="Email"
          error={fieldError("email")}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
            className="field-input"
          />
        </Field>
        <Field
          id={`${formId}-phone`}
          label="Phone"
          error={fieldError("phone")}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
            className="field-input"
          />
        </Field>
        <Field
          id={`${formId}-preferred`}
          label="Preferred contact method"
          error={fieldError("preferredContact")}
        >
          <select
            id={`${formId}-preferred`}
            name="preferredContact"
            required
            value={values.preferredContact}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                preferredContact: e.target.value,
              }))
            }
            className="field-input"
          >
            <option value="either">Either email or phone</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </Field>
      </div>

      <Field
        id={`${formId}-area`}
        label="Service / practice area"
        error={fieldError("practiceArea")}
      >
        <select
          id={`${formId}-area`}
          name="practiceArea"
          required
          value={values.practiceArea}
          onChange={(e) =>
            setValues((v) => ({ ...v, practiceArea: e.target.value }))
          }
          className="field-input"
        >
          <option value="">Select a practice area</option>
          {practiceAreas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.title}
            </option>
          ))}
          <option value="general">General inquiry</option>
        </select>
      </Field>

      <Field
        id={`${formId}-message`}
        label="Message"
        error={fieldError("message")}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={(e) =>
            setValues((v) => ({ ...v, message: e.target.value }))
          }
          className="field-input resize-y"
        />
      </Field>

      <div className="sr-only" aria-hidden>
        <label htmlFor={`${formId}-hp`}>Website</label>
        <input
          id={`${formId}-hp`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) =>
            setValues((v) => ({ ...v, website: e.target.value }))
          }
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-text-muted">
          <input
            type="checkbox"
            className="mt-1"
            checked={values.consent}
            onChange={(e) =>
              setValues((v) => ({ ...v, consent: e.target.checked }))
            }
            aria-invalid={Boolean(fieldError("consent"))}
            aria-describedby={
              fieldError("consent") ? `${formId}-consent-error` : undefined
            }
          />
          <span>
            I understand that submitting this form does not create a
            paralegal-client relationship and that I should not include
            confidential or time-sensitive information.
          </span>
        </label>
        {fieldError("consent") && (
          <p id={`${formId}-consent-error`} className="mt-2 text-sm text-[var(--danger)]" role="alert">
            {fieldError("consent")}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "success" && (
          <p className="mb-4 text-sm text-[var(--success)]">
            Thank you. Your message was sent. We will respond using your
            preferred contact method.
          </p>
        )}
        {status === "error" && serverError && (
          <p className="mb-4 text-sm text-[var(--danger)]" role="alert">
            {serverError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-warm-white">
        {label}
      </label>
      <div
        className={error ? "[&_.field-input]:border-[var(--danger)]" : undefined}
      >
        {children}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
