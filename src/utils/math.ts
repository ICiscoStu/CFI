
// helper  function fort conversion
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
    vaultWidthFt: string,
    vaultLengthFt: string,
    vaultHeightFt: string,
    vaultWidthIn: string,
    vaultLengthIn: string,
    vaultHeightIn: string
): [ totalWallSqFt: number, totalCeilingSqFt: number, totalFootage: number ] {
    // Convert dimensions to numbers
    const widthFt = parseFloat(vaultWidthFt);
    const lengthFt = parseFloat(vaultLengthFt);
    const heightFt = parseFloat(vaultHeightFt);
    const widthIn = parseFloat(vaultWidthIn);
    const lengthIn = parseFloat(vaultLengthIn);
    const heightIn = parseFloat(vaultHeightIn);
  
    // Calculate dimensions in inches
    const totalWidthIn = widthFt * 12 + widthIn;
    const totalLengthIn = lengthFt * 12 + lengthIn;
    const totalHeightIn = heightFt * 12 + heightIn;
  
    // Calculate total wall square footage
    const totalWallSqFt = 2 * ((totalWidthIn * totalHeightIn) + (totalLengthIn * totalHeightIn)) / 144; // Convert square inches to square feet
  
    // Calculate total ceiling square footage
    const totalCeilingSqFt = (totalWidthIn * totalLengthIn) / 144; // Convert square inches to square feet
  
    // Calculate total footage
    const totalFootage = 2 * (totalWallSqFt + totalCeilingSqFt);
  
    return [ totalWallSqFt, totalCeilingSqFt, totalFootage];
}

export function calculateJobRequirements(
    totalWallSqFt: number,
    totalCeilingSqFt: number,
    totalFootage: number
) {
    // initla estimates
    const vaultWallBase = ( (totalWallSqFt*1) + (totalCeilingSqFt*1)) / 4;
    const ceilingBase   = (totalCeilingSqFt*1) / 4;
    const glass         = (totalFootage * 3) / (25 * 6);
    const topCoat       = (totalFootage*1) / 16;
    const partBWall     = (((415*vaultWallBase)+(814*topCoat))*0.000264172)/4.5;
    const partBCeiling  = ((ceilingBase*265)*0.000264172)/3;

    // safety stock @ 30%
    const vaultWallBase30 = vaultWallBase * 0.3;
    const ceilingBase30   = ceilingBase * 0.3;
    const glass30         = glass * 0.3;
    const topCoat30       = topCoat * 0.3;
    const partBWall30     = (((415*vaultWallBase30)+(814*topCoat30))*0.000264172)/4.5
    const partBCeiling30  = ((ceilingBase30*265)*0.000264172)/3;

    // total estimates
    const totalVaultWallBase = vaultWallBase + vaultWallBase30;
    const totalCeilingBase   = ceilingBase + ceilingBase30;
    const totalGlass         = glass + glass30;
    const totalTopCoat       = topCoat + topCoat30;
    const totalPartBWall     = partBWall + partBWall30;
    const totalPartBCeiling  = partBCeiling + partBCeiling30;

    const estimates = {
        initial: {
            WallBase: Math.round(vaultWallBase),
            ceilingBase: Math.round(ceilingBase),
            glass: Math.round(glass),
            topCoat: Math.round(topCoat),
            partBWall: Math.round(partBWall),
            partBCeiling: Math.round(partBCeiling)
        },
        safety30: {
            wallBase: Math.round(vaultWallBase30),
            ceilingBase: Math.round(ceilingBase30),
            glass: Math.round(glass30),
            topCoat: Math.round(topCoat30),
            partBWall: Math.round(partBWall30),
            partBCeiling: Math.round(partBCeiling30)
        },
        total: {
            wallBase: Math.round(totalVaultWallBase),
            ceilingBase: Math.round(totalCeilingBase),
            glass: Math.round(totalGlass),
            topCoat: Math.round(totalTopCoat),
            partBWall: Math.round(totalPartBWall),
            partBCeiling: Math.round(totalPartBCeiling)
        }
    };

    return estimates;
}