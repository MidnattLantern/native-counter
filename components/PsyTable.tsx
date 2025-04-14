import { View, Text, Pressable, TextProps } from "react-native";
import Styles from "@/styles/PsyTable";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";
import React from "react";
import uuid from 'react-native-uuid';
import RenderEachPsyObject from "./PsyTableComponents/RenderEachPsyObject";

interface CustomTextProps extends TextProps {
    jumpValue: number
};

const PsyTable = () => {

    const { targetPsyObjectIndex, psyList, currentPsyItem, setTargetPsyObjectIndex, setPsyList } = usePsyMemory();
    const newItemIndex = uuid.v4();

    // functions
    const createPsyObject = () => {
        setPsyList(preExisting => [
          ...preExisting,
          {
            id: newItemIndex, // or some unique ID logic
            values: { valueA: 1, valueB: null, valueC: 1 },
            scrollPositionMemory: { positionA: 3, positionB: 0, positionC: 1 }
          }
        ]);
        setTargetPsyObjectIndex(psyList.length);
      };
      const deletePsyObject = () => {
        setPsyList(preExisting =>
            preExisting.filter(item => item.id !== currentPsyItem.id)
        );
        setTargetPsyObjectIndex(null);
    };

    // elements
    const NavigateTargetButton: React.FC<CustomTextProps> = ({ children, jumpValue }) => {
        const HandleNavigateTarget = (jumpValue: number) => {
            if (targetPsyObjectIndex !== null) {
                if (targetPsyObjectIndex+jumpValue < 0) {
                    setTargetPsyObjectIndex(psyList.length-1);
                } else if (targetPsyObjectIndex+jumpValue == psyList.length) {
                    setTargetPsyObjectIndex(0);
                } else {
                    setTargetPsyObjectIndex(targetPsyObjectIndex+jumpValue);
                };
            };
        };
        return(
            <Pressable style={Styles.CommandButton} onPress={() => {HandleNavigateTarget(jumpValue)}}>
                <Text style={Styles.DisplayValueText} selectable={false}>
                    {children}
                </Text>
            </Pressable>
        )
    };

    return(
        <View style={Styles.Foundation}>
            <View style={Styles.CommandPanelView}>
                <NavigateTargetButton jumpValue={1}>{"next"}</NavigateTargetButton>
                <NavigateTargetButton jumpValue={-1}>{"previous"}</NavigateTargetButton>
                <Pressable style={Styles.CommandButton} onPress={() => {createPsyObject()}}>
                    <Text style={Styles.DisplayValueText} >{"+ Add"}</Text>
                </Pressable>
                <Pressable style={Styles.CommandButton} onPress={() => {deletePsyObject()}}>
                    <Text style={Styles.DisplayValueText} >{"- Delete"}</Text>
                </Pressable>
            </View>
            <View style={Styles.PsyTableView}>
            <RenderEachPsyObject/>
                <Pressable style={Styles.PsyItem} onPress={() => {createPsyObject()}}>
                    <Text style={Styles.DisplayValueText}>
                        {"+ Add"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PsyTable