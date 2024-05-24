export interface PdfExtractData {
    filename: string,
    customerNumber: string,
    instalationNumber: string,
    monthReference: string|null,
    monthDigitReference: number | null
    electricEnergy: ElectricEnergy|null,
    energySceeIcms: EnergySceeIcms|null,
    compensatedEnergyGd: CompensatedEnergyGd|null,
    publicLighting: number
}

interface ElectricEnergy {
    quant: number
    unitedValue: number
    value: number
}

interface EnergySceeIcms {
    quant: number
    unitedValue: number
    value: number
}

interface CompensatedEnergyGd {
    quant: number
    unitedValue: number
    value: number
}
