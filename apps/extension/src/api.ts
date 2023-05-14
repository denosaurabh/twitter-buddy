import {
  DEFAULT_PROMPT_TEXT,
  STORAGE__CUSTOM_PROMPT_TEXT,
  STORAGE__OPEN_AI_KEY,
  Storage,
} from "./storage";

// Function to get + decode API key
const getKey = async (): Promise<string> => {
  const values = await Storage.get([STORAGE__OPEN_AI_KEY]);

  if (values[STORAGE__OPEN_AI_KEY]) {
    // const decodedKey = atob(values[STORAGE__OPEN_AI_KEY]);
    const decodedKey = Buffer.from(
      values[STORAGE__OPEN_AI_KEY],
      "base64"
    ).toString();

    return decodedKey;
  }

  return "";
};

const generate = async (prompt: string) => {
  console.log("request received! fetching GPT-3 API key from storage..");

  // Get your API key from storage
  const key = await getKey();
  const url = "https://api.openai.com/v1/completions";

  console.log("fetched key! sending request to GPT-3 API...");

  // Call completions endpoint
  const completionResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.9,
    }),
  });

  // Select the top choice and send back
  const completion = await completionResponse.json();
  return completion.choices.pop();
};

export const generateCompletionAction = async (promptText: string) => {
  if (!promptText) {
    console.log("no promptText!");
    return;
  }

  let basePromptPrefix = DEFAULT_PROMPT_TEXT;

  const values = await Storage.get([STORAGE__CUSTOM_PROMPT_TEXT]);
  if (values[STORAGE__CUSTOM_PROMPT_TEXT]) {
    basePromptPrefix = values[STORAGE__CUSTOM_PROMPT_TEXT];
  }

  try {
    //  call GPT-3
    const baseCompletion = await generate(`${basePromptPrefix}${promptText}`);

    // Let's see what we get!
    return baseCompletion.text;
  } catch (error) {
    console.log(error);
  }
};
