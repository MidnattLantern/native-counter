import { StyleSheet } from 'react-native';
import ColorThemes from './variables/ColorThemes';

const Styles = StyleSheet.create({
    Foundation: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ControlArray: {
        flexDirection: 'row'
    },
    ControlItem: {
        flexDirection: 'column',
        margin: 10,
        width: 100,
        height: 150,
        borderWidth: 1,
        borderColor: ColorThemes.edge,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ControlItemSize: {
        width: 98,
        height: 50,
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 50
    }
});

export default Styles