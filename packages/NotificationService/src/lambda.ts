import { Events } from "@ez-pay/event-bus";
import { EventHandler } from "sst/node/event-bus";

import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Config } from "sst/node/config";

const snsClient = new SNSClient({});

export const main = EventHandler(Events.PaymentCompleted, async (event) => {
  console.log(
    "Payment completed event recieved by notification service",
    event.properties
  );

  const { transactionId, amount, from, to } = event.properties;

  const smsNotification = `Payment completed! From:${from} To:${to} Amount: ${amount}`;

  // send email notification
  const command = new PublishCommand({
    Message: smsNotification,
    PhoneNumber: Config.PHONE_NUMBER,
  });
  await snsClient.send(command);

  console.log("Notification sent!", event.properties);
});
