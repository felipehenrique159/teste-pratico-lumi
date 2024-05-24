export interface PdfExtractData {
    filename: string,
    customerNumber: string,
    instalationNumber: string,
    monthReference: string,
    monthDigitReference: number
    electricEnergy: ElectricEnergy|null,
    energySceeIcms: EnergySceeIcms|null,
    compensatedEnergyGd: CompensatedEnergyGd|null,
    publicLighting: number
}

export interface ElectricEnergy {
    quant: number
    unitedValue: number
    value: number
}

export interface EnergySceeIcms {
    quant: number
    unitedValue: number
    value: number
}

export interface CompensatedEnergyGd {
    quant: number
    unitedValue: number
    value: number
}
