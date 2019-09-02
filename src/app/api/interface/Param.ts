export class Param {
    key: string;
    value: any;
    description?: string;

    constructor(key?, value?, description?) {
        this.key = key ? key : '';
        this.value = value ? value : '';
        this.description = description ? description : '';

    }

}
