import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  // name: 'create-chrome-ext',
  // description: '',
  // version: '0.0.0',
  // manifest_version: 3,
  // icons: {
  //   '16': 'img/logo-16.png',
  //   '32': 'img/logo-34.png',
  //   '48': 'img/logo-48.png',
  //   '128': 'img/logo-128.png',
  // },
  // action: {
  //   default_popup: 'popup.html',
  //   default_icon: 'img/logo-48.png',
  // },
  // options_page: 'options.html',
  // background: {
  //   service_worker: 'src/background/index.ts',
  //   type: 'module',
  // },
  // content_scripts: [
  //   {
  //     matches: ['http://*/*', 'https://*/*'],
  //     js: ['src/content/index.ts'],
  //   },
  // ],
  // web_accessible_resources: [
  //   {
  //     resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
  //     matches: [],
  //   },
  // ],
  // permissions: [],

  name: 'Twitter buddy',
  description: 'your twitter buddy',
  version: '1.0',
  manifest_version: 3,
  icons: {
    '24': 'assets/24.png',
    '32': 'assets/32.png',
    '64': 'assets/64.png',
    '128': 'assets/128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_title: 'Generate nice tweet',
  },
  // options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['https://twitter.com/*'],
      js: [
        'src/content/index.ts',
        // 'src/api.ts', 'src/twitter.ts'
      ],
    },
  ],
  permissions: ['contextMenus', 'tabs', 'storage', 'scripting', 'activeTab', 'notifications'],
  host_permissions: ['https://twitter.com/*'],
})
