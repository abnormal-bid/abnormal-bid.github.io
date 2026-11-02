---
title: Privacy Policy
description: "Abnormal Privacy Policy: how we collect, use, keep and protect your information when you visit the website, buy in the shop, redeem a code and use your @abnormal.bid mailbox and webmail."
eyebrow: PRIVACY POLICY
summary: "This policy explains how we collect, use, keep and protect your information when you visit the Abnormal website, buy in the shop, redeem a code, and use your mailbox and webmail. We only process what the service needs, and we don't sell personal information."
effective: "2026-09-21"
updated: "2026-11-03"
highlights:
  - "The website has no accounts, no cookies and no analytics or ad scripts. The shop and webmail use only the cookies needed to sign in and collect orders."
  - "Card payments are handled by Stripe and Credit payments by Linux DO Credit. We never see or store card numbers."
  - "Mail is stored on our own mail servers, never used for ads and never sold. Admins access a mailbox only to fix problems, answer your request, handle abuse or meet legal requirements, and every access is logged."
  - "After a mailbox expires there is a 7-day grace period and a 30-day retention period before it can be deleted. You can ask us to delete it sooner at any time."
---

This English version is a translation provided for convenience. If it differs from the [Chinese version](/privacy/), the Chinese version prevails.

## Scope

This policy covers the following websites and services run by Abnormal ("we", "us"):

- **Website**: abnormal.bid.
- **Shop and redeem page**: onboard.abnormal.bid, including the mailbox shop, the orders and account pages, the redeem page and the guide.
- **Webmail**: webmail.abnormal.bid.
- **Status page**: mailhq.abnormal.bid/status.
- Mailboxes such as @abnormal.bid addresses opened through these services, including use over IMAP / SMTP.
- Inquiries you send through the contact channels we publish (email, WeChat, Telegram and so on), and custom services such as domain mailboxes, team mailboxes or setup help that we agree on separately.

When you deal with third parties through your mailbox (for example by exchanging mail or using it to sign up for another website), their handling of your information is governed by their own privacy policies.

## Information the website collects

The website is a set of static pages. It has no accounts or sign-in, and uses no analytics scripts or cookies. We don't actively collect personal information while you browse it.

- **Inquiry dialog**: the service type, term and details you enter in the dialog are turned into a message inside your browser only. The website doesn't send them to our servers or keep them. We receive them only if you copy the message and send it to us, or click "Ask by email" and send it from your mail app.
- **Appearance preference**: if you pick light or dark mode by hand, the choice is saved in your browser's local storage (`abnormal-theme`) only to remember the look; the shop and redeem page use the same preference. It is never sent to us, and choosing "System" clears it.
- **Hosting**: the website is hosted on Cloudflare, with its fonts served from the same place rather than a third-party font service. The host may keep access logs such as IP addresses and browser types under its own policy; we have no access to them. See the [GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).

## Information processed when you buy and redeem

When you buy in the shop, manage orders or redeem a code, we process:

- **Order details**: the plan, price and discount, order number, payment method, payment status, the transaction number returned by the payment provider, the amount and time, and the redeem code and renewals tied to the order.
- **Contact email**: an optional address you give when ordering or renewing, used for expiry and renewal reminders and to find your orders when you sign in to your shop account.
- **Shop account**: the email address you use to sign in to My account. There is no password: we email you a one-time sign-in link that works for 15 minutes.
- **Purchase session cookie**: when you order, your browser keeps a random identifier (`mailhq_shop`, HttpOnly) so you can collect the redeem code and see the order in that browser. It lasts one year and is renewed with each order. Our database stores only a digest of it, and an order number alone cannot be used to collect a code.
- **Payment details**: Linux DO Credit payments happen on Linux DO Credit; card payments happen on Stripe, which handles the card number, expiry date and security code. We never see or store them. We receive only the payment result, transaction number and amount, plus the Stripe customer and subscription IDs needed for card subscriptions.
- **Redeem details**: the redeem code you enter, the domain and username you choose, and the password you set for the mailbox. If you fill in a "receiving email", we send the new mailbox's address, password and server settings to that address.
- **Security information**: the IP address and browser details of requests, used to limit request rates and block abuse such as guessing redeem codes.

## Information processed when you use a mailbox

Once a mailbox is open, providing mail service necessarily involves:

- **Mail and mailbox data**: the messages you send and receive (senders, recipients, subjects, bodies and attachments), folders, and flags such as read and starred. They are stored on our own Stalwart mail servers to deliver, store and show your mail. We don't analyse mail content for advertising and never sell it.
- **Delivery records**: server logs such as delivery times, sender and recipient addresses, delivery results and spam verdicts, used for delivery, spam filtering and troubleshooting.
- **Account details**: the mailbox address, plan, storage and daily sending limit, validity and subscription status. Mailbox passwords are stored encrypted in our management system so that webmail sign-in and mailbox management work.
- **Webmail**: once you sign in, your browser keeps session cookies to keep you signed in and to allow several mailboxes at once. Automatic forwarding you set up is stored on the server; the appearance preference stays in your browser.
- **AI features**: only when you use "AI writing" in the composer (drafting, rewriting, translating), or when an AI assistant answers a support ticket first, is the relevant text sent through Cloudflare AI Gateway to a third-party large language model provider to generate a reply. If you don't use these features, your mail is not sent to a model provider.
- **Tickets and help requests**: tickets you submit in webmail, the messages exchanged and any details you include.

