"use client";

import { createContext, use, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { site, type Lang } from "@/data/site";
import type { Copy } from "@/i18n/types";
import { describeContact, formatInquiry, getContactLink } from "@/lib/inquiry";
import { Icon } from "./Icon";
import styles from "./InquiryDialog.module.css";

type OpenInquiry = (selection: string | undefined, trigger: HTMLElement) => void;

const OpenInquiryContext = createContext<OpenInquiry>(() => {});

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current";

export function InquiryButton({ product, onClick, ...props }: ComponentProps<"button"> & { product?: string }) {
  const openInquiry = use(OpenInquiryContext);
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        openInquiry(product, event.currentTarget);
        onClick?.(event);
      }}
    />
  );
}

async function copyText(text: string, container: HTMLElement, fieldLabel: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* Fall back to selection-based copying. */
    }
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("aria-label", fieldLabel);
  field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
  container.append(field);
  field.select();
  field.setSelectionRange(0, field.value.length);
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

export function InquiryProvider({
  lang,
  copy,
  dot,
  products,
  termsPage,
  privacyPage,
  children,
}: {
  lang: Lang;
  copy: Copy["inquiry"];
  dot: string;
  /** 可以咨询的服务名称。 */
  products: readonly string[];
  termsPage: { href: string; label: string };
  privacyPage: { href: string; label: string };
  children: ReactNode;
}) {
  const [product, setProduct] = useState<string>(copy.undecidedProduct);
  const [duration, setDuration] = useState<string>(copy.durations[0]!);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const backdropPressed = useRef(false);

  const inquiry = { product, duration, notes };
  const contactLink = getContactLink(site.contact, inquiry, lang);

  const openInquiry: OpenInquiry = (selection, trigger) => {
    lastTrigger.current = trigger;
    const selectable = selection === copy.otherProduct || (selection !== undefined && products.includes(selection));
    setProduct(selectable ? selection : copy.undecidedProduct);
    setStatus("");
    dialog.current?.showModal();
  };

  return (
    <OpenInquiryContext value={openInquiry}>
      {children}
      <dialog
        className={styles.inquiryDialog}
        ref={dialog}
        id="inquiry-dialog"
        aria-labelledby="inquiry-title"
        aria-describedby="inquiry-description"
        onPointerDown={(event) => {
          backdropPressed.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            backdropPressed.current &&
            event.target === event.currentTarget &&
            (event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom)
          )
            event.currentTarget.close();
          backdropPressed.current = false;
        }}
        onClose={() => {
          // 触发按钮已不可见时，焦点回到移动端菜单开关。
          if (lastTrigger.current?.getClientRects().length) lastTrigger.current.focus();
          else document.querySelector<HTMLElement>('[aria-controls="mobile-nav"]')?.focus();
        }}
      >
        <div className={styles.inquiryHeading}>
          <div className={styles.inquiryHeadingTop}>
            <span className={styles.inquiryEyebrow}>
              <span className={styles.inquiryHeadingIcon}>
                <Icon name="chat" />
              </span>
              Let&apos;s get you started
            </span>
            <button
              className={`icon-button ${styles.inquiryClose}`}
              type="button"
              aria-label={copy.close}
              onClick={() => dialog.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
          <h2 id="inquiry-title">
            {copy.title}
            <span className="text-signal">{dot}</span>
          </h2>
          <p id="inquiry-description">
            {copy.description[0]}
            <br />
            {copy.description[1]}
          </p>
        </div>
        <form
          className={styles.inquiryForm}
          onChange={() => setStatus("")}
          onSubmit={async (event) => {
            event.preventDefault();
            const container = dialog.current;
            if (!container) return;
            setCopying(true);
            const copied = await copyText(formatInquiry(inquiry, lang), container, copy.copyFieldLabel);
            // 先解除禁用，按钮才能重新拿到焦点。
            flushSync(() => setCopying(false));
            if (container.open) {
              copyButton.current?.focus();
              setStatus(copied ? copy.copied : copy.copyFailed);
            }
          }}
        >
          <div className={styles.inquiryFields}>
            <label className={styles.inquiryField}>
              {copy.productLabel}
              <select
                className="mt-2"
                name="product"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
              >
                {products.map((name) => (
                  <option key={name}>{name}</option>
                ))}
                <option>{copy.otherProduct}</option>
                <option value={copy.undecidedProduct}>{copy.undecidedLabel}</option>
              </select>
            </label>
            <label className={styles.inquiryField}>
              {copy.durationLabel}
              <select
                className="mt-2"
                name="duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              >
                {copy.durations.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
          <label className={styles.inquiryField}>
            {copy.notesLabel} <span className="ml-1 text-xs font-normal text-muted-foreground">{copy.optional}</span>
            <textarea
              className="mt-2"
              name="notes"
              rows={3}
              maxLength={600}
              placeholder={copy.notesPlaceholder}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
          <div className={styles.inquiryPreview}>
            <span className={styles.inquiryPreviewLabel}>
              <Icon name="copy" className="size-3.5" />
              {copy.previewLabel}
            </span>
            <p className="mt-1 text-xs leading-loose wrap-anywhere whitespace-pre-wrap">
              {formatInquiry(inquiry, lang)}
            </p>
          </div>
          <div className={styles.inquiryContact}>
            <Icon name="chat" className="mt-1 size-4 text-muted-foreground" />
            <p className="text-xs leading-loose wrap-anywhere text-muted-foreground">
              {describeContact(site.contact, lang)}
            </p>
          </div>
          <button className={`btn btn-primary ${styles.inquiryCopy}`} ref={copyButton} type="submit" disabled={copying}>
            <Icon name="copy" />
            {copy.copy}
          </button>
          {contactLink && (
            <a
              className={`btn btn-outline ${styles.inquiryContactLink}`}
              href={contactLink.href}
              rel="noopener noreferrer"
              target={contactLink.type === "telegram" ? "_blank" : undefined}
            >
              <span>{contactLink.label}</span>
              <Icon name="up-right" />
            </a>
          )}
          <p className={styles.inquiryNote}>
            {copy.note}
            <br />
            {copy.legal[0]}{" "}
            <a className={linkClass} href={termsPage.href} target="_blank" rel="noopener noreferrer">
              {termsPage.label}
              <span className="sr-only">{copy.newWindow}</span>
            </a>{" "}
            {copy.legal[1]}{" "}
            <a className={linkClass} href={privacyPage.href} target="_blank" rel="noopener noreferrer">
              {privacyPage.label}
              <span className="sr-only">{copy.newWindow}</span>
            </a>
            {copy.legal[2]}
          </p>
          <p
            className="mt-2 text-center text-xs leading-relaxed text-foreground empty:mt-0"
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </form>
      </dialog>
    </OpenInquiryContext>
  );
}
