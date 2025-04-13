import { View, Text, ScrollView } from "react-native";
import Styles from "@/styles/MagScrollStyles";
import React, { useEffect, useRef, useState } from "react";
import { usePsyMemory } from "@/contexts/PsyMemoryContext";
import { Platform } from "react-native";

interface LibraryItem {
    id: number;
    value: number | string | null;
};

const MagScroll = (
    {
        useLibrary, identifier
    } : {
        useLibrary: LibraryItem[], identifier: string
    }
) => {
        const { targetPsyObjectIndex, psyList, setPsyList } = usePsyMemory();
        // states
        const [localValue, setLocalValue] = useState<null | number | string>(null);
        const [localScrollPositionMemory, setLocalScrollPositionMemory] = useState<number>(0);
        const libraryReferences = useRef<(Text | null)[]>([]);
        const scrollViewReference = useRef<ScrollView>(null);
        const [scrollViewPosition, setScrollViewPosition] = useState(0);
        const WaitForMomentumEnd = useRef(false);
        const selectedLibrary = useLibrary;

        // functions
        const ScrollToItem = (index: number) => {
            if (scrollViewReference.current) {
                scrollViewReference.current.scrollTo({ y: (50 * index), animated: true });
            }
        };
        const LocalizeClosestItem = () => {
            const references = libraryReferences.current;
            let closestIndex = null; // retrieve index of the closest item from library
            let closestDistance = Infinity; // retrieve distance from the limits within 25
            references.forEach((reference, index) => {
                if (reference) {
                        reference.measure((x, y, width, height, pageX, pageY) => {
                        const distance = Math.abs(y - scrollViewPosition)
                        if (distance < closestDistance) {
                            closestIndex = index;
                            closestDistance = distance;
                            ScrollToItem(closestIndex);
                            setLocalValue(selectedLibrary[index].value);
                            setLocalScrollPositionMemory(closestIndex);
                        } 
                    })
                }
            })
        };
        const UpdateValue = (identifier: string) => { // only pass A B or C for identifier
            setPsyList(prevData =>
                prevData.map((item, index) =>
                    index === targetPsyObjectIndex ?
                    { ...item, values: { ...item.values, [`value${identifier}`]: localValue}, scrollPositionMemory: { ...item.scrollPositionMemory, [`position${identifier}`]: localScrollPositionMemory} }
                    :
                    item // skip that don't target with targetPsyObject
                )
            );
        };

        // components
        const MarginalArray = ({children} : {children : React.ReactNode}) => {
            return (
                <View style={Styles.MarginalArray}>
                    {children}
                </View>
            )
        };

        // effect and syncorization
        useEffect(() => {
            const syncorize = () => {
                if (targetPsyObjectIndex !== null) {
                    if (identifier === "A") {
                        ScrollToItem(psyList[targetPsyObjectIndex].scrollPositionMemory.positionA);
                        setLocalValue(psyList[targetPsyObjectIndex].values.valueA);
                        setLocalScrollPositionMemory(psyList[targetPsyObjectIndex].scrollPositionMemory.positionA);
                    } else if (identifier === "B") {
                        ScrollToItem(psyList[targetPsyObjectIndex].scrollPositionMemory.positionB);
                        setLocalValue(psyList[targetPsyObjectIndex].values.valueB);
                        setLocalScrollPositionMemory(psyList[targetPsyObjectIndex].scrollPositionMemory.positionB);
                    } else if (identifier === "C") {
                        ScrollToItem(psyList[targetPsyObjectIndex].scrollPositionMemory.positionC);
                        setLocalValue(psyList[targetPsyObjectIndex].values.valueC);
                        setLocalScrollPositionMemory(psyList[targetPsyObjectIndex].scrollPositionMemory.positionC);
                    };
                } else {
                    ScrollToItem(0);
                    setLocalValue(null);
                    setLocalScrollPositionMemory(0);
                };
            };
            syncorize();
        }, [targetPsyObjectIndex]);
        useEffect(() => {
            UpdateValue(identifier);
        }, [localValue])
        useEffect(() => { // dummy scroll to wake up magscoll for Android
            if (Platform.OS === 'android') {
              setTimeout(() => {
                scrollViewReference.current?.scrollTo({ y: 1, animated: false });
                scrollViewReference.current?.scrollTo({ y: 0, animated: false });
              }, 250);
            }
          }, []);

    // render
    return(
        <>
        <View style={Styles.Foundation}>
            <View style={[Styles.ControlItem]}>
                <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                ref={scrollViewReference}
                onPointerEnter={() => {
                }}
                onPointerLeave={() => {
                    LocalizeClosestItem()
                }}
                onMomentumScrollBegin={() => {
                        WaitForMomentumEnd.current = true;
                }}
                onMomentumScrollEnd={() => {
                          if (WaitForMomentumEnd.current) {
                            WaitForMomentumEnd.current = false;
                            LocalizeClosestItem();
                        }
                }}
                onScrollEndDrag={() => {
                    setTimeout(() => {
                        if (!WaitForMomentumEnd.current) {
                            LocalizeClosestItem();
                        }
                    }, 50); // delay to allow other behaviours to interfere
                }}

                onScroll={(event) => {
                    setScrollViewPosition((event.nativeEvent.contentOffset.y)+50)
                }}

                scrollEventThrottle={50}
                >
                    <MarginalArray>
                        {selectedLibrary.map((item, index) => (
                            <Text 
                            onPress={() => {
                                setLocalValue(item.value);
                                ScrollToItem(index);
                                setTimeout(() => {
                                }, 0); // to make it respond on the first click/ tap
                            }}
                            style={Styles.ControlItemSize}
                            key={`${index}`}
                            id={(index ?? 'null').toString()}
                            ref={(element) => (libraryReferences.current[index] = element)}
                            >{item.value !== null ? item.value : '-'}</Text>
                        ))}
                    </MarginalArray>
                </ScrollView>
            </View>
        </View>
        </>
    )
};

export default MagScroll