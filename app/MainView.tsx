import { View } from "react-native";
import Styles from "@/styles/MainViewStyles";
import PsyTable from "@/components/PsyTable";

const MainView = () => {

    return(<>
        <View style={Styles.Foundation}>
            <PsyTable/>
        </View>
    </>)
};

export default MainView