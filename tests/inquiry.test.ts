import { test } from "node:test";
import assert from "node:assert/strict";
import {
  describeContact,
  formatInquiry,
  getContactLink,
  getTelegramUrl,
} from "../src/lib/inquiry.ts";

const emptyContact = { wechat: "", email: "", telegram: "" };
const inquiry = {
  product: "域名邮箱",
  duration: "3 个月",
  notes: "  日常通信 & 工作往来\n需要 3 个邮箱  ",
};

test("consultation text keeps the selected product, duration and trimmed notes", () => {
  assert.equal(
    formatInquiry(inquiry),
    "你好，我想咨询邮箱服务。\n服务类型：域名邮箱\n使用时长：3 个月\n需求：日常通信 & 工作往来\n需要 3 个邮箱\n请帮我确认邮箱方案、总费用、开通时间与支持范围。",
  );
  assert.ok(!formatInquiry({ ...inquiry, notes: "  " }).includes("需求："));
});

test("missing contact information cannot produce a fake consultation link", () => {
  assert.equal(getContactLink(emptyContact, inquiry), undefined);
  assert.match(describeContact(emptyContact), /咨询渠道即将公布/);
});

test("Telegram permits HTTPS t.me links only, without embedded credentials", () => {
  assert.equal(
    getTelegramUrl(" https://t.me/example "),
    "https://t.me/example",
  );
  for (const value of [
    "",
    "example",
    "javascript:alert(1)",
    "http://t.me/example",
    "https://t.me.evil.example/name",
    "https://user:password@t.me/example",
    "https://t.me/",
  ]) {
    assert.equal(getTelegramUrl(value), undefined, value);
  }
});

test("invalid Telegram falls back to the configured email and escapes inquiry text", () => {
  const link = getContactLink(
    {
      ...emptyContact,
      telegram: "not-a-link",
      email: "hello+mail@example.com",
    },
    inquiry,
  );
  assert.equal(link?.type, "email");
  assert.ok(link);
  const url = new URL(link.href);
  assert.equal(decodeURIComponent(url.pathname), "hello+mail@example.com");
  assert.equal(url.searchParams.get("subject"), "邮箱服务咨询 · 域名邮箱");
  assert.equal(url.searchParams.get("body"), formatInquiry(inquiry));
});

test("valid Telegram takes precedence and WeChat remains available in contact details", () => {
  const contact = {
    wechat: "example-wechat",
    email: "hello@example.com",
    telegram: "https://t.me/example",
  };
  assert.equal(getContactLink(contact, inquiry)?.type, "telegram");
  assert.match(describeContact(contact), /微信：example-wechat/);
  assert.match(describeContact(contact), /邮箱：hello@example.com/);
  assert.match(describeContact(contact), /Telegram：https:\/\/t.me\/example/);
});
