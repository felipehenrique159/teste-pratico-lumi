import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Customer from './Customer';

export default class Invoice extends Model {
    declare id: number;
    declare filename: string;
    declare path: string;
    declare instalation_number: string;
    declare month_reference: string;
    declare month_digit_reference: number;
    declare electric_energy_quant: string;
    declare electric_energy_united_value: string;
    declare electric_energy_value: string;
    declare energy_scee_icms_quant: string;
    declare energy_scee_icms_united_value: string;
    declare energy_scee_icms_value: string;
    declare compensated_energy_gd_quant: string;
    declare compensated_energy_gd_united_value: string;
    declare compensated_energy_gd_value: string;
    declare public_lighting_value: string;
    declare id_customer: number;
}

Invoice.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    instalation_number: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    month_reference: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    month_digit_reference: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    electric_energy_quant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    electric_energy_united_value: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    electric_energy_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    energy_scee_icms_quant: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    energy_scee_icms_united_value: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    energy_scee_icms_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    compensated_energy_gd_quant: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    compensated_energy_gd_united_value: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    compensated_energy_gd_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    public_lighting_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: 'invoice',
    timestamps: false
});

Invoice.belongsTo(Customer, {
    foreignKey: 'id_customer',
    targetKey: 'id',
    as: 'customerInvoice'
});
