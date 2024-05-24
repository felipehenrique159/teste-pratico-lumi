export default interface DashInvoice {
    total_value_without_gb: number,
    compensated_energy_gd: number,
    month_reference: string,
    month_digit_reference: number,
}