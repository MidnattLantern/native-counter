import { View, Text } from "react-native";
import Styles from "@/styles/ReducedViewStyles";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";

const ReducedView = () => {
    const {reducedValues} = usePsyMemory();

    return (
        <View style={Styles.Foundation}>
            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.constant.base}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableA.base + "a"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableA.exponent}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableB.base + "b"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableB.exponent}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableC.base + "c"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableC.exponent}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableX.base + "x"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableX.exponent}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableY.base + "y"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableY.exponent}
                </Text>
            </View>

            <View style={Styles.ReducedVariableView}>
                <Text style={Styles.DisplayText}>
                    {reducedValues.variableZ.base + "z"}
                </Text>
                <Text style={[Styles.DisplayText, Styles.Exponent]}>
                    {reducedValues.variableZ.exponent}
                </Text>
            </View>

        </View>
    )
};

export default ReducedView