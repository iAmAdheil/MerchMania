import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    // 1. Verify webhook signature
    if (!verifyWebhookSignature(body, signature, timestamp)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const { type, data } = payload;

    // 2. Handle payment success
    if (type === "PAYMENT_SUCCESS_WEBHOOK") {
      const { order } = data;
      const orderId = order.order_id;

      // Check if already processed (idempotency)
      const existingOrder = await prisma.order.findUnique({
        where: { id: orderId }
      });

      if (existingOrder?.paid) {
        return NextResponse.json({ message: "Already processed" });
      }

      // 3. Update order in DB
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paid: true,
          status: "PAID",
          cashfreeOrderId: order.cf_order_id,
          paymentDetails: data.payment, // Store payment info as JSON
        }
      });

      // 4. Additional business logic
      // - Send confirmation email
      // - Clear user's cart
      // - Update inventory
      // - Trigger order fulfillment

      console.log(`Order ${orderId} marked as paid`);
    }

    // Handle other webhook types
    if (type === "PAYMENT_FAILED_WEBHOOK") {
      const orderId = data.order.order_id;
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "FAILED" }
      });
    }

    if (type === "PAYMENT_USER_DROPPED_WEBHOOK") {
      const orderId = data.order.order_id;
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "ABANDONED" }
      });
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

// Verify Cashfree webhook signature
function verifyWebhookSignature(
  body: string,
  signature: string | null,
  timestamp: string | null
): boolean {
  if (!signature || !timestamp) return false;

  const signatureData = `${timestamp}${body}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.CASHFREE_KEY!)
    .update(signatureData)
    .digest("base64");

  return signature === expectedSignature;
}