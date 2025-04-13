import { View } from "react-native";
import Styles from "@/styles/ControlPadStyles";
import MagScroll from "@/components/MagScroll";
import libraryData from "@/data/menu/MagScrollLibraryData.json";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";

const ControlPad = () => {
    const { targetPsyObjectIndex } = usePsyMemory();

    return(<>
        <View style={Styles.Foundation}>
            {targetPsyObjectIndex !== null ?
            
            <View style={Styles.ControlArray}>
                <MagScroll useLibrary={libraryData.library1} identifier={"A"}/>
                <MagScroll useLibrary={libraryData.library2} identifier={"B"}/>
                <MagScroll useLibrary={libraryData.library3} identifier={"C"}/>
            </View>

            : null}
        </View>
    </>);
};

export default ControlPad