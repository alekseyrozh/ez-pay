import * as z from "zod";
import { createEventBuilder } from "sst/node/event-bus";

const event = createEventBuilder({
  bus: "eventBus",
});

export const Events = {
  PaymentInitiated: event("payment.initiated", {
    transactionId: z.string().length(36), // length of uuid
    amount: z.number().min(1).max(1000),
    from: z.string(),
    to: z.string(),
  }),
  PaymentCompleted: event("payment.completed", {
    transactionId: z.string().length(36), // length of uuid
    amount: z.number().min(1).max(1000),
    from: z.string(),
    to: z.string(),
    status: z.enum(["SUCCESSFUL", "FAILED"]),
  }),
};
