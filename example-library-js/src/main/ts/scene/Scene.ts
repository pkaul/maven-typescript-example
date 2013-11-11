/**
 * A scene
 */
interface Scene {

    /**
     * Executes the scene's logic
     */
    run():void;


    /**
     * Draws the scene
     */
    draw():void;
}

export = Scene;