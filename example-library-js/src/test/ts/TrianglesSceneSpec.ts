/// <reference path="./lib/jasmine.d.ts"/>

import demo = require("../../main/ts/demo");

/**
 * Tests {@link TrianglesScene}
 */
describe("TrianglesScene", function():void {

    /**
     * Tests {@link TrianglesScene#createTriangle}
     */
    it("createTriangle", function():void {

        var triangle:demo.Triangle = demo.TrianglesScene.createTriangle(0);
        expect(triangle.v1.x).toBe(0);
        expect(triangle.v1.y).toBe(0);
        expect(triangle.v2.x).toBe(50);
        expect(triangle.v2.y).toBe(0);
        expect(triangle.v3.x).toBe(50);
        expect(triangle.v3.y).toBe(50);
    })
});

