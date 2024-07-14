import { createAllTextFiles } from './src/texts'
import { transpile } from './ts-to-lua'

transpile()
await createAllTextFiles()
