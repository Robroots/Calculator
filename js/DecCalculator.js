import {
    Calculator
} from "./Calculator";


class DecCalculator extends Calculator {
    constructor(settings) {
        super(settings);
        console.log(this.getName());
    }
    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = numberX.length - 1; i >= 0; i--) {
            let carryBit = numberX[i] + numberY[i] + result[i];
            let modulo = Math.floor(carryBit % 10);
            if(carryBit < 10){
                result[i] = carryBit;
            }else {
                result[i] = modulo;
                result[i-1] += 1;
            }
        }
        return result;
    }
    blurChangeNumber(root) {
        if (!root.text() || root.text() === this.prevValue) {
            root.text(this.prevValue);
        }
        this.updateResult();
    }
    changeNumber(root) {
        root.attr('contenteditable', true);
        this.prevValue = root.text();
        root.text('');
        root.trigger('focus');
        root.on('keydown', e => {
            if (root.text().length > 0) {
                root.blur();
            }
            if (e.which > 57 || e.which < 48) {
                Swal.fire({
                    type: 'error',
                    title: 'Wrong number',
                    text: 'Enter number from 0 to 9',
                })
                root.attr('contenteditable', false);
            }
        })
        root.on('keyup', e => root.attr('contenteditable', false));
    }
    updateResult() {
        let root = this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").find(".result-bit span");
        $($($resultNumber).get().reverse()).each((i, item) => {
            let jItem = $(item);
            jItem.parent().stop()
            if (parseInt(jItem.text()) !== this.resultNumberArray[i]) {
                jItem.parent().slideUp('', () => {
                    jItem.text(this.resultNumberArray[i])
                });
                jItem.parent().slideDown();
            }
        });
    }
    initEvents() {
        this.$calculatorDOMElement.find(".display-number > span").on("click", (e) => {
            this.changeNumber($(e.target));
        })

        this.$calculatorDOMElement.find(".display-number > span").on("blur", (e) => {
            this.blurChangeNumber($(e.target))
            this.checkNumber();
            this.updateResult();
        })
    }
}

export {
    DecCalculator
};