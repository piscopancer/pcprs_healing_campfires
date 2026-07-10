import type { Texts } from 'anomaly-packer'
import { mcmTexts, mcmTextId } from '@/texts'

export default (t: Texts) => t.translations(mcmTexts.rus, mcmTextId)
