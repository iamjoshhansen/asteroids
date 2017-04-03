var GamePad = (function () {
    function GamePad(index) {
        this.index = index;
        // buttons
        this.a = false;
        this.b = false;
        this.x = false;
        this.y = false;
        this.bumper_left = false;
        this.bumper_right = false;
        this.stick_left = false;
        this.stick_right = false;
        this.start = false;
        this.select = false;
        this.home = false;
        this.dp_up = false;
        this.dp_down = false;
        this.dp_left = false;
        this.dp_right = false;
        // axes
        this.left_x = 0;
        this.left_y = 0;
        this.left_trigger = 0;
        this.right_x = 0;
        this.right_y = 0;
        this.right_trigger = 0;
    }
    GamePad.prototype.ping = function () {
        var gp = navigator.getGamepads()[this.index];
        if (gp) {
            var i = 0;
            // buttons
            this.a = gp.buttons[i++].pressed;
            this.b = gp.buttons[i++].pressed;
            this.x = gp.buttons[i++].pressed;
            this.y = gp.buttons[i++].pressed;
            this.bumper_left = gp.buttons[i++].pressed;
            this.bumper_right = gp.buttons[i++].pressed;
            this.left_trigger = gp.buttons[i++].value;
            this.right_trigger = gp.buttons[i++].value;
            this.select = gp.buttons[i++].pressed;
            this.start = gp.buttons[i++].pressed;
            this.stick_left = gp.buttons[i++].pressed;
            this.stick_right = gp.buttons[i++].pressed;
            this.dp_up = gp.buttons[i++].pressed;
            this.dp_down = gp.buttons[i++].pressed;
            this.dp_left = gp.buttons[i++].pressed;
            this.dp_right = gp.buttons[i++].pressed;
            this.home = gp.buttons[i++].pressed;
            i = 0;
            // axes
            this.left_x = gp.axes[i++];
            this.left_y = gp.axes[i++];
            this.right_x = gp.axes[i++];
            this.right_y = gp.axes[i++];
        }
        return !!gp;
    };
    return GamePad;
}());
//# sourceMappingURL=gamepad.js.map