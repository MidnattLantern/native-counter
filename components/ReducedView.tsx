import { View, Text } from "react-native";
import Styles from "@/styles/ReducedViewStyles";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";

const ReducedView = () => {
    const {reducedValues} = usePsyMemory();

    return (
        <View style={Styles.Foundation}>

                {reducedValues.constant.base === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.constant.base}
                        </Text>
                    </View>
                )}

                {reducedValues.variableA.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableA.base + "a"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableA.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableA.exponent
                            )}
                        </Text>
                    </View>
                )}

                {reducedValues.variableB.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableB.base + "b"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableB.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableB.exponent
                            )}
                        </Text>
                    </View>
                )}

                {reducedValues.variableC.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableC.base + "c"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableC.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableC.exponent
                            )}
                        </Text>
                    </View>
                )}

                {reducedValues.variableX.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableX.base + "x"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableX.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableX.exponent
                            )}
                        </Text>
                    </View>
                )}

                {reducedValues.variableY.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableY.base + "y"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableY.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableY.exponent
                            )}
                        </Text>
                    </View>
                )}

                {reducedValues.variableZ.exponent === 0 ? (
                    null
                ) : (
                    <View style={Styles.ReducedVariableView}>
                        <Text style={Styles.DisplayText}>
                            {reducedValues.variableZ.base + "z"}
                        </Text>
                        <Text style={[Styles.DisplayText, Styles.Exponent]}>
                            {reducedValues.variableZ.exponent === 1 ? (
                                null
                            ) : (
                                reducedValues.variableZ.exponent
                            )}
                        </Text>
                    </View>
                )}

        </View>
    )
};

export default ReducedView