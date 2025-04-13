

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

export const updateReducedTable = (
    psyList: {id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}[],
    setReducedValues: React.Dispatch<React.SetStateAction<{constant: Power, variableA: Power, variableB: Power, variableC: Power, variableX: Power, variableY: Power, variableZ: Power}>>
) => {

        let ReduceConstant = 0;
        let ReduceA = 0;
        let ReduceB = 0;
        let ReduceC = 0;
        let ReduceX = 0;
        let ReduceY = 0;
        let ReduceZ = 0;
    
        for (const object of psyList) {
            const { valueA, valueB } = object.values; // Value A represent base, Value B represent variable
    
            if (typeof valueA !== "number") continue; // only work with numbers
    
            switch (valueB) {
                case null:
                    ReduceConstant += valueA;
                    break;
                case "a":
                    ReduceA += valueA;
                    break;
                case "b":
                    ReduceB += valueA;
                    break;
                case "c":
                    ReduceC += valueA;
                    break;
                case "x":
                    ReduceX += valueA;
                    break;
                case "y":
                    ReduceY += valueA;
                    break;
                case "z":
                    ReduceZ += valueA;
                    break;
            };
        };
        setReducedValues({
            constant: { base: ReduceConstant, exponent: 0 },
            variableA: { base: ReduceA, exponent: 0 },
            variableB: { base: ReduceB, exponent: 0 },
            variableC: { base: ReduceC, exponent: 0 },
            variableX: { base: ReduceX, exponent: 0 },
            variableY: { base: ReduceY, exponent: 0 },
            variableZ: { base: ReduceZ, exponent: 0 }
        });
};