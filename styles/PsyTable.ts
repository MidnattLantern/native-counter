import { StyleSheet } from 'react-native';
import ColorThemes from './variables/ColorThemes';

const Styles = StyleSheet.create({
    Foundation: {
        flexDirection: 'column'
    },
    PsyTableView: {
        flexDirection: 'row',
    },
    CommandPanelView: {
        flexDirection: 'row',
    },
    DisplayValueText: {
        color: ColorThemes.white,
        fontFamily: 'FacultyGlyphic'
    },
    PsyItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        borderWidth: 1,
        borderColor: ColorThemes.edge,
        borderStyle: 'solid',
        flexDirection: 'row'
    },
    PsyItemTargeted: {
        borderColor: ColorThemes.white,
    },
    CommandButton: {
        margin: 5,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: ColorThemes.edge,
        borderStyle: 'solid'
    },
    Exponent: {
        fontSize: 9,
        top: -5
    }
});

export default Styles