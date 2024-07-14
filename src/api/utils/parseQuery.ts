const parseQuery = (limit?: string | number, page?: string | number): { offset?: number, limit?: number } => ({
    offset: (limit && page) ? parseInt(limit as string) * parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined
});

export default parseQuery;
