"use client";

import { useState } from "react";
import { contacto, contact } from "@/lib/config";
import { labelClass } from "./SectionHeader";
import { ChevronDownIcon } from "./Icons";
import Button from "./Button";

const inputClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-[1.05rem] text-content outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

const fieldLabelClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

const infoLabelClass =
  "mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

export default function Contacto() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rubro: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Sin backend todavía: abrimos el cliente de correo con los datos precargados.
    const subject = `Consulta de ${form.name || "un negocio"}`;
    const body = [
      `Nombre: ${form.name}`,
      `Email: ${form.email}`,
      `Rubro: ${form.rubro}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contacto" className="overflow-hidden border-t border-line">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)]">
        <span className={`${labelClass} mb-6`}>
          <span className="h-px w-6 bg-accent" />
          {contacto.label}
        </span>
        {/* Cierre: título gigante a todo el ancho */}
        <h2 className="font-syne text-[clamp(2.2rem,6.5vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          {contacto.title.slice(0, -1)}
          <span className="font-dmsans font-medium italic text-accent">{contacto.title.slice(-1)}</span>
        </h2>

        <div className="mt-[clamp(36px,5vw,64px)] grid gap-[clamp(40px,5vw,72px)] border-t border-line pt-[clamp(32px,4vw,48px)] md:grid-cols-[5fr_7fr]">
          {/* Info */}
          <div>
            <p className="max-w-[380px] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-muted">
              {contacto.subtitle}
            </p>
            <dl className="mt-10 flex flex-col gap-6">
              <div>
                <dt className={infoLabelClass}>{contacto.infoLabels.email}</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-syne text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold tracking-[-0.02em] transition-colors hover:text-accent"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={infoLabelClass}>{contacto.infoLabels.whatsapp}</dt>
                <dd>
                  {contact.whatsapp.number ? (
                    <a
                      href={`https://wa.me/${contact.whatsapp.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {contact.whatsapp.label}
                    </a>
                  ) : (
                    <span>{contact.whatsapp.label}</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className={infoLabelClass}>{contacto.infoLabels.location}</dt>
                <dd>{contact.location}</dd>
              </div>
            </dl>
          </div>

          {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className={fieldLabelClass}>
              {contacto.form.name.label}
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder={contacto.form.name.placeholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className={fieldLabelClass}>
              {contacto.form.email.label}
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder={contacto.form.email.placeholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="rubro" className={fieldLabelClass}>
              {contacto.form.rubro.label}
            </label>
            <div className="relative">
              <select
                id="rubro"
                value={form.rubro}
                onChange={(e) => setForm({ ...form, rubro: e.target.value })}
                className={`${inputClass} cursor-pointer appearance-none pr-8 ${
                  form.rubro ? "" : "text-muted/60"
                }`}
              >
                <option value="" className="bg-surface">
                  {contacto.form.rubro.placeholder}
                </option>
                {contacto.form.rubro.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-surface text-content">
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-content" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className={fieldLabelClass}>
              {contacto.form.message.label}
            </label>
            <textarea
              id="message"
              placeholder={contacto.form.message.placeholder}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} min-h-[120px] resize-y`}
            />
          </div>

          <Button type="submit" className="self-start max-sm:self-stretch">
            {contacto.form.submit}
          </Button>
        </form>
        </div>
      </div>
    </section>
  );
}
