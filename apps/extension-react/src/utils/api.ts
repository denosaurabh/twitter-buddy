import { DEFAULT_PROMPT_TEXT, STORAGE, Storage } from './storage'

// Function to get + decode API key
const getKey = async (): Promise<string> => {
  try {
    const storageObj = await Storage.get([STORAGE.id])
    console.log('storageObj', storageObj)

    const values = storageObj[STORAGE.id]

    // const decodedKey = values[STORAGE.KEYS.OPENAI_KEY])
    // const decodedKeyBuff = Buffer.from(values[STORAGE.KEYS.OPENAI_KEY], 'base64').toString()

    console.log(values)

    return values[STORAGE.KEYS.OPENAI_KEY] || ''
  } catch (err) {
    console.log('caught error while fetching storage', err)
    return ''
  }
}

const generate = async (prompt: string): Promise<{ text: string }> => {
  console.log('request received! fetching GPT-3 API key from storage..')

  // Get your API key from storage
  const key = await getKey()
  const url = 'https://api.openai.com/v1/completions'

  console.log(key, 'fetched key! sending request to GPT-3 API...')

  // Call completions endpoint
  const completionResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.9,
    }),
  })

  // Select the top choice and send back
  const completion = await completionResponse.json()
  console.log('completions', completion)

  if (completion?.error?.message) {
    return { text: `{${completion.error.message}}` }
  }

  return completion.choices.pop()
}

export const generateCompletionAction = async (promptText: string) => {
  if (!promptText) {
    console.log('no promptText!')
    return
  }

  let basePromptPrefix = DEFAULT_PROMPT_TEXT

  const storageObj = await Storage.get([STORAGE.id])
  const values = storageObj[STORAGE.id]

  if (values[STORAGE.KEYS.PROMPT_TEXT]) {
    basePromptPrefix = values[STORAGE.KEYS.PROMPT_TEXT]
  }

  try {
    //  call GPT-3
    const baseCompletion = await generate(`${basePromptPrefix}${promptText}`)

    // Let's see what we get!
    return baseCompletion.text
  } catch (error) {
    console.log(error)
  }
}
