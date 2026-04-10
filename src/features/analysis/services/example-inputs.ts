import type { AnalysisInputType } from "@/agents/core/types";

export interface ExampleInput {
  id: string;
  title: string;
  inputType: AnalysisInputType;
  rawInput: string;
  note: string;
}

export const exampleInputs: ExampleInput[] = [
  {
    id: "bank-alert",
    title: "Urgent bank verification link",
    inputType: "url",
    rawInput:
      "https://vietcombank-secure-login.support-verification-check.com/confirm?session=urgent",
    note: "Brand impersonation plus an unofficial domain pattern.",
  },
  {
    id: "wallet-payment",
    title: "Off-platform payment request",
    inputType: "payment_text",
    rawInput:
      "Transfer 2,000,000 VND in the next 10 minutes to lock the order. Do not pay through Shopee because the admin system is down. Use this personal bank QR and send the screenshot after payment.",
    note: "Urgency, platform bypass, and a personal bank transfer request.",
  },
  {
    id: "seller-page",
    title: "Cloned seller profile",
    inputType: "seller_text",
    rawInput:
      "Official Apple reseller in Ho Chi Minh City. Inbox only, no comments. Limited stock today. To reserve your iPhone, pay 50% deposit now by bank transfer. New backup page because our old page was locked.",
    note: "Identity ambiguity and deposit pressure.",
  },
  {
    id: "counterfeit-listing",
    title: "Too-good-to-be-true luxury listing",
    inputType: "listing_text",
    rawInput:
      "100% authentic AirPods Pro, flash sale 390,000 VND today only. No returns. Message us for a private checkout link because the marketplace fee is too high.",
    note: "Unrealistic pricing and private checkout diversion.",
  },
];
