import Scene = require("./Scene");

/**
 * A scene base implementation that contains execution logic
 */
class SceneRunner implements Scene {

    private _running:boolean = false;


    public start():void {
        this._running = true;
        this.frame();
    }

    public stop():void {
        this._running = false;
        this.triggerNextFrame();
    }

    /**
     * Needs to be overridden by concrete implementation
     */
    public run():void {}

    /**
     * Needs to be overridden by concrete implementation
     */
    public draw():void {}


    // =======

    /**
     * Runs a scene's frame
     */
    private frame():void {

        if( !this._running ) {
            return;
        }

        // run the scene
        this.run();
        // draw the scene
        this.draw();
        this.triggerNextFrame();

    }

    private triggerNextFrame():void {
        window.requestAnimationFrame(() => this.frame());
    }
}

export = SceneRunner;