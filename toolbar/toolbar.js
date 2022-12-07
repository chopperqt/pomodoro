import { appWindow } from '@tauri-apps/api/window'

appWindow.setDecorations(false)


document
  .getElementById('titlebar-minimize')
  .addEventListener('click', async () => {
    
  appWindow.unminimize()
  })
document
  .getElementById('titlebar-maximize')
  .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())