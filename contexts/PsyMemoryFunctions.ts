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
    let ReduceBaseConstant: number | null = null;
    let ReduceBaseA: number | null = null;
    let ReduceBaseB: number | null = null;
    let ReduceBaseC: number | null = null;
    let ReduceBaseX: number | null = null;
    let ReduceBaseY: number | null = null;
    let ReduceBaseZ: number | null = null;

    let ReduceExponentConstant = 0;
    let ReduceExponentA = 0;
    let ReduceExponentB = 0;
    let ReduceExponentC = 0;
    let ReduceExponentX = 0;
    let ReduceExponentY = 0;
    let ReduceExponentZ = 0;

    for (const object of psyList) {
        const { valueA, valueB, valueC } = object.values; // Value A represent base, Value B represent variable, Value C represent exponent

        const TurnVarInto1 = () => {
            const turnValue = valueC === 0 ? (
                ReduceBaseConstant = ReduceBaseConstant === null ? (1) : (ReduceBaseConstant * 1)
                ) : (
                    null
                );
            return turnValue
        };
        const AddToVariable = (variable: string) => {
            if (typeof valueA === "number" && typeof valueC === "number") {
                switch (variable) {
                    case "A":
                        ReduceBaseA = ReduceBaseA === null ? valueA : ReduceBaseA * valueA;
                        ReduceExponentA += valueC;
                        break;
                    case "B":
                        ReduceBaseB = ReduceBaseB === null ? valueA : ReduceBaseB * valueA;
                        ReduceExponentB += valueC;
                        break;
                    case "C":
                        ReduceBaseC = ReduceBaseC === null ? valueA : ReduceBaseC * valueA;
                        ReduceExponentC += valueC;
                        break;
                    case "X":
                        ReduceBaseX = ReduceBaseX === null ? valueA : ReduceBaseX * valueA;
                        ReduceExponentX += valueC;
                        break;
                    case "Y":
                        ReduceBaseY = ReduceBaseY === null ? valueA : ReduceBaseY * valueA;
                        ReduceExponentY += valueC;
                        break;
                    case "Z":
                        ReduceBaseZ = ReduceBaseZ === null ? valueA : ReduceBaseZ * valueA;
                        ReduceExponentZ += valueC;
                        break;
                }
            };
        };

        const CheckExponent = (variable: string) => {
            valueC === 0 ? (
                TurnVarInto1()
            ) : (
                AddToVariable(variable)
            )
        };

        if (typeof valueA !== "number") continue; // we only work with numbers for this project
        if (typeof valueC !== "number") continue; // we only work with numbers for this project

        switch (valueB) {
            case null:
                ReduceBaseConstant = ReduceBaseConstant === null ? (valueA ** valueC) : // using arithmetic logic
                ReduceBaseConstant * (valueA ** valueC); // using arithmetic logic
                break;
            case "a":
                CheckExponent("A");
                break;
            case "b":
                CheckExponent("B");
                break;
            case "c":
                CheckExponent("C");
                break;
            case "x":
                CheckExponent("X");
                break;
            case "y":
                CheckExponent("Y");
                break;
            case "z":
                CheckExponent("Z");
                break;
        };
    };
    setReducedValues({
        constant: { base: ReduceBaseConstant ?? 0, exponent: ReduceExponentConstant },
        variableA: { base: ReduceBaseA ?? 0, exponent: ReduceExponentA },
        variableB: { base: ReduceBaseB ?? 0, exponent: ReduceExponentB },
        variableC: { base: ReduceBaseC ?? 0, exponent: ReduceExponentC },
        variableX: { base: ReduceBaseX ?? 0, exponent: ReduceExponentX },
        variableY: { base: ReduceBaseY ?? 0, exponent: ReduceExponentY },
        variableZ: { base: ReduceBaseZ ?? 0, exponent: ReduceExponentZ }
    });
};
