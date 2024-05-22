import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../config/database'

export default class Customer extends Model {
    declare id: number
    declare customerNumber: string
}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customerNumber: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    }
},{
    sequelize: sequelize,
    tableName: 'customer',
    timestamps: false
})