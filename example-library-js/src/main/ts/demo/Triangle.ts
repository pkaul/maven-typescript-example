import Vector = require("./Vector");

class Triangle {

    private _v1:Vector;
    private _v2:Vector;
    private _v3:Vector;

    constructor(v1:Vector, v2:Vector, v3:Vector) {
        this._v1 = v1;
        this._v2 = v2;
        this._v3 = v3;
    }

    public get v1() {
        return this._v1;
    }

    public get v2() {
        return this._v2;
    }

    public get v3() {
        return this._v3;
    }
}

export = Triangle;