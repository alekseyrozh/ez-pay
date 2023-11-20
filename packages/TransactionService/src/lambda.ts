import { EventHandler } from "sst/node/event-bus";
import { Events } from "@ez-pay/event-bus";
import { TransactionEntity } from "./db";

export const main = EventHandler(Events.PaymentInitiated, async (event) => {
  console.log("Payment is being processed", event.properties);

  const { transactionId, amount, from, to } = event.properties;

  await TransactionEntity.create({
    transactionId,
    amount,
    from,
    to,
    savedAt: new Date().getTime(),
  }).go();

  await Events.PaymentCompleted.publish({
    transactionId,
    amount,
    from,
    to,
    status: "SUCCESSFUL",
  });

  console.log("Payment is completed", event.properties);
});
