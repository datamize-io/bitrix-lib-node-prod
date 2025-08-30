export class UrlHelper {
    static jsonToUrl(obj, prefix = "") {
        const query = [];
        for (const key in obj) {
            const value = obj[key];
            const k = prefix ? `${prefix}[${key}]` : key;
            if (Array.isArray(value)) {
                value.forEach((v) => query.push(`${k}[]=${encodeURIComponent(v)}`));
            }
            else if (typeof value === "object" && value !== null) {
                query.push(this.jsonToUrl(value, k));
            }
            else {
                query.push(`${k}=${encodeURIComponent(value)}`);
            }
        }
        return query.join("&");
    }
}
