import { OdooCustomClient } from "./client/odoo";

const odooCustomClient = new OdooCustomClient({
    baseUrl: "http://<domain | ip>",
    port: 1234,
    db: "db-odoo-name",
    username: "odoo-username",
    password: "odoo-user-password",
});

/**
 * @description Example of how to use the searchRecord method
 */
const main = async () => {
    await odooCustomClient.connect();

    const result = await odooCustomClient.searchRecord({
        model: "res.partner",
        filters: { vat: "0951175454" },
        requestedFields: ["name", "email"],
        delimiters: { limit: 2, order: "id desc" },
    });
    console.log("🚀 ~ file: index.ts:18 ~ main ~ result: \n", result);
};

main();
