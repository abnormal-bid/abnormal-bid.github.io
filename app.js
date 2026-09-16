(() => {
  "use strict";
  const config = window.SITE_CONFIG || {};
  const dialog = document.querySelector("#inquiry-dialog");
  const form = document.querySelector("#inquiry-form");
  const product = document.querySelector("#inquiry-product");
  const duration = document.querySelector("#inquiry-duration");
  const notes = document.querySelector("#inquiry-notes");
  const preview = document.querySelector("#inquiry-text");
  const status = document.querySelector("#copy-status");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const contactLink = document.querySelector("#contact-link");
  const contact = config.contact || {};
  let lastTrigger = null;
  let inquiryText = "";

  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-product]").forEach((card) => {
    const details = config.products?.[card.dataset.product];
    if (!details) return;
    if (details.price)
      card.querySelector("[data-price]").textContent = details.price;
    if (details.note)
      card.querySelector("[data-price-note]").textContent = details.note;
  });

  function closeMenu() {
    mobileNav.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "展开导航");
  }

  menuToggle.addEventListener("click", () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "收起导航" : "展开导航");
  });
  mobileNav
    .querySelectorAll("a, button")
    .forEach((item) => item.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });

  function updateInquiry() {
    inquiryText = `你好，我想咨询 AI 订阅服务。\n产品：${product.value}\n时长：${duration.value}`;
    if (notes.value.trim()) inquiryText += `\n需求：${notes.value.trim()}`;
    inquiryText += "\n请帮我确认可办理的套餐、总费用、交付时间与售后条件。";
    preview.textContent = inquiryText;
    status.textContent = "";
    if (contact.email && !telegramUrl) {
      contactLink.href = `mailto:${contact.email}?subject=${encodeURIComponent(`AI 订阅咨询 · ${product.value}`)}&body=${encodeURIComponent(inquiryText)}`;
    }
  }

  const contactParts = [];
  if (contact.wechat) contactParts.push(`微信：${contact.wechat}`);
  if (contact.email) contactParts.push(`邮箱：${contact.email}`);
  let telegramUrl;
  try {
    const url = new URL(contact.telegram);
    if (url.protocol === "https:" && url.hostname === "t.me")
      telegramUrl = url.href;
  } catch {
    /* No valid Telegram contact configured. */
  }
  if (telegramUrl) contactParts.push(`Telegram：${telegramUrl}`);
  if (contactParts.length)
    document.querySelector("#contact-info p").textContent =
      `${contactParts.join(" · ")}。复制下方咨询内容后联系我们。`;
  if (telegramUrl || contact.email) {
    contactLink.hidden = false;
    if (telegramUrl) {
      contactLink.href = telegramUrl;
      contactLink.target = "_blank";
      contactLink.rel = "noopener noreferrer";
      contactLink.firstChild.textContent = "在 Telegram 咨询 ";
    } else {
      contactLink.firstChild.textContent = "通过邮件咨询 ";
    }
  }

  document.querySelectorAll("[data-inquiry]").forEach((button) => {
    button.addEventListener("click", () => {
      lastTrigger = button;
      product.value = button.dataset.inquiry || "尚未确定";
      updateInquiry();
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });
  document
    .querySelector("#close-dialog")
    .addEventListener("click", () => dialog.close());
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
    document.body.classList.remove("dialog-open");
    if (lastTrigger && lastTrigger.getClientRects().length) lastTrigger.focus();
    else menuToggle.focus();
  });
  form.addEventListener("input", updateInquiry);
  form.addEventListener("change", updateInquiry);

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        /* Try selection-based copy. */
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
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      /* Present manual-copy fallback. */
    }
    field.remove();
    return copied;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.querySelector("#copy-inquiry");
    button.disabled = true;
    const copied = await copyText(inquiryText);
    button.disabled = false;
    button.focus();
    status.textContent = copied
      ? "已复制咨询内容，可粘贴后发送给我们。"
      : "暂时无法自动复制，请长按或选中上方咨询内容进行复制。";
  });
  updateInquiry();
})();
