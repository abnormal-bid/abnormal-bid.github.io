import { site, undecidedProduct } from "../data/site";
import { formatInquiry, getContactLink } from "../lib/inquiry";
import { requiredElement } from "./dom";

export function initializeInquiry() {
  const dialog = requiredElement<HTMLDialogElement>("#inquiry-dialog");
  const form = requiredElement<HTMLFormElement>("#inquiry-form", dialog);
  const product = requiredElement<HTMLSelectElement>("#inquiry-product", form);
  const duration = requiredElement<HTMLSelectElement>(
    "#inquiry-duration",
    form,
  );
  const notes = requiredElement<HTMLTextAreaElement>("#inquiry-notes", form);
  const preview = requiredElement<HTMLParagraphElement>("#inquiry-text", form);
  const status = requiredElement<HTMLParagraphElement>("#copy-status", form);
  const copyButton = requiredElement<HTMLButtonElement>("#copy-inquiry", form);
  const contactLink = requiredElement<HTMLAnchorElement>("#contact-link", form);
  const contactLabel = requiredElement<HTMLSpanElement>(
    "[data-contact-label]",
    contactLink,
  );
  let lastTrigger: HTMLButtonElement | null = null;

  function currentInquiry() {
    return {
      product: product.value,
      duration: duration.value,
      notes: notes.value,
    };
  }

  function updateInquiry() {
    preview.textContent = formatInquiry(currentInquiry());
    status.textContent = "";
    const link = getContactLink(site.contact, currentInquiry());
    contactLink.hidden = !link;
    if (link) {
      contactLink.href = link.href;
      contactLabel.textContent = link.label;
      contactLink.target = link.type === "telegram" ? "_blank" : "_self";
      contactLink.rel = "noopener noreferrer";
    }
  }

  document
    .querySelectorAll<HTMLButtonElement>("[data-inquiry]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        lastTrigger = button;
        const selection = button.dataset.inquiry || undecidedProduct;
        product.value = Array.from(product.options).some(
          (option) => option.value === selection,
        )
          ? selection
          : undecidedProduct;
        updateInquiry();
        dialog.showModal();
      });
    });
  requiredElement<HTMLButtonElement>("#close-dialog", dialog).addEventListener(
    "click",
    () => dialog.close(),
  );
  let backdropPressed = false;
  dialog.addEventListener("pointerdown", (event) => {
    backdropPressed = event.target === dialog;
  });
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      backdropPressed &&
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
    backdropPressed = false;
  });
  dialog.addEventListener("close", () => {
    if (lastTrigger?.getClientRects().length) lastTrigger.focus();
    else requiredElement<HTMLButtonElement>(".menu-toggle").focus();
  });
  form.addEventListener("input", updateInquiry);
  form.addEventListener("change", updateInquiry);

  async function copyText(text: string): Promise<boolean> {
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
    dialog.append(field);
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    copyButton.disabled = true;
    const copied = await copyText(formatInquiry(currentInquiry()));
    copyButton.disabled = false;
    if (dialog.open) {
      copyButton.focus();
      status.textContent = copied
        ? "已复制咨询内容，可粘贴后发送给我们。"
        : "暂时无法自动复制，请长按或选中上方咨询内容进行复制。";
    }
  });
  updateInquiry();
}
