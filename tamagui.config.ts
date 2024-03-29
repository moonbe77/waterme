// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { createTamagui } from 'tamagui' // or '@tamagui/core'
import { config } from '@tamagui/config/v2'

// import { Text, View } from 'react-native'

const appConfig = createTamagui(config)
export type AppConfig = typeof appConfig
declare module 'tamagui' {
  // or '@tamagui/core'

  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig
