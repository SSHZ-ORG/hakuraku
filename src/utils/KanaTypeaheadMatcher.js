import {toKatakana, toRomaji} from 'wanakana';

const normalizeRomaji = (s) => toRomaji(s).toLowerCase();
const normalizeKatakana = (s) => toKatakana(s).toLowerCase(); // To support ローマ字入力

function KanaTypeaheadMatcher(option, props) {
    const labelKey = props.labelKey(option);
    return normalizeRomaji(labelKey).indexOf(normalizeRomaji(props.text)) !== -1 ||
        normalizeKatakana(labelKey).indexOf(normalizeKatakana(props.text)) !== -1;
}

export default KanaTypeaheadMatcher;
