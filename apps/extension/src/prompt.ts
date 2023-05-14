import {
  DEFAULT_PROMPT_TEXT,
  STORAGE__CUSTOM_PROMPT_TEXT,
  Storage,
} from "./storage";

const customPromptTextArea = document.getElementById(
  "custom_prompt_textarea"
) as HTMLTextAreaElement | null;

const savePromptButton = document.getElementById("save_prompt_button");
const resetPromptButton = document.getElementById("reset_prompt_button");

if (customPromptTextArea) {
  customPromptTextArea.placeholder = DEFAULT_PROMPT_TEXT;
}

Storage.get([STORAGE__CUSTOM_PROMPT_TEXT]).then((values) => {
  const text = values[STORAGE__CUSTOM_PROMPT_TEXT];
  if (customPromptTextArea && text) customPromptTextArea.value = text;
});

/* ********** ON SAVE CUSTOM PROMPT CLICK *********** */

savePromptButton?.addEventListener("click", async () => {
  const customPromptValue = customPromptTextArea?.value;

  if (customPromptValue) {
    await Storage.set(STORAGE__CUSTOM_PROMPT_TEXT, customPromptValue);
  } else {
    await Storage.set(STORAGE__CUSTOM_PROMPT_TEXT, "");
  }

  savePromptButton.textContent = "Saved :)";

  setTimeout(() => {
    savePromptButton.textContent = "Save Custom Prompt";
  }, 5000);
});

/* ********** ON RESET CUSTOM PROMPT CLICK *********** */

resetPromptButton?.addEventListener("click", async () => {
  await Storage.remove([STORAGE__CUSTOM_PROMPT_TEXT]);
  if (customPromptTextArea) customPromptTextArea.value = "";
});
