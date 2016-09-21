
import Backbone from 'backbone';
import Handlebars from 'handlebars';


class BackboneButton extends Backbone.View {
    constructor(options) {
        super();

        this.model = new Backbone.Model({
            N: options.N
        });

        this.events = {
            "click button": "buttonClick"
        }

        this.template = Handlebars.compile('<button>Clicked {{N}} times</button>');
        this.listenTo(this.model, 'change', this.render);
    }

    render() {
        this.$el.html(this.template(this.model.attributes));
    }

    buttonClick() {
        const N = this.model.get('N');

        this.model.set({N: N+1});
    }
}

export default BackboneButton;
