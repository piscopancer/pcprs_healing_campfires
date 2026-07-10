import type { Texts } from 'anomaly-packer'
import { addonTexts, addonTextId } from '@/texts'

export default (t: Texts) => t.translations(addonTexts.eng, addonTextId)
