export { };

declare global {
  
  interface CustomJwtSessionClaims {
    metadata: {
      role: string;
    }
  }

  interface IPotentialJob {
    id: number;
    vaultNumber: string;
    owner: string;
    city: string;
    state: string;
     vaultWidthFt: number;
    vaultLengthFt: number;
    vaultHeightFt: number;
     vaultWidthIn: number;
    vaultLengthIn: number;
    vaultHeightIn: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: any;
    wallSqFt: number;
    ceilingSqFt: number;
    totalSqFt: number;
  }

  interface IMobileFactory {
    id: number;
    name: string;
    plateNumber: string;
    warehouseId: number;
  }

  interface IActiveJobWithMobileFactory {
    potentialJob: {
      vaultNumber: string;
      owner: string;
      city: string;
      state: string;
       vaultWidthFt: Decimal;
      vaultLengthFt: Decimal;
      vaultHeightFt: Decimal;
       vaultWidthIn: Decimal;
      vaultLengthIn: Decimal;
      vaultHeightIn: Decimal;
      wallSqFt: Decimal;
      ceilingSqFt: Decimal;
      totalSqFt: Decimal;
    };
    assignedMobileFactory: {
      id: number;
      name: string;
      plateNumber: string;
    };
  }


}