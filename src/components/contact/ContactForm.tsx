"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PROPERTY_TYPES } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  propertyType: "",
  message: "",
};

const inputClasses =
  "w-full rounded-xl border border-mercury/40 bg-white px-4 py-3 font-body text-sm text-oxford placeholder:text-oxford/30 outline-none transition-colors duration-300 focus:border-oxford focus:ring-1 focus:ring-oxford";

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-mercury/30 bg-bone/50 p-10 text-center">
        <h3 className="font-cormorant text-2xl text-oxford">Thank You</h3>
        <p className="mt-4 font-body text-oxford/60">
          We&apos;ve received your inquiry and will be in touch within one
          business day.
        </p>
        <Button
          variant="secondary"
          className="mt-6 text-xs"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block font-body text-sm font-bold text-oxford">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your name"
          className={cn(inputClasses, errors.name && "border-red-400")}
        />
        {errors.name && (
          <p className="mt-1 font-body text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-bold text-oxford">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
          className={cn(inputClasses, errors.email && "border-red-400")}
        />
        {errors.email && (
          <p className="mt-1 font-body text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-bold text-oxford">
          Phone Number
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="(555) 000-0000"
          className={inputClasses}
        />
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-bold text-oxford">
          Property Interest
        </label>
        <select
          value={form.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
          className={cn(inputClasses, !form.propertyType && "text-oxford/30")}
        >
          <option value="">Select a category</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-bold text-oxford">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your real estate goals..."
          rows={5}
          className={cn(
            inputClasses,
            "resize-none",
            errors.message && "border-red-400"
          )}
        />
        {errors.message && (
          <p className="mt-1 font-body text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <Button variant="primary" type="submit" className="w-full sm:w-auto">
        Send Inquiry
      </Button>
    </form>
  );
}
