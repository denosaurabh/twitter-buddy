import { APIKey } from './components/APIKey'
import { Prompt } from './components/Prompt'

function App() {
  return (
    <main id="app" className="w-80 bg-slate-50 grid place-items-center py-10 px-7">
      <h1 className="text-2xl">Twitter Buddy</h1>

      <APIKey />
      <hr className="w-full border-b border-slate-200" />
      <Prompt />
    </main>
  )
}

export default App
