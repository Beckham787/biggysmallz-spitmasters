"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dateUnsure, setDateUnsure] = useState(false);
  const [clientError, setClientError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const email = (data.get("email") as string)?.trim();

    // Light client-side validation: name + at least one contact method.
    if (!name) {
      setClientError("Please tell us your name.");
      return;
    }
    if (!phone && !email) {
      setClientError("Please leave a phone number or an email so Biggy can reach you.");
      return;
    }

    const payload = {
      name,
      phone,
      email,
      eventDate: dateUnsure ? "Not sure yet" : (data.get("eventDate") as string) || "Not specified",
      eventType: (data.get("eventType") as string) || "Not specified",
      message: (data.get("message") as string)?.trim() || "",
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setDateUnsure(false);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      setStatus("error");
    }
  }

  // Calm confirmation — not a hard "order placed" state.
  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-ember/40 bg-coal p-10 text-center"
      >
        <h2 className="text-3xl text-cream">Thank you</h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-cream/90">
          Biggy will be in touch personally — by phone or email — to talk it
          through. No deposit, no commitment yet. Just the start of a
          conversation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-sm border border-cream/20 bg-coal px-4 py-3 text-cream placeholder:text-smoke transition-colors focus:border-ember focus:outline-none";
  const labelClass =
    "mb-2 block font-display uppercase tracking-stamp text-sm text-cream-dim";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>
          Your name <span className="text-ember-bright">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
          placeholder="Who should Biggy ask for?"
        />
      </div>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">
          Contact details — at least one required
        </legend>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={fieldClass}
            placeholder="e.g. 082 000 0000"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
      </fieldset>
      <p className="-mt-3 text-sm text-smoke">
        Leave a phone number or an email — whichever suits you. At least one,
        please.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            disabled={dateUnsure}
            className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-50`}
          />
          <label className="mt-3 flex items-center gap-2 text-sm text-cream-dim">
            <input
              type="checkbox"
              checked={dateUnsure}
              onChange={(e) => setDateUnsure(e.target.checked)}
              className="h-4 w-4 accent-ember"
            />
            Not sure yet
          </label>
        </div>

        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type
          </label>
          <select
            id="eventType"
            name="eventType"
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {siteConfig.eventTypes.map((type) => (
              <option key={type} value={type} className="bg-coal text-cream">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Anything you&rsquo;d like Biggy to know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="The kind of day you're planning, roughly where, anything on your mind. Optional."
        />
      </div>

      {clientError && (
        <p role="alert" className="text-sm text-ember-bright">
          {clientError}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-ember-bright">
          {errorMsg} You can also reach Biggy directly on{" "}
          <a
            href={`tel:${siteConfig.contact.phoneE164}`}
            className="underline underline-offset-4"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
          .
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-ember text-base disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send to Biggy"}
        </button>
        <p className="text-sm text-smoke">No deposit. No commitment yet.</p>
      </div>
    </form>
  );
}
