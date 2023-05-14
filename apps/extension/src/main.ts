import { STORAGE__OPEN_AI_KEY, Storage } from "./storage";
import "./style.css";

/* ********************************************************* */

const keyNeededBox = document.getElementById("key_needed");
const keyEnteredBox = document.getElementById("key_entered");

const saveKeyButton = document.getElementById("save_key_button");
const changeKeyButton = document.getElementById("change_key_button");
const removeKeyButton = document.getElementById("remove_key_button");

console.log(removeKeyButton);

const saveKey = () => {
  const input = document.getElementById("key_input");

  if (input) {
    const { value } = input as HTMLInputElement;

    if (value) {
      // Encode String
      const encodedValue = encode(value);

      // Save to google storage
      Storage.set(STORAGE__OPEN_AI_KEY, encodedValue).then(() => {
        keyNeededBox?.style.setProperty("display", "none");
        keyEnteredBox?.style.setProperty("display", "flex");
      });

      input.style.border = "1px solid green";
    } else {
      input.style.border = "1px solid red";
    }
  }
};

const encode = (input: string) => {
  return btoa(input);
};

const changeKey = () => {
  keyNeededBox?.style.setProperty("display", "flex");
  keyEnteredBox?.style.setProperty("display", "none");
};

const checkForKey = async (): Promise<string> => {
  const values = await Storage.get([STORAGE__OPEN_AI_KEY]);
  return values[STORAGE__OPEN_AI_KEY];
};

checkForKey().then((response) => {
  if (response) {
    keyNeededBox?.style.setProperty("display", "none");
    keyEnteredBox?.style.setProperty("display", "flex");
  } else {
    keyNeededBox?.style.setProperty("display", "flex");
    keyEnteredBox?.style.setProperty("display", "none");
  }
});

const removeKey = async () => {
  await Storage.remove([STORAGE__OPEN_AI_KEY]);
  removeKeyButton?.remove();

  keyNeededBox?.style.setProperty("display", "flex");
  keyEnteredBox?.style.setProperty("display", "none");
};

saveKeyButton?.addEventListener("click", saveKey);
changeKeyButton?.addEventListener("click", changeKey);
removeKeyButton?.addEventListener("click", removeKey);
