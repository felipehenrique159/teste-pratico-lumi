import { describe, expect, test, jest } from '@jest/globals';
import fs from 'fs';
import PdfService from '../../src/services/PdfService'
import { Request, Response } from 'express';

const text = fs.readFileSync('./tests/services/extractTextForTest/pdfExtract.txt', 'utf-8');

describe('extractRelevantData', () => {
  test('should extract the customer number correctly', () => {
    const result = PdfService.extractCustomerNumber(text);
    expect(result).toBe('7005400387');
  });

  test('should extract the instalation number correctly', () => {
    const result = PdfService.extractInstalationNumber(text);
    expect(result).toBe("3000055479");
  });

  test('should extract the month reference correctly', () => {
    const result = PdfService.extractMonthReference(text);
    expect(result).toBe('SET/2023');
  });

  test('should extract the month digit reference correctly', () => {
    const result = PdfService.extractMonthDigitReference(text);
    expect(result).toBe(9);
  });

  test('should extract the eletric energy correctly', () => {
    const result = PdfService.extractElectricEnergy(text);
    expect(result).toStrictEqual({ "quant": 50, "unitedValue": 0.95603119, "value": 47.78 });
  });

  test('should extract the Energy Scee icms correctly', () => {
    const result = PdfService.extractEnergySceeIcms(text);
    expect(result).toStrictEqual({ "quant": 414, "unitedValue": 0.51002616, "value": 211.13 });
  });

  test('should extract the compesed energy gd correctly', () => {
    const result = PdfService.extractCompensatedEnergyGd(text);
    expect(result).toStrictEqual({ "quant": 414, "unitedValue": 0.48733, "value": -201.75 });
  });

  test('should extract the public lighting correctly', () => {
    const result = PdfService.extractContributionPublicLighting(text);
    expect(result).toBe(49.43);
  });

  test('should extract the public lighting not found correctly', () => {
    const text = "string teste";
    const result = PdfService.extractContributionPublicLighting(text);
    expect(result).toBe(0);
  });

  test('should extract the extractRelevantData  correctly', () => {
    const result = PdfService.extractRelevantData(text, 'teste');
    expect(result).toStrictEqual({
      "compensatedEnergyGd": { "quant": 414, "unitedValue": 0.48733, "value": -201.75 },
      "customerNumber": "7005400387",
      "electricEnergy": { "quant": 50, "unitedValue": 0.95603119, "value": 47.78 },
      "energySceeIcms": { "quant": 414, "unitedValue": 0.51002616, "value": 211.13 },
      "filename": "teste",
      "instalationNumber": "3000055479",
      "monthDigitReference": 9,
      "monthReference": "SET/2023",
      "publicLighting": 49.43
    }
    );
  });

  test('should return null for text that does not match pattern', () => {
    const text = "string test";

    const resultEletricEnergy = PdfService.extractElectricEnergy(text);
    expect(resultEletricEnergy).toBeNull();

    const resultEnergySceeIcms = PdfService.extractEnergySceeIcms(text);
    expect(resultEnergySceeIcms).toBeNull();

    const resultCompensatedEnergyGd = PdfService.extractCompensatedEnergyGd(text);
    expect(resultCompensatedEnergyGd).toBeNull();
  });

  test('should return 404 if file does not exist', async () => {
    const req = {
      query: {}
    } as Partial<Request> as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as Partial<Response> as Response;

    await PdfService.downloadPdf(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('File path is required');
  });
});
