import { PdfExtractData } from "../interfaces/PdfExtractData";
import fs from 'fs'
import pdf from 'pdf-parse'

export const extractTextFromPdf = async (filePath: string, filename: string) => {
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        return extractRelevantData(data.text, filename);
    } catch (error) {
        console.error('Erro to extract data from pdf:', error);
    }
};

const extractRelevantData = (extractedText: string, filename: string) => {
    const data: PdfExtractData = {
        filename,
        customerNumber: extractCustomerNumber(extractedText),
        instalationNumber: extractInstalationNumber(extractedText),
        monthReference: extractMonthReference(extractedText),
        electricEnergy: extractElectricEnergy(extractedText),
        energySceeIcms: extractEnergySceeIcms(extractedText),
        compensatedEnergyGd: extractCompensatedEnergyGd(extractedText),
        publicLighting: extractContributionPublicLighting(extractedText)
    };

    return data;
};

const extractCustomerNumber = (text: string) => {
    let allWords = text.split(' ').filter(item => item !== '')
    return allWords[allWords.indexOf("CLIENTE") + 4]
}

const extractInstalationNumber = (text: string) => {
    let allWords = text.split(' ').filter(item => item !== '')
    return allWords[allWords.indexOf("CLIENTE") + 5].replace(/\n/g, '')
}

const extractMonthReference = (text: string) => {
    const monthReference = text.match(/[A-Z]{3}\/\d{4}/);
    if (!monthReference) {
        return null
    }
    return monthReference[0]
}

const extractElectricEnergy = (text: string) => {
    const electricity = text.match(/Energia Elétrica\s*kWh\s*([\d.]+)\s*[\d.,]+\s*([\d.,]+)/);
    const unitedValue = electricity ? electricity[0].split(' ').filter(item => item !== '')[3] : null

    if (electricity && unitedValue) {
        return {
            quant: electricity[1],
            unitedValue: unitedValue,
            value: electricity[2]
        }
    }

    return null
}

const extractEnergySceeIcms = (text: string) => {
    const electricitySCEEEICMS = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+(?:\.\d+)?)\s+(\d+(?:,\d+)?)\s+(\d+(?:,\d+)?)/);

    if (!electricitySCEEEICMS) {
        return null
    }

    return {
        quant: electricitySCEEEICMS[1],
        unitedValue: electricitySCEEEICMS[2],
        value: electricitySCEEEICMS[3]
    }
}

const extractCompensatedEnergyGd = (text: string) => {
    const compensatedEnergyGd = text.match(/Energia compensada GD IkWh\s+(\d+(?:[,.]\d+)?)\s+(\d+(?:[,.]\d+)?)\s+(-?\d+(?:[,.]\d+)?)/);

    if (!compensatedEnergyGd) {
        return null
    }

    return {
        quant: compensatedEnergyGd[1],
        unitedValue: compensatedEnergyGd[2],
        value: compensatedEnergyGd[3]
    }
}

const extractContributionPublicLighting = (text: string) => {
    const contributionPublicLighting = text.match(/Contrib Ilum Publica Municipal\s*([\d.,]+)/);
    return contributionPublicLighting ? contributionPublicLighting[1] : null;
}
