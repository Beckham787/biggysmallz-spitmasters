"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; contact?: string; phone?: string; email?: string };

// Deliberately loose: it only catches a missing @ or a missing dot, never a
// real address. Biggy would rather get an odd email than lose an enquiry.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Spam protection that costs the visitor nothing (craft floor §5): a hidden
// honeypot field real people never see, plus a time trap. The submission is
// only sent once the form has been open for MIN_FILL_MS. Both checks run
// before anything leaves the browser.
const MIN_FILL_MS = 3000;
// The honeypot's name is a neutral token on purpose: any name, id or label that
// reads like a real field ("company_website", "url", "phone2") can be
// classified by Chrome's address-profile autofill, which ignores
// autocomplete="off". A saved profile would then fill it for a real visitor
// and the enquiry would be dropped.
const HONEYPOT_FIELD = "hp_k7q2x";
const TOO_FAST_MESSAGES = [
  "One moment, please check your details, then press Send again.",
  "Nearly there. Please check your details, then press Send once more.",
];

export default function BookForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dateUnsure, setDateUnsure] = useState(false);
  const [clientError, setClientError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Earliest selectable event date: today. Set after mount so the server and
  // browser can never disagree about what "today" is.
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const thanksRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMinDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }, []);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === "success") thanksRef.current?.focus();
  }, [status]);
  const openedAt = useRef<number>(Date.now());
  const tooFastPresses = useRef(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a filled hidden field means a bot. Look like a success and
    // send nothing, so the bot learns nothing.
    if (((data.get(HONEYPOT_FIELD) as string) || "").trim() !== "") {
      setStatus("success");
      return;
    }

    // Time trap: nobody fills this form in under three seconds. A real visitor
    // (autofill + a quick tap) is asked to press Send again, never dropped.
    if (Date.now() - openedAt.current < MIN_FILL_MS) {
      // Alternate the wording so a second press inside the window changes the
      // live region's text and screen readers announce it again.
      setClientError(TOO_FAST_MESSAGES[tooFastPresses.current % 2]);
      tooFastPresses.current += 1;
      return;
    }

    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const email = (data.get("email") as string)?.trim();

    // Light client-side validation: name + at least one usable contact method.
    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!phone && !email) {
      nextErrors.contact =
        "Please leave a phone number or an email so Biggy can reach you.";
    } else {
      if (email && !EMAIL_RE.test(email)) {
        nextErrors.email =
          "That email doesn't look right. Check for a missing @ or dot.";
      }
      if (phone && phone.replace(/\D/g, "").length < 9) {
        nextErrors.phone =
          "That number looks short. Include the full number, e.g. 082 000 0000.";
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      const firstId = nextErrors.name
        ? "name"
        : nextErrors.phone || nextErrors.contact
          ? "phone"
          : "email";
      form.querySelector<HTMLElement>(`#${firstId}`)?.focus();
      return;
    }
    setFieldErrors({});

    const eventDate = dateUnsure ? "Not sure yet" : (data.get("eventDate") as string) || "Not specified";
    const eventType = (data.get("eventType") as string) || "Not specified";
    const message = (data.get("message") as string)?.trim() || "";

    // Submitted directly to Web3Forms from the browser (not through our own
    // API route). Web3Forms' free tier blocks server-to-server calls with a
    // Cloudflare challenge -- their own docs say client-side is the
    // supported path, and the access key is designed to be public/embeddable
    // in client code (see NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local).
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    setStatus("submitting");
    try {
      if (!accessKey) {
        throw new Error("Booking form isn't configured yet.");
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New booking enquiry — ${name}${
            eventType !== "Not specified" ? ` (${eventType})` : ""
          }`,
          from_name: `${siteConfig.name} — Booking`,
          Name: name,
          Phone: phone || "—",
          Email: email || "—",
          "Event date": eventDate,
          "Event type": eventType,
          Message: message || "—",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.success === false) {
        throw new Error(body?.message || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setDateUnsure(false);
    } catch (err) {
      // The provider's own wording ("Booking form isn't configured yet",
      // "Something went wrong") means nothing to a visitor; say what to do.
      setErrorMsg("That didn't send.");
      console.error("Booking form submission failed:", err);
      setStatus("error");
    }
  }

  // Calm confirmation — not a hard "order placed" state.
  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-sm border border-gold/30 bg-coal p-10 text-center"
      >
        <h2
          ref={thanksRef}
          tabIndex={-1}
          className="font-display text-2xl uppercase tracking-[0.02em] text-cream focus:outline-none"
        >
          Thank You
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-lg italic leading-relaxed text-cream-dim">
          Biggy will be in touch personally — by phone, WhatsApp or email —
          to talk it through. No deposit, no commitment yet. Just the start
          of a conversation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-8"
        >
          Send Another
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-sm border border-cream/15 bg-coal/60 px-4 py-3 font-body text-cream placeholder:text-cream/50 transition-colors focus:border-paper focus:outline-none aria-[invalid=true]:border-paper";
  const labelClass =
    "mb-2 block font-display text-xs uppercase tracking-[0.14em] text-cream-dim";

  return (
    <form
      onSubmit={handleSubmit}
      onInput={() => {
        if (Object.keys(fieldErrors).length > 0) setFieldErrors({});
      }}
      noValidate
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Your name <span className="text-paper" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={fieldClass}
          placeholder="Who should we ask for?"
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-paper">
            {fieldErrors.name}
          </p>
        )}
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
            aria-invalid={fieldErrors.phone || fieldErrors.contact ? true : undefined}
            aria-describedby={["contact-hint", fieldErrors.phone ? "phone-error" : "", fieldErrors.contact ? "contact-error" : ""]
              .filter(Boolean)
              .join(" ")}
            className={fieldClass}
            placeholder="e.g. 082 000 0000"
          />
          {fieldErrors.phone && (
            <p id="phone-error" role="alert" className="mt-2 text-sm text-paper">
              {fieldErrors.phone}
            </p>
          )}
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
            aria-invalid={fieldErrors.email || fieldErrors.contact ? true : undefined}
            aria-describedby={["contact-hint", fieldErrors.email ? "email-error" : "", fieldErrors.contact ? "contact-error" : ""]
              .filter(Boolean)
              .join(" ")}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {fieldErrors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-paper">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </fieldset>
      <p id="contact-hint" className="-mt-3 text-sm text-cream/75">
        Leave a phone number or an email — whichever suits you.
      </p>
      {fieldErrors.contact && (
        <p id="contact-error" role="alert" className="-mt-3 text-sm text-paper">
          {fieldErrors.contact}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={minDate}
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
          Anything you&rsquo;d like us to know?
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
        <p role="alert" className="text-sm text-paper">
          {clientError}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-paper">
          {errorMsg} Message Biggy on{" "}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          or call{" "}
          <a
            href={`tel:${siteConfig.contact.phoneE164}`}
            className="underline underline-offset-4"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
          , and he&rsquo;ll take it from there.
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
        <p className="font-body italic text-sm text-cream/75">Yours in flavour.</p>
      </div>
      {/* Honeypot (last child, so the form's vertical rhythm is untouched): off-screen, out of the tab order and hidden from assistive
          tech. Not display:none, which some bots skip. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
        />
      </div>
    </form>
  );
}
