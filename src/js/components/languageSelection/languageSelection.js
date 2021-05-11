import Languages from '../../languages/languages'
import vSelect from 'vue-select'
import { mapState } from 'vuex';
import Icons from './../../icons'

export default {
    name: 'language-selection',
    components: {
        vSelect
    },
    computed: mapState({
        languages: state => state.options.popularStreamLanguages,
        unusedLanguages: state => Languages.filter(
            language => {
                return !state.options.popularStreamLanguages.some(chosenLanguage => chosenLanguage.value === language.value)}

        )
    }),
    data: () => ({
        Deselect: {
        render: createElement => createElement('i', {class: 'material-icons'}, Icons.close),
        },
    }),
    methods: {
        changeLanguages: function (languages) {
            const options = this.$store.state.options
            options.popularStreamLanguages = languages
            this.$store.commit('setOptions', options)
        }
    }
}
