interface OdooInterface {
    connect: Function;
    create: Function;
    search: Function;
    searchRead: Function;
    update: Function;
    delete: Function;
}

interface OdooConnectionParams {
    baseUrl: string;
    port: number;
    db: string;
    username: string;
    password: string;
}

interface SearchOdooInput {
    model: string;
    filters?: unknown;
    requestedFields?: string[];
    delimiters?: unknown;
}

interface DetailedSearchOdooOutput {
    id: number;
    [key: string]: unknown;
}
