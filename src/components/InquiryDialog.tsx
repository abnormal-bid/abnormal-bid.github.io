"use client";

import {
  createContext,
  use,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import {
  otherProduct,
  products,
  serviceDurations,
  site,
  undecidedProduct,
} from "@/data/site";
import { describeContact, formatInquiry, getContactLink } from "@/lib/inquiry";
import { Icon } from "./Icon";
import styles from "./InquiryDialog.module.css";

type OpenInquiry = (
  selection: string | undefined,
  trigger: HTMLElement,
) => void;

const OpenInquiryContext = createContext<OpenInquiry>(() => {});

const selectableProducts = [
  ...products.map(({ name }) => name),
  otherProduct,
  undecidedProduct,
];

export function InquiryButton({
  product,
  onClick,
  ...props
}: ComponentProps<"button"> & { product?: string }) {
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

async function copyText(text: string, container: HTMLElement) {
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
  field.setAttribute("aria-label", "待复制的咨询内容");
  field.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
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

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<string>(undecidedProduct);
  const [duration, setDuration] = useState<string>(serviceDurations[0]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const backdropPressed = useRef(false);

  const inquiry = { product, duration, notes };
  const contactLink = getContactLink(site.contact, inquiry);

  const openInquiry: OpenInquiry = (selection, trigger) => {
    lastTrigger.current = trigger;
    setProduct(
      selection && selectableProducts.includes(selection)
        ? selection
        : undecidedProduct,
    );
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
          // 从移动端菜单打开时，触发按钮已随菜单收起，焦点回到菜单开关。
          if (lastTrigger.current?.getClientRects().length)
            lastTrigger.current.focus();
          else
            document
              .querySelector<HTMLElement>('[aria-controls="mobile-nav"]')
              ?.focus();
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
              aria-label="关闭咨询窗口"
              onClick={() => dialog.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
          <h2 id="inquiry-title">
            从你的需求开始<span className="text-brand">。</span>
          </h2>
          <p id="inquiry-description">
            选好服务，整理需求，再联系咨询。
            <br />
            方案、报价与开通方式均需确认后再下单。
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
            const copied = await copyText(formatInquiry(inquiry), container);
            // 先解除禁用，按钮才能重新拿到焦点。
            flushSync(() => setCopying(false));
            if (container.open) {
              copyButton.current?.focus();
              setStatus(
                copied
                  ? "已复制咨询内容，可粘贴后发送给我们。"
                  : "暂时无法自动复制，请长按或选中上方咨询内容进行复制。",
              );
            }
          }}
        >
          <div className={styles.inquiryFields}>
            <label className={styles.inquiryField}>
              服务类型
              <select
                className="mt-2"
                name="product"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
              >
                {products.map(({ name }) => (
                  <option key={name}>{name}</option>
                ))}
                <option>{otherProduct}</option>
                <option value={undecidedProduct}>还没想好，想先咨询</option>
              </select>
            </label>
            <label className={styles.inquiryField}>
              使用时长
              <select
                className="mt-2"
                name="duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              >
                {serviceDurations.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
          <label className={styles.inquiryField}>
            邮箱数量、域名或客户端需求{" "}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              选填
            </span>
            <textarea
              className="mt-2"
              name="notes"
              rows={3}
              maxLength={600}
              placeholder="例如：需要 3 个邮箱，已有域名，希望在手机和电脑上收发邮件。请勿填写密码或验证码。"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
          <div className={styles.inquiryPreview}>
            <span className={styles.inquiryPreviewLabel}>
              <Icon name="copy" className="size-3.5" />
              你的咨询内容
            </span>
            <p className="mt-1 text-xs leading-loose wrap-anywhere whitespace-pre-wrap">
              {formatInquiry(inquiry)}
            </p>
          </div>
          <div className={styles.inquiryContact}>
            <Icon name="chat" className="mt-1 size-4 text-muted-foreground" />
            <p className="text-xs leading-loose wrap-anywhere text-muted-foreground">
              {describeContact(site.contact)}
            </p>
          </div>
          <button
            className={`btn btn-primary ${styles.inquiryCopy}`}
            ref={copyButton}
            type="submit"
            disabled={copying}
          >
            <Icon name="copy" />
            复制咨询内容
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
            此页面仅帮你整理需求，不会提交订单或扣款。
            <br />
            咨询与服务适用{" "}
            <a
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
              href="/terms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              服务条款<span className="sr-only">（新窗口打开）</span>
            </a>{" "}
            与{" "}
            <a
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
              href="/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              隐私政策<span className="sr-only">（新窗口打开）</span>
            </a>
            。
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
