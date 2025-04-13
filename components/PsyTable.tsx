import { View, Text, Pressable, TextProps } from "react-native";
import Styles from "@/styles/PsyTable";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";
import React from "react";
import uuid from 'react-native-uuid';

interface CustomTextProps extends TextProps {
    jumpValue: number
};

const PsyTable = () => {

    const { targetPsyObjectIndex, psyList, currentPsyItem, setTargetPsyObjectIndex, setPsyList, setCurrentPsyItem } = usePsyMemory();
    const newItemIndex = uuid.v4();

    // functions
    const createPsyObject = () => {
        setPsyList(preExisting => [
          ...preExisting,
          {
            id: newItemIndex, // or some unique ID logic
            values: { valueA: null, valueB: null, valueC: null },
            scrollPositionMemory: { positionA: 0, positionB: 0, positionC: 0 }
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

    // components
    const RenderEachPsyObject = () => {
        return(
            psyList.map((object, index) => 
                <Pressable
                key={index}
                style={[Styles.PsyItem, index === targetPsyObjectIndex ? Styles.PsyItemTargeted : null]}
                onPress={() => {setTargetPsyObjectIndex(index)}}
                onPointerEnter={() => {setTargetPsyObjectIndex(index)}}
                >
                    <Text style={Styles.DisplayValueText}>{object.values.valueA}</Text>
                    <Text style={Styles.DisplayValueText}>{object.values.valueB}</Text>
                    <Text style={[Styles.DisplayValueText, Styles.Exponent]}>{object.values.valueC}</Text>
                </Pressable>
            )
        );
    };
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