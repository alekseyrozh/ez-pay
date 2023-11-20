import { Tags } from "aws-cdk-lib";
import { StackContext, Table, use } from "sst/constructs";
import { Events } from "../packages/EventBus/src";
import { EventBusStack } from "./EventBusStack";

export function TransactionServiceStack({ app, stack }: StackContext) {
  const { eventBus } = use(EventBusStack);

  const transactionsTable = new Table(stack, "Transactions", {
    fields: {
      transactionId: "string",
    },
    primaryIndex: { partitionKey: "transactionId" },
  });

  eventBus.subscribe(stack, Events.PaymentInitiated.type, {
    handler: "packages/TransactionService/src/lambda.main",
    bind: [eventBus, transactionsTable],
    }
  );

  stack.getAllFunctions().forEach((fn) => {
    const tags = Tags.of(fn);
    tags.add("lumigo:auto-trace", `${!app.local}`); // don't trace when running locally
    tags.add("LUMIGO_TAG", stack.stage);
  });
}
