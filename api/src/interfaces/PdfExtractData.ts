export interface PdfExtractData {
    filename: string,
    customerNumber: string,
    instalationNumber: string,
    monthReference: string|null,
    electricEnergy: ElectricEnergy|null,
    energySceeIcms: EnergySceeIcms|null,
    compensatedEnergyGd: CompensatedEnergyGd|null,
    publicLighting: string| null
}

interface ElectricEnergy {
    quant: string
    unitedValue: string
    value: string
}

interface EnergySceeIcms {
    quant: string
    unitedValue: string
    value: string
}

interface CompensatedEnergyGd {
    quant: string
    unitedValue: string
    value: string
}
