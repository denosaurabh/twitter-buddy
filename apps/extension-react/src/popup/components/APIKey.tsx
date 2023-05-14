import { useSettingsStore } from '../../utils/use-storage'

const formInputs = {
  KEY_INPUT: 'key_input',
}

export const APIKey = () => {
  const [settings, setSettings] = useSettingsStore()

  const onFormSubmit = (e: any) => {
    try {
      const data = new FormData(e.currentTarget)
      if (!data) return null

      const key = data.get(formInputs.KEY_INPUT)

      setSettings({
        ...settings,
        openAIKey: String(key),
      })
    } catch (err) {}
  }

  const onRemoveKeyClick = () => {
    setSettings({
      ...settings,
      openAIKey: '',
    })
  }

  if (settings['openAIKey']) {
    return (
      <div id="key_entered" className="flex flex-col mt-6 mb-5 gap-3">
        <p>
          You have <b>already</b> entered your OpenAI API Key.
        </p>
        {/* <button
          id="change_key_button"
          className="bg-slate-200 h-8 px-4 rounded-lg ease-in-out hover:bg-slate-300"
        >
          Change key
        </button> */}
        <button
          id="remove_key_button"
          className="bg-red-200 text-red-900 h-8 px-4 rounded-lg ease-in-out hover:bg-red-300"
          onClick={onRemoveKeyClick}
        >
          Remove key
        </button>
      </div>
    )
  }

  return (
    <div id="key_needed" className="flex flex-col mt-6 mb-5 gap-3 w-full">
      <p className="text-slate-700">
        To get started, enter your
        {/* <a
          target="_blank"
          href="https://beta.openai.com/account/api-keys"
          className="text-blue-500"
          rel="noreferrer"
        >
          Buddy API Key
        </a>
        or */}
        <a
          target="_blank"
          href="https://beta.openai.com/account/api-keys"
          className="text-blue-500"
          rel="noreferrer"
        >
          OpenAI API Key
        </a>
      </p>

      <form onSubmit={onFormSubmit} className="flex flex-col gap-3 w-full">
        <input
          id="key_input"
          name={formInputs.KEY_INPUT}
          placeholder="OpenAI API Key"
          className="border rounded-md h-8 px-2"
          required
        />
        <button
          type="submit"
          id="save_key_button"
          className="bg-slate-200 h-8 px-4 rounded-lg ease-in-out hover:bg-slate-300"
        >
          Add API key
        </button>
      </form>
    </div>
  )
}
