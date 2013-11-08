/// <reference path="./lib/jasmine.d.ts"/>
/// <reference path="../../main/ts/demo.ts"/>


/**
 * Tests {@link demo.TrianglesScene}
 */
describe("TrianglesScene", function():void {

    /**
     * Tests {@link examplelib.demo.TrianglesScene#createTriangle}
     */
    it("createTriangle", function():void {

        var triangle:examplelib.demo.Triangle = examplelib.demo.TrianglesScene.createTriangle(0);
        expect(triangle.v1.x).toBe(0);
        expect(triangle.v1.y).toBe(0);
        expect(triangle.v2.x).toBe(50);
        expect(triangle.v2.y).toBe(0);
        expect(triangle.v3.x).toBe(50);
        expect(triangle.v3.y).toBe(50);
    })
});

