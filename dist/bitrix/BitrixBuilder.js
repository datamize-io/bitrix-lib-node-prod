export class BitrixBuilder {
    static setInstance(bitrixInstance) {
        this.instance = bitrixInstance;
        return new this(this.instance);
    }
    constructor(bitrixInstance) {
        this.prefixDefault = null;
        this.data = {};
        this.selectFields = [];
        this.filterFields = {};
        this.defaultParams = {};
        this.changedData = {};
        this.instance = bitrixInstance;
        return this;
    }
    setSelectItems(selectByFields) {
        this.selectFields = selectByFields;
        return this;
    }
    setSelectItem(selectByField) {
        this.selectFields.push(selectByField);
        return this;
    }
    setFilterItems(filterByFields) {
        this.filterFields = filterByFields;
        return this;
    }
    setFilterItem(filterByField, valueFromFilter) {
        this.filterFields[filterByField] = valueFromFilter;
        return this;
    }
    setDataItem(field, value) {
        this.data = this.getData() || {};
        this.changedData = this.changedData || {};
        this.data[field] = value;
        this.changedData[field] = value;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    getData() {
        return this.data;
    }
    setId(id) {
        if (!this.data) {
            this.data = {};
        }
        this.data.ID = id;
        return this;
    }
    setDefaultParams() {
        this.instance.setDefaultParams(this.defaultParams);
        return this;
    }
    setField(field, value) {
        console.log("Setting field %s value %s", field, value);
        // Schema
        this.changedData = this.changedData || {};
        this.data = this.data || {};
        this.data.fields = this.data.fields || {};
        this.changedData.fields = this.changedData.fields || {};
        // Data
        this.data.fields[field] = value;
        this.changedData.fields[field] = value;
        return this;
    }
    async get(id, method = null) {
        method = method || this.prefixDefault + ".get";
        return await this.requestAndPatch(method, {
            id: id,
        });
    }
    async requestAndPatch(method, params = {}, resultField = "result") {
        this.setDefaultParams();
        try {
            const result = await this.instance.request(method, params);
            if (result.isSuccess) {
                return this.patch(result.getData(), resultField); // ← retorna o que foi tratado
            }
            else {
                throw Error(result.toString());
            }
        }
        catch (error) {
            throw Error(`${error}`);
        }
    }
    patch(params, field = "result") {
        this.data = field ? params[field] : params;
        return this;
    }
    async insert(params, method = null) {
        this.setDefaultParams();
        params = params || this.data;
        if (!params) {
            throw Error(`Erro ao tentar inserir ${this.constructor.name}, dados não foram passados.`);
        }
        method = method || this.prefixDefault + ".add";
        const request = await this.instance.request(method, params);
        if (request.isSuccess) {
            return (this.data = Object.assign(this.data, request.getData()));
        }
        else {
            console.error(request.toString());
            throw Error("Erro ao tentar inserir " + this.constructor.name + ".");
        }
    }
    async save(params = null, method = null) {
        this.setDefaultParams();
        if (this.data.ID || this.data.id) {
            return await this.update(params, method);
        }
        else {
            return await this.insert(params, method);
        }
    }
    async update(params = null, method = null) {
        this.setDefaultParams();
        params = params || this.changedData;
        if (!params) {
            throw Error(`Erro ao tentar inserir ${this.constructor.name}, dados não foram passados.`);
        }
        if (!params.ID && !params.id) {
            if (this.data.id || this.data.ID) {
                params.ID = params.id = this.data.id || this.data.ID;
            }
            else {
                throw Error(`Erro ao tentar atualizar ${this.constructor.name}, ID não foi passado.`);
            }
        }
        if (!params.fields) {
            throw Error(`Erro ao tentar atualizar ${this.constructor.name}, campos não foram passados. ${JSON.stringify(params)}${JSON.stringify(this.data)}`);
        }
        method = method || this.prefixDefault + ".update";
        return this.instance.request(method, params);
    }
    async collect(params = null, method = null, collectField = "result") {
        this.setDefaultParams();
        method = method || this.prefixDefault + ".list";
        params = params || {};
        params.filter = params.filter || this.filterFields;
        params.select = params.select || this.selectFields;
        const result = await this.instance.request(method, params);
        if (result.isSuccess) {
            const instanceClass = Object.getPrototypeOf(this).constructor;
            const instance = this.instance;
            let data = result.getData();
            if (collectField) {
                if (collectField.includes(".")) {
                    const collectFields = collectField.split(".");
                    collectFields.forEach((field) => {
                        if (data[field]) {
                            data = data[field];
                        }
                        else {
                            throw Error(`Campo ${collectField} não encontrado no resultado.`);
                        }
                    });
                }
                else {
                    data = data[collectField];
                }
            }
            if (!Array.isArray(data)) {
                data = this.data ? [data] : [];
            }
            this.data = data.map((collectItem) => {
                const newEntity = new instanceClass(instance);
                return newEntity.patch(collectItem, null);
            });
            return this;
        }
        else {
            throw Error(result.toString());
        }
    }
    async delete(id) {
        this.setDefaultParams();
        if (!id) {
            if (!this.data?.ID || !this.data?.id) {
                throw Error(`Erro ao tentar deletar ${this.constructor.name}, ID não foi passado.`);
            }
        }
        return;
    }
}
