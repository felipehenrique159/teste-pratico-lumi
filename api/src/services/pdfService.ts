import { CompensatedEnergyGd, ElectricEnergy, EnergySceeIcms, PdfExtractData } from "../interfaces/PdfExtractData";
import fs from 'fs';
import pdf from 'pdf-parse';
import { Request, Response } from 'express';
import { MonthDigits } from "../interfaces/MonthDigits";

export default class PdfService {
    static async extractTextFromPdf(filePath: string, filename: string) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return this.extractRelevantData(data.text, filename);
    }

    static async downloadPdf(request: Request, response: Response) {
        const filePath = request.query.file as string;
        if (!filePath) {
            return response.status(400).send('File path is required');
        }

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return response.status(404).send('File not found');
            }
            return fs.createReadStream(filePath).pipe(response);
        });
    }

    static extractRelevantData = (extractedText: string, filename: string) => {
        const data: PdfExtractData = {
            filename,
            customerNumber: this.extractCustomerNumber(extractedText),
            instalationNumber: this.extractInstalationNumber(extractedText),
            monthReference: this.extractMonthReference(extractedText),
            monthDigitReference: this.extractMonthDigitReference(extractedText),
            electricEnergy: this.extractElectricEnergy(extractedText),
            energySceeIcms: this.extractEnergySceeIcms(extractedText),
            compensatedEnergyGd: this.extractCompensatedEnergyGd(extractedText),
            publicLighting: this.extractContributionPublicLighting(extractedText)
        };

        return data;
    };


    static extractCustomerNumber = (text: string): string => {
        let allWords = text.split(' ').filter(item => item !== '')
        return allWords[allWords.indexOf("CLIENTE") + 4].trim()
    }

    static extractInstalationNumber = (text: string): string => {
        let allWords = text.split(' ').filter(item => item !== '')
        return allWords[allWords.indexOf("CLIENTE") + 5].replace(/\n/g, '').trim()
    }

    static extractMonthReference = (text: string): string => {
        const monthReference = text.match(/[A-Z]{3}\/\d{4}/);
        return monthReference ? monthReference[0] : ''
    }

    static extractMonthDigitReference = (text: string): number => {
        const monthReference = text.match(/[A-Z]{3}\/\d{4}/);
        return monthReference ? this.getMonthDigitFromLabel(
            monthReference[0].split('/')[0]
        ) : 0
    }

    static extractElectricEnergy = (text: string): ElectricEnergy | null => {
        const electricity = text.match(/Energia Elétrica\s*kWh\s*([\d.]+)\s*[\d.,]+\s*([\d.,]+)/);
        const unitedValue = electricity ? electricity[0].split(' ').filter(item => item !== '')[3] : null

        if (electricity && unitedValue) {
            return {
                quant: parseInt(
                    electricity[1].replace('.', '')
                ),
                unitedValue: parseFloat(
                    unitedValue.replace(',', '.')
                ),
                value: parseFloat(
                    electricity[2].replace('.', '').replace(',', '.')
                )
            }
        }

        return null
    }

    static extractEnergySceeIcms = (text: string): EnergySceeIcms | null => {
        const electricitySCEEEICMS = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+(?:\.\d+)?)\s+(\d+(?:,\d+)?)\s+(\d+(?:,\d+)?)/);

        if (!electricitySCEEEICMS) {
            return null
        }

        return {
            quant: parseInt(
                electricitySCEEEICMS[1].replace('.', '')
            ),
            unitedValue: parseFloat(
                electricitySCEEEICMS[2].replace(',', '.')
            ),
            value: parseFloat(
                electricitySCEEEICMS[3].replace('.', '').replace(',', '.')
            )
        }
    }

    static extractCompensatedEnergyGd = (text: string): CompensatedEnergyGd | null => {
        const compensatedEnergyGd = text.match(/Energia compensada GD IkWh\s+(\d+(?:[,.]\d+)?)\s+(\d+(?:[,.]\d+)?)\s+(-?\d+(?:[,.]\d+)?)/);

        if (!compensatedEnergyGd) {
            return null
        }

        return {
            quant: parseInt(
                compensatedEnergyGd[1].replace('.', '')
            ),
            unitedValue: parseFloat(
                compensatedEnergyGd[2].replace(',', '.')
            ),
            value: parseFloat(
                compensatedEnergyGd[3].replace('.', '').replace(',', '.')
            )
        }
    }

    static extractContributionPublicLighting = (text: string): number => {
        const contributionPublicLighting = text.match(/Contrib Ilum Publica Municipal\s*([\d.,]+)/);
        if (contributionPublicLighting) {
            return parseFloat(
                contributionPublicLighting[1].replace('.', '').replace(',', '.')
            )
        }
        return 0
    }

    static getMonthDigitFromLabel = (monthReference: string): number => {
        const monthDigits: MonthDigits = {
            'JAN': 1,
            'FEV': 2,
            'MAR': 3,
            'ABR': 4,
            'MAI': 5,
            'JUN': 6,
            'JUL': 7,
            'AGO': 8,
            'SET': 9,
            'OUT': 10,
            'NOV': 11,
            'DEZ': 12,
        };

        return monthDigits[monthReference]
    }
}
