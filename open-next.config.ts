import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Override the Worker name to match your existing Worker "idea"
  wrangler: {
    name: "idea",
  },
});
