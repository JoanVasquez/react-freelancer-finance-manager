import TaxService from '@/services/TaxService';
import {createAsyncThunk} from '@reduxjs/toolkit';

const taxService = new TaxService()

export const calculateTaxThunk = createAsyncThunk(
    'tax/calculateTax',
    async ({year, income, expenses}: {year: number; income: number; expenses: number}) => {
        taxService.calculateTax(year, income, expenses)
        return taxService.getAll()
    }
);

