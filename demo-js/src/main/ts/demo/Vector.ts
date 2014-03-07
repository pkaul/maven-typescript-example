class Vector {

    private _x:number;
    private _y:number;

    constructor(x:number,y:number) {
        this._x = x;
        this._y = y;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public static rotate(v:Vector, center:Vector, angle:number):Vector {

        var dx:number = v.x - center.x;
        var dy:number = v.y - center.y;
        return new Vector(
            (dx * Math.cos(angle) - dy * Math.sin(angle)) + center.x,
            (dx * Math.sin(angle) + dy * Math.cos(angle)) + center.y);

    }
}

export = Vector;