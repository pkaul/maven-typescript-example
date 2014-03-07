/// <reference path="../../jasmine.d.ts"/>

import Triangle = require("../../main/ts/demo/Triangle");
import TrianglesScene = require("../../main/ts/demo/TrianglesScene");

/**
 * Tests {@link TrianglesScene}
 */
describe("TrianglesScene", function():void {

    /**
     * Tests {@link TrianglesScene#createTriangle}
     */
    it("createTriangle", function():void {

        var triangle:Triangle = TrianglesScene.createTriangle(0);
        expect(triangle.v1.x).toBe(0);
        expect(triangle.v1.y).toBe(0);
        expect(triangle.v2.x).toBe(50);
        expect(triangle.v2.y).toBe(0);
        expect(triangle.v3.x).toBe(50);
        expect(triangle.v3.y).toBe(50);
    })
});

