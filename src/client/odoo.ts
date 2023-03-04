import Odoo from "odoo-await";

export class OdooCustomClient {
    private odoo: OdooInterface;
    constructor(odooConnectionParams: OdooConnectionParams) {
        this.odoo = new Odoo(odooConnectionParams);
    }

    connect = async () => await this.odoo.connect();

    private async simpleSearch(
        model: string,
        filters: unknown,
        delimiters: unknown
    ): Promise<number[] | Error> {
        try {
            return await this.odoo.search(model, filters, delimiters);
        } catch (error: unknown) {
            throw error;
        }
    }

    private async detailedSearch(
        model: string,
        attributes: unknown,
        requestedFields: string[],
        delimiters: unknown
    ): Promise<DetailedSearchOdooOutput[] | Error> {
        try {
            const result = await this.odoo.searchRead(
                model,
                attributes,
                requestedFields,
                delimiters
            );
            return result;
        } catch (error: unknown) {
            throw error;
        }
    }

    async createRecord(model: string, attributes: unknown) {
        try {
            const newId = await this.odoo.create(model, attributes);
            return newId;
        } catch (error) {
            throw error;
        }
    }

    async searchRecord(searchInput: SearchOdooInput) {
        const { model, filters, requestedFields, delimiters } = searchInput;

        const defaultFields = ["id"];

        if (requestedFields === undefined)
            return this.simpleSearch(model, filters ?? [], delimiters);
        else
            return this.detailedSearch(
                model,
                filters ?? [],
                [...defaultFields, ...requestedFields],
                delimiters
            );
    }

    async updateRecord(model: string, id: number[], attributes: unknown) {
        try {
            const result = await this.odoo.update(model, id, attributes);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
