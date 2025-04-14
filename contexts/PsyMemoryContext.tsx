import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { updateReducedTable } from "./PsyMemoryFunctions";

const PsyMemoryContext = createContext<PsyMemoryContextType | undefined>(undefined);

interface PsyMemoryProviderProps {
    children: ReactNode
};

type PsyValues = {
    valueA: number | string | null;
    valueB: number | string | null;
    valueC: number | string | null;
};
type PsyScrollPositionMemory = {
    positionA: number;
    positionB: number;
    positionC: number;
};
type Power = {
    base: number;
    exponent: number;
};

interface PsyMemoryContextType {
    targetPsyObjectIndex: number | null,
    psyList: {id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}[];
    currentPsyItem: {id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory};
    reducedValues: {constant: Power, variableA: Power, variableB: Power, variableC: Power, variableX: Power, variableY: Power, variableZ: Power};
    setTargetPsyObjectIndex: React.Dispatch<React.SetStateAction<any>>;
    setPsyList: React.Dispatch<React.SetStateAction<{id: any, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}[]>>;
    setCurrentPsyItem: React.Dispatch<React.SetStateAction<{id: any, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}>>;
    setReducedValues: React.Dispatch<React.SetStateAction<{constant: Power, variableA: Power, variableB: Power, variableC: Power, variableX: Power, variableY: Power, variableZ: Power}>>;
};

export const PsyMemoryProvider: React.FC<PsyMemoryProviderProps> = ({ children }) => {
    const [targetPsyObjectIndex, setTargetPsyObjectIndex] = useState<number | null>(null);
    const [psyList, setPsyList] = useState<{id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}[]>([
        /*
        {
            id: "dummy-1",
            values: {valueA: 1, valueB: "b", valueC: 2},
            scrollPositionMemory: {positionA: 0, positionB: 0, positionC: 0}
        }
        */
    ]);
    const [currentPsyItem, setCurrentPsyItem] = useState<{id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}>({
        id: null,
        values: {valueA: null, valueB: null, valueC: null},
        scrollPositionMemory: {positionA: 0, positionB: 0, positionC: 0}
    });
    const [reducedValues, setReducedValues] = useState<{ // to be reprecated alter
        constant: Power, 
        variableA: Power, variableB: Power, variableC: Power,
        variableX: Power, variableY: Power, variableZ: Power
    }>({
        constant: {base: 0, exponent: 0},
        variableA: {base: 0, exponent: 0},
        variableB: {base: 0, exponent: 0},
        variableC: {base: 0, exponent: 0},
        variableX: {base: 0, exponent: 0},
        variableY: {base: 0, exponent: 0},
        variableZ: {base: 0, exponent: 0}
    });

    // effect
    useEffect(() => {
        const updateContextData = () => {
            if (targetPsyObjectIndex !== null) {
                setCurrentPsyItem({
                    id: psyList[targetPsyObjectIndex].id,
                    values: {
                        valueA: psyList[targetPsyObjectIndex].values.valueA,
                        valueB: psyList[targetPsyObjectIndex].values.valueB,
                        valueC: psyList[targetPsyObjectIndex].values.valueC,
                    },
                    scrollPositionMemory: {
                        positionA: psyList[targetPsyObjectIndex].scrollPositionMemory.positionA,
                        positionB: psyList[targetPsyObjectIndex].scrollPositionMemory.positionB,
                        positionC: psyList[targetPsyObjectIndex].scrollPositionMemory.positionC,
                    }
                });
            };
            updateReducedTable(psyList, setReducedValues);
        };
        updateContextData();
    }, [targetPsyObjectIndex, psyList]);

    return(
        <PsyMemoryContext.Provider
        value={{
            targetPsyObjectIndex,
            psyList,
            currentPsyItem,
            reducedValues, // to be replaced on future reiteration
            setTargetPsyObjectIndex,
            setPsyList,
            setCurrentPsyItem,
            setReducedValues // to be replaced on future reiteration
        }}
        >
            {children}
        </PsyMemoryContext.Provider>
    )
};

export const usePsyMemory = () => {
    const context  = useContext(PsyMemoryContext);
    if (context === undefined) {
        throw new Error("PsyMemoryContext error")
    }
    return context;
};