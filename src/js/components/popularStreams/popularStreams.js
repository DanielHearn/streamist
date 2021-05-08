import IconButton from './../inputs/buttons/iconButton/IconButton.vue'
import ListItem from './../list/listItem/ListItem.vue'
import List from './../list/list/List.vue'
import Icons from '../../icons/icons'

export default {
    name: 'popular-streams',
    components: {
        List,
        ListItem,
        IconButton,
    },
    icons: Icons,
    methods: {
        addPopularStream: function (stream) {
            const name = stream.clean_username ? stream.clean_username.toLowerCase() : stream.user_name.toLowerCase()
            this.$store.commit('addStreamFromName', name)
        },
    }
}
