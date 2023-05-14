import { createChromeStorageStateHookLocal } from 'use-chrome-storage'

export const DEFAULT_PROMPT_TEXT = `Write a joke or sarcasm to this tweet below.
  
Tweet: 
`

export const STORAGE = {
  id: 'settings',
  KEYS: { OPENAI_KEY: 'openAIKey', PROMPT_TEXT: 'promptText' },
} as const

const INITIAL_VALUE = {
  [STORAGE.KEYS.OPENAI_KEY]: '',
  [STORAGE.KEYS.PROMPT_TEXT]: DEFAULT_PROMPT_TEXT,
}

export const STORAGE__CUSTOM_PROMPT_TEXT = ``

class StorageKlass {
  get = (keys: string[]): Promise<Record<string, any>> => {
    return new Promise((resolve) =>
      chrome.storage.sync.get(keys, (result) => {
        resolve(result)
      }),
    )
  }

  set = (key: string, value: string): Promise<void> => {
    return new Promise((resolve) =>
      chrome.storage.sync.set({ [key]: value }, () => {
        console.log(`Updated value of "${key}" in storage`)
        resolve()
      }),
    )
  }

  remove = (keys: string[]): Promise<void> => {
    return new Promise((resolve) =>
      chrome.storage.sync.remove(keys, () => {
        console.log('removed keys: ', keys)
        resolve()
      }),
    )
  }
}

export const Storage = new StorageKlass()

export const useSettingsStore = createChromeStorageStateHookLocal(STORAGE.id, INITIAL_VALUE)
