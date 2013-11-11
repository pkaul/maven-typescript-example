import SceneRunner = require("../scene/SceneRunner");
import Triangle = require("./Triangle");
import Vector = require("./Vector");

/**
 *  Scene that draws triangles on a canvas
 */
class TrianglesScene extends SceneRunner {

    private _canvas:HTMLCanvasElement;

    private _counter:number = 0;
    private _triangle:Triangle;

    constructor(canvas:HTMLCanvasElement) {
        super();
        this._canvas = canvas;
    }


    public run():void {

        this._counter++;
        var angle:number = this._counter / 100.0;
        this._triangle = TrianglesScene.createTriangle(angle);
    }

    public draw():void {

        // clear canvas
        TrianglesScene.clearCanvas(this._canvas);

        // draw the triange multiple times
        var w:number = 30;
        var h:number = 30;
        var cw:number = this._canvas.width;
        var ch:number = this._canvas.height;

        var context:CanvasRenderingContext2D = this._canvas.getContext("2d");

        for (var x:number=0; x<w; x++) {
            for (var y:number=0; y<h; y++ ) {

                var offsetX:number = x/w * cw;
                var offsetY:number = y/h * ch;

                TrianglesScene.fillTriangle(context,
                    this._triangle.v1.x+offsetX, this._triangle.v1.y+offsetY,
                    this._triangle.v2.x+offsetX, this._triangle.v2.y+offsetY,
                    this._triangle.v3.x+offsetX, this._triangle.v3.y+offsetY,
                    Math.round(x/w * 255), Math.round(y/h * 255), 0);
            }
        }
    }

    // =======

    static createTriangle(angle:number):Triangle {

        var center:Vector = new Vector(25, 25);

        var v1:Vector = Vector.rotate(new Vector(0,  0), center, angle);
        var v2:Vector = Vector.rotate(new Vector(50, 0), center, angle);
        var v3:Vector = Vector.rotate(new Vector(50, 50), center, angle);

        return new Triangle(v1, v2, v3);
    }

    static clearCanvas(canvas:HTMLCanvasElement):void {
        canvas.width = canvas.width;
    }

    static fillTriangle(context:CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number, red:number, green:number, blue:number) {
        context.fillStyle='rgb('+red+','+green+','+blue+')';
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.lineTo(x3,y3);
        context.closePath();
        context.fill();
    }
}

export = TrianglesScene;