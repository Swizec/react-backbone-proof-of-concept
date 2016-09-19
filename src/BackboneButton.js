
import Backbone from 'backbone';
import Handlebars from 'handlebars';


class BackboneButton extends Backbone.View {
    constructor() {
        super();

        this.model = new Backbone.Model({
            N: 0
        });

        this.events = {
            "click button": "buttonClick"
        }

        this.template = Handlebars.compile('<button>Clicked {{N}} times</button>');
    }

    render() {
        this.$el.html(this.template(this.model.attributes));
    }

    buttonClick() {
        console.log('hai');
    }
}

export default BackboneButton;
