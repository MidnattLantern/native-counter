import { View } from "react-native";
import Styles from "@/styles/MainViewStyles";
import PsyTable from "@/components/PsyTable";
import ReducedView from "@/components/ReducedView";

const MainView = () => {

    return(<>
        <View style={Styles.Foundation}>
            <PsyTable/>
            <ReducedView/>
        </View>
    </>)
};

export default MainView