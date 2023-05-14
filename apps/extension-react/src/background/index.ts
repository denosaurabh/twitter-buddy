import { generateCompletionAction } from '../utils/api'

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'context-run',
    title: 'Entertainer',
    contexts: ['selection'],
  })
})

//  listener
chrome.contextMenus.onClicked.addListener(({ selectionText }) =>
  generateCompletionAction(`${selectionText}`),
)
