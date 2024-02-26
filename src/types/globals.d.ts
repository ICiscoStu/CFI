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
    vaultWidth: number;
    vaultLength: number;
    vaultHeight: number;
    status: string;
    approvedAt: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdBy: any
    createdById: string;
  }

  interface IMobileFactory {
    id: number;
    name: string;
    plateNumber: string;
    warehouseId: number;
}
}