

function convertToFeet(length: string, unit: string): number {
    if (unit.toLowerCase() === 'in') {
        return parseFloat(length) / 12;
    } else if (unit.toLowerCase() === 'ft') {
        return parseFloat(length);
    } else {
        throw new Error("Unsupported unit. Please use 'inches' or 'feet'.");
    }
}

export function handleCalculateSqFt(
    vaultWidth: string,
    vaultWidthUnit: string,
    vaultLength: string,
    vaultLengthUnit: string,
    vaultHeight: string,
    vaultHeightUnit: string): [number, number, number] {
    const widthInFeet = convertToFeet(vaultWidth, vaultWidthUnit);
    const lengthInFeet = convertToFeet(vaultLength, vaultLengthUnit);
    const heightInFeet = convertToFeet(vaultHeight, vaultHeightUnit);

    // Calculate wall area
    const wallArea = 2 * (lengthInFeet * heightInFeet) + 2 * (widthInFeet * heightInFeet);

    // Calculate ceiling area
    const ceilingArea = lengthInFeet * widthInFeet;

    // Calculate total area
    const totalArea = wallArea + ceilingArea;

    return [wallArea, ceilingArea, totalArea];
}