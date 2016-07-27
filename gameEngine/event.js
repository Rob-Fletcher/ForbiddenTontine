// All logic to handle events should go here.

class event{
    constructor(eType, eTime, eTarget, eSource, eImage='../public/images/defaultEvent.png'){
        this.etype = eType;
        this.eTime = eTime;
        this.eTarget = eTarget;
        this.eSource = eSource;
        this.eImage = eImage;
    }
}
