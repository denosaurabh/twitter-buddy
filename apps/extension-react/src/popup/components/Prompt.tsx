import { useEffect, useState } from 'react'
import { DEFAULT_PROMPT_TEXT, useSettingsStore } from '../../utils/storage'

export const Prompt = () => {
  const [settings, setSettings] = useSettingsStore()

  const [status, setStatus] = useState<'normal' | 'updated' | 'resetted' | 'error'>('normal')
  const [customPrompt, setCustomPrompt] = useState(settings['promptText'])

  useEffect(() => {
    if (status !== 'normal') {
      setTimeout(() => {
        setStatus('normal')
      }, 3000)
    }
  }, [status])

  useEffect(() => {
    setCustomPrompt(settings.promptText)
  }, [settings])

  const onUpdatePromptClick = () => {
    setSettings({
      ...settings,
      promptText: customPrompt.trim(),
    })
    setStatus('updated')
  }

  const onResetPromptClick = () => {
    setSettings({
      ...settings,
      promptText: '',
    })
    setStatus('resetted')
  }

  return (
    <div className="flex flex-col mt-6 mb-5 gap-3 w-full" id="change_prompt_box">
      <p className="text-slate-700">Add Custom Prompt</p>

      <textarea
        id="custom_prompt_textarea"
        className="w-full min-h-fit h-28 bg-slate-200 p-2 rounded-md"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder={DEFAULT_PROMPT_TEXT}
      />
      <span className="text-slate-600 text-xs font-bold">
        The tweet will be added at the end of this prompt
      </span>

      {status === 'normal' ? (
        <>
          <button
            id="save_prompt_button"
            className="bg-green-200 text-teal-900 w-full h-8 px-4 rounded-lg ease-in-out hover:bg-teal-300"
            onClick={onUpdatePromptClick}
          >
            Update Prompt
          </button>
          {settings['promptText'] && settings['promptText'] !== DEFAULT_PROMPT_TEXT ? (
            <button
              id="reset_prompt_button"
              className="bg-transparent text-red-700 w-full h-8 px-4 rounded-lg ease-in-out hover:text-slate-900"
              onClick={onResetPromptClick}
            >
              Reset Prompt
            </button>
          ) : null}
        </>
      ) : null}

      {status === 'updated' ? (
        <span className="text-green-600 text-xs text-center">The prompt has been updated!</span>
      ) : null}

      {status === 'resetted' ? (
        <span className="text-green-600 text-xs text-center">The prompt has been reset!</span>
      ) : null}

      {status === 'error' ? (
        <span className="text-red-600 text-xs text-center">
          Error occured while updating prompt please try again later!
        </span>
      ) : null}
    </div>
  )
}
