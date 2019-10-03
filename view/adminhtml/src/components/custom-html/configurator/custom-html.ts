import $ from 'jquery';
import $t from 'mage/translate';

import componentConfigurator from '../../_component-configurator/component-configurator';

/**
 * CustomHtml configurator component.
 * This component is responsible for displaying CustomHtmls configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const customHtmlConfigurator: vuejs.ComponentOption = {
    mixins: [
        componentConfigurator,
    ],
    template: `<form class="cc-custom-html-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cc-input cc-input--type-inline">
            <p class="cc-warning">${$t( 'This component is meant to be used only by developers due to high risk of breaking shop layout.' )}</p>
        </div>
        <div class="cc-input cc-input--type-inline">
            <label for="cfg-title" class="cc-input__label">${$t( 'Title' )}:</label>
            <input type="text" v-model="configuration.title" id="cfg-title" class="cc-input__input" @change="onChange" />
        </div>
        <div class="cc-input cc-input--type-inline">
            <label for="cfg-markup" class="cc-input__label">${$t( 'HTML markup' )}:</label>
            <textarea v-model="configuration.markup" id="cfg-markup" class="cc-input__textarea" @change="onChange"></textarea>
        </div>
    </form>`,
    props: {
        configuration: {
            type: Object,
            default(): any {
                return {
                    title: '',
                    markup: '',
                };
            },
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'component-configurator__save'(): void {
            this.$set('configuration.markup', this.fixMarkup(this.configuration.markup));
            this.onSave();
        },
    },
    methods: {
        /**
         * 1. Replaces all self-closing tags to simple closing mark
         * 2. Replaces special chars for quots (&quot;) to the single quote mark
         * @param markup {string} - original html generated by WYSIWG 
         * @return {string} - string w/o self-closing tags
         */
        fixMarkup(markup: string): string {
            return markup.replace(/\/>/g, '>').replace(/&quot;/g, "'");
        },
    }
};

export default customHtmlConfigurator;
