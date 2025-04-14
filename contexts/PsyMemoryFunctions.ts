/**
 * Aggregates and reduces values from the psyList and updates the reduced state.
 *
 * @param psyList - Array of psy objects containing values and metadata.
 * @param setReducedValues - State setter for updating the reduced values.
 */
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
type Power = { // Represents the base and exponent of a reduced value
    base: number;
    exponent: number;
};

export const updateReducedTable = (
    psyList: {id: string | null, values: PsyValues, scrollPositionMemory: PsyScrollPositionMemory}[],
    setReducedValues: React.Dispatch<React.SetStateAction<{constant: Power, variableA: Power, variableB: Power, variableC: Power, variableX: Power, variableY: Power, variableZ: Power}>>
) => {
    let ReduceBaseConstant = 0;
    let ReduceBaseA: number | null = null;
    let ReduceBaseB: number | null = null;
    let ReduceBaseC: number | null = null;
    let ReduceBaseX: number | null = null;
    let ReduceBaseY: number | null = null;
    let ReduceBaseZ: number | null = null;

    let ReduceExponentConstant = 0; // will always be 0, it exists for structured consistency
    let ReduceExponentA = 0;
    let ReduceExponentB = 0;
    let ReduceExponentC = 0;
    let ReduceExponentX = 0;
    let ReduceExponentY = 0;
    let ReduceExponentZ = 0;

    for (const object of psyList) {
        const { valueA, valueB, valueC } = object.values; // Value A represent base, Value B represent variable, Value C represent exponent

        if (typeof valueA !== "number") continue; // we only work with numbers for this project
        if (typeof valueC !== "number") continue; // we only work with numbers for this project

        switch (valueB) {
            case null:
                ReduceBaseConstant += (valueA ** valueC); // using arithmetic method
                break;
            case "a":
                ReduceBaseA = ReduceBaseA === null ? valueA : ReduceBaseA * valueA;
                ReduceExponentA += valueC;
                break;
            case "b":
                ReduceBaseB = ReduceBaseB === null ? valueA : ReduceBaseB * valueA;
                ReduceExponentB += valueC;
                break;
            case "c":
                ReduceBaseC = ReduceBaseC === null ? valueA : ReduceBaseC * valueA;
                ReduceExponentC += valueC;
                break;
            case "x":
                ReduceBaseX = ReduceBaseX === null ? valueA : ReduceBaseX * valueA;
                ReduceExponentX += valueC;
                break;
            case "y":
                ReduceBaseY = ReduceBaseY === null ? valueA : ReduceBaseY * valueA;
                ReduceExponentY += valueC;
                break;
            case "z":
                ReduceBaseZ = ReduceBaseZ === null ? valueA : ReduceBaseZ * valueA;
                ReduceExponentZ += valueC;
                break;
        };
    };
    setReducedValues({
        constant: { base: ReduceBaseConstant, exponent: ReduceExponentConstant },
        variableA: { base: ReduceBaseA ?? 0, exponent: ReduceExponentA },
        variableB: { base: ReduceBaseB ?? 0, exponent: ReduceExponentB },
        variableC: { base: ReduceBaseC ?? 0, exponent: ReduceExponentC },
        variableX: { base: ReduceBaseX ?? 0, exponent: ReduceExponentX },
        variableY: { base: ReduceBaseY ?? 0, exponent: ReduceExponentY },
        variableZ: { base: ReduceBaseZ ?? 0, exponent: ReduceExponentZ }
    });
};
