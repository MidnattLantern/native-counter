import { Text, Pressable } from "react-native";
import Styles from "@/styles/PsyTable";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";

const RenderEachPsyObject = () => {
    const { targetPsyObjectIndex, psyList, setTargetPsyObjectIndex } = usePsyMemory();

    return(
        psyList.map((object, index) => {
            const coefficient = object.values.valueA;
            const variableName = object.values.valueB;
            const power = object.values.valueC;

            return (
                <Pressable
                key={index}
                style={[Styles.PsyItem, index === targetPsyObjectIndex ? Styles.PsyItemTargeted : null]}
                onPress={() => {setTargetPsyObjectIndex(index)}}
                onPointerEnter={() => {setTargetPsyObjectIndex(index)}}
                >
                    <Text style={Styles.DisplayValueText}>
                        {coefficient}
                    </Text>
                    <Text style={Styles.DisplayValueText}>
                        {variableName}
                    </Text>
                    <Text style={[Styles.DisplayValueText, Styles.Exponent]}>
                        {power}
                    </Text>
                </Pressable>
            );
        })
    );
};

export default RenderEachPsyObject