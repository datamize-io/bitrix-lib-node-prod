import { ItemBuilder } from "./ItemBuilder.builder.js";
export class ContactBuilder extends ItemBuilder {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 2,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
    setFmField(typeId, valueType, value, id) {
        this.data.fm = this.data.fm || {};
        const sortNumber = Object.keys(this.data.fm).length;
        this.data.fm[sortNumber] = { id, value, valueType, typeId };
        return this;
    }
    setEmail(value, type) {
        this.setFmField("EMAIL", type, value);
        return this;
    }
    setPhone(value, type) {
        this.setFmField("PHONE", type, value);
        return this;
    }
    setName(value) {
        this.setField("name", value);
        return this;
    }
    setLastName(value) {
        this.setField("lastName", value);
        return this;
    }
    setUser(value) {
        const userId = typeof value === "object" ? value.getData().ID : value;
        this.setField("assignedById", userId);
        return this;
    }
}
