import Languages from '../../languages/languages'
import vSelect from 'vue-select'
import { mapState } from 'vuex';

export default {
    name: 'language-selection',
    components: {
        vSelect
    },
    availableLanguages: Languages,
    computed: mapState({
        languages: state => state.options.popularStreamLanguages
    }),
    methods: {
        changeLanguages: function (languages) {
            const options = this.$store.state.options
            options.popularStreamLanguages = languages
            this.$store.commit('setOptions', options)
        }
    }
}
