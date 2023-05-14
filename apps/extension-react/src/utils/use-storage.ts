import { createChromeStorageStateHookSync } from 'use-chrome-storage'
import { DEFAULT_PROMPT_TEXT, STORAGE } from './storage'

const INITIAL_VALUE = {
  [STORAGE.KEYS.OPENAI_KEY]: '',
  [STORAGE.KEYS.PROMPT_TEXT]: DEFAULT_PROMPT_TEXT,
}

export const useSettingsStore = createChromeStorageStateHookSync(STORAGE.id, INITIAL_VALUE)
