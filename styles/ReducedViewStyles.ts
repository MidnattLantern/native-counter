import { StyleSheet } from 'react-native';
import ColorThemes from './variables/ColorThemes';

const Styles = StyleSheet.create({
    Foundation: {
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ReducedVariableView: {
        flexDirection: 'row',
        margin: 5
    },
    DisplayText: {
        color: ColorThemes.white,
        fontFamily: "FacultyGlyphic"
    },
    Exponent: {
        fontSize: 9,
        top: -5
    }
});

export default Styles