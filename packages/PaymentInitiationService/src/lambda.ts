import { ApiHandler } from "sst/node/api";
import * as z from "zod";

import { Events } from "@ez-pay/event-bus";
import crypto from "crypto";

export const main = ApiHandler(async (event) => {
  const body = parseRequestBody(event.body);

  console.log("body", body);
  const { amount, from, to } = body;

  
  const transactionId = crypto.randomUUID();

  await Events.PaymentInitiated.publish({
    transactionId,
    amount,
    from,
    to,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Payment initiated",
    }),
  };
});

const requestBodySchema = z.object({
  amount: z.number(),
  from: z.string(),
  to: z.string(),
});

const parseRequestBody = (body: string) => {
  return requestBodySchema.parse(JSON.parse(body));
};
