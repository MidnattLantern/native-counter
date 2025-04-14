import { usePsyMemory } from "./PsyMemoryContext";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import ColorThemes from "@/styles/variables/ColorThemes";

const ContextBar = () => {
    const {
        targetPsyObjectIndex,
        psyList,
        currentPsyItem,
        reducedValues
    } = usePsyMemory();
    const countItems = psyList.length;

    // components
    const SectionView = ({children} : {children : React.ReactNode}) => {
        return(
            <View style={Styles.SectionView}>
                {children}
            </View>
        )
    }

    return(<>
        <View style={Styles.Foundation}>
            <SectionView>
                <Text style={Styles.DisplayText}>{'Count Items: ' + countItems}</Text>
                <Text style={Styles.DisplayText}>{'Target index: ' + targetPsyObjectIndex}</Text>
                <Text style={Styles.DisplayText}>{'Target ID: ' + currentPsyItem.id}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Target Value A:  ' + currentPsyItem.values.valueA}</Text>
                <Text style={Styles.DisplayText}>{'Target Value B:  ' + currentPsyItem.values.valueB}</Text>
                <Text style={Styles.DisplayText}>{'Target Value C:  ' + currentPsyItem.values.valueC}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Target Scroll Memory Position A:  ' + currentPsyItem.scrollPositionMemory.positionA}</Text>
                <Text style={Styles.DisplayText}>{'Target Scroll Memory Position B:  ' + currentPsyItem.scrollPositionMemory.positionB}</Text>
                <Text style={Styles.DisplayText}>{'Target Scroll Memory Position C:  ' + currentPsyItem.scrollPositionMemory.positionC}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Constant sum: ' + reducedValues.constant.base}</Text>
                <Text style={Styles.DisplayText}>{'Constant exponent: ' + reducedValues.constant.exponent}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Variable A sum: ' + reducedValues.variableA.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable A exponent: ' + reducedValues.variableA.exponent}</Text>
                <Text style={Styles.DisplayText}>{'Variable B sum: ' + reducedValues.variableB.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable B exponent: ' + reducedValues.variableB.exponent}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Variable C sum: ' + reducedValues.variableC.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable C exponent: ' + reducedValues.variableC.exponent}</Text>
                <Text style={Styles.DisplayText}>{'Variable X sum: ' + reducedValues.variableX.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable X exponent: ' + reducedValues.variableX.exponent}</Text>
            </SectionView>

            <SectionView>
                <Text style={Styles.DisplayText}>{'Variable Y sum: ' + reducedValues.variableY.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable Y exponent: ' + reducedValues.variableY.exponent}</Text>
                <Text style={Styles.DisplayText}>{'Variable Z sum: ' + reducedValues.variableZ.base}</Text>
                <Text style={Styles.DisplayText}>{'Variable Z exponent: ' + reducedValues.variableZ.exponent}</Text>
            </SectionView>
        </View>
    </>)
};

export default ContextBar;

const Styles = StyleSheet.create({
    Foundation: {
        width: '100%',
        height: 70, // before was 50
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorThemes.dark,
        flexDirection: 'row',
        overflowX: 'scroll',
        overflowY: 'hidden'
    },
    DisplayText: {
        color: ColorThemes.whiteOffset,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 9, // before was 7.5
        fontFamily: 'FacultyGlyphic'
    },
    SectionView: {
        flexDirection: 'column',
        width: 225,
        height: '100%',
        alignItems: 'baseline',
        justifyContent: 'center'
    }
})