import { doesThisHashedAPIKeyExists } from "./database";

export const generateAPIKey = async (): Promise<
  | {
      hashedAPIKey: string;
      apiKey: string;
    }
  | undefined
> => {
  const { randomBytes } = require("crypto");
  const apiKey = randomBytes(16).toString("hex");
  const hashedAPIKey = hashAPIKey(apiKey);

  // Ensure API key is unique
  if (await doesThisHashedAPIKeyExists(hashedAPIKey)) {
    generateAPIKey();
  } else {
    return { hashedAPIKey, apiKey };
  }
};

// Hash the API key
export const hashAPIKey = (apiKey: string) => {
  const { createHash } = require("crypto");

  const hashedAPIKey = createHash("sha256").update(apiKey).digest("hex");

  return hashedAPIKey;
};