**Admin access**: to keep the service running, our management system can technically show mailbox contents. We access a mailbox only to troubleshoot problems with it or with the system, to handle a request you made yourself, to deal with abuse reports or security incidents, or to cooperate with competent authorities as the law requires. Viewing, moving and deleting mail and sending from a mailbox are recorded in the management system's activity log.

## Information processed for inquiries and custom services

When you contact us, or use a custom service we have agreed on, we may process:

- **Contact details**: the email address, WeChat ID or Telegram account you contact us from, and the name you give.
- **Your needs**: the service, number of mailboxes and term you want, plus details such as your domain, devices and mail apps.
- **Information needed for setup**: depending on the agreed plan, your domain, specific mailbox addresses and similar details. We tell you what is needed and why before we start.
- **Correspondence**: messages exchanged while you ask, confirm a plan and get support.

## How we use information

- To confirm payment, issue redeem codes, open mailboxes, and deliver and store your mail.
- To send the emails the service needs: shop sign-in links, account details after redeeming (only if you gave a receiving email), expiry and renewal reminders, and subscription charges and status changes.
- To handle renewals, expiry, suspension and restoration, refunds and disputes.
- To provide support and answer tickets and inquiries.
- To keep the service safe: limiting request rates and finding and stopping spam, phishing, account theft and other abuse.
- For bookkeeping and to meet legal obligations.

We don't use your information for unrelated marketing, and we don't send you promotions without your consent.

## Sharing and service providers

We don't sell or rent your personal information. To run the service, the following providers process the information they need for their part:

- **Cloudflare**: hosts the website, runs the shop, redeem page, webmail and management system, and provides network delivery, runtime logs and AI Gateway.
- **Database provider**: stores accounts, orders, redeem codes, settings and similar data (currently PlanetScale).
- **Cloud host for the mail servers**: runs our own mail servers and the mail stored on them.
- **Linux DO Credit** and **Stripe**: process the payment method you choose, under their own privacy policies.
- **Large language model provider**: receives the text needed to generate a reply, only when you use AI writing or the ticket AI assistant.

In addition, the mail you send is delivered to the recipients' mail servers as the mail protocols require, and we may provide necessary information when laws, regulators or courts require it.

## How long we keep information

- **Mail and mailboxes**: kept while the service is valid, and you can delete mail yourself. After expiry there is a 7-day grace period during which everything works as usual. When the grace period ends the mailbox is suspended, and its mail and data are kept for another 30 days, during which you can still renew to restore it. After that the mailbox is marked for reclaiming and, once an admin confirms, the mailbox and its mail are deleted.
- **Orders and payment records**: kept for up to 12 months after the service ends to handle support, renewals and disputes, then deleted or anonymised, unless the law requires longer.
- **Sign-in and sessions**: shop sign-in links work for 15 minutes; the purchase session cookie lasts one year; webmail sessions end when you sign out or they expire.
- **Runtime and access logs**: deleted automatically under our hosting providers' retention periods. The management system's activity log is kept for security auditing for as long as the service runs.
- **Inquiries that don't lead to a service**: correspondence is deleted within 3 months after the inquiry ends.
- You can ask us to delete information sooner at any time (see "Your rights"), except where it is needed for an open order or dispute or the law requires us to keep it.

## Security

- Every site uses HTTPS throughout; payment credentials, merchant keys and other sensitive settings are stored encrypted; the password in a redeem result is shown only once.
- Redeem, sign-in and payment endpoints are rate-limited by IP, and suspicious code guessing is locked out; the management system authorises by role and logs sensitive actions.
- Apart from what you type yourself on the redeem page, the webmail sign-in page or when changing your password, we will never ask for your password, verification codes or card details by email, chat or any other channel. If anyone asks in Abnormal's name, don't give them anything, and check with us using the email address under "Contact us".
- Keep redeem codes, mailbox passwords and shop sign-in links safe: anyone who has a redeem code can use it to open mailboxes.
- No transmission over the internet is entirely without risk. If you notice anything unusual with your account, change your password and contact us as soon as possible.

## Your rights

At any time, using the details under "Contact us", you can:

- ask what information we hold about you;
- correct information that is inaccurate or incomplete;
- ask us to delete a mailbox, orders or account information, or withdraw consent (which may mean the service can't continue);
- export your mail yourself through IMAP or another mail client;
- ask questions or complain about this policy or how we handle information.

We act once we have verified your identity, usually replying within 15 business days. To verify your identity we may ask you to write from the mailbox concerned or give an order number.

## Minors

Our service is meant for adults. If you are under 18, use the website and service only with the consent and involvement of a parent or guardian. If we find that we have collected a minor's information without that consent, we will delete it promptly.

## International transfers

The hosting, database, mail server, payment and language model providers we use may be located outside mainland China, so information the service needs may be transferred to and stored in other countries. We transfer only what the service needs and protect it as this policy describes.

## Changes to this policy

We may update this policy as the service or the law changes. We will publish the new version on this page and update the "Last updated" date at the top, and highlight significant changes on this page. If you keep using the website or service, you accept the updated policy.
