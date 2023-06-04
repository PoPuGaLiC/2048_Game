export class CountLabel extends cc.LabelTTF {
    constructor(label, fontName, fontSize, size) {
        super(label, fontName, fontSize);
        this.x = size.width / 2 - 25;
        this.y = size.height - (68 / 2 + 22 + 11);
        this.setFontFillColor(0, 0, 0);
    };
};