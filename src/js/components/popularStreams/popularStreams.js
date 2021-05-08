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
  props: {
    homepageStreams: {
      default: [],
      type: Array,
      required: true
    },
    addStream: {
      type: Function,
      required: true
    },
  },
  icons: Icons,
}
