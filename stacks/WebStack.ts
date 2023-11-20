import { StackContext, StaticSite, use } from "sst/constructs";
import { PaymentInitiationServiceStack } from "./PaymentInitiationServiceStack";

export function WebStack({ stack }: StackContext) {
  const { paymentsApiUrl } = use(PaymentInitiationServiceStack);

  const site = new StaticSite(stack, "Site", {
    path: "packages/Web",
    buildOutput: "dist",
    buildCommand: "pnpm build",
    environment: {
      VITE_PAYMENTS_API_URL: paymentsApiUrl,
    },
  });

  stack.addOutputs({
    siteUrl: site.url,
  });
}
