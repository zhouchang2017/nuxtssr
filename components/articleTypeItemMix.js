import moment from 'moment'
moment.locale('zh-cn')
const articleTypeItemMix = {
    props : {
        itemData : {
            type : Object ,
            default : () => {
            }
        } ,
    } ,
    data() {
        return {}
    } ,
    filters : {
        timeLL(value) {
            //return moment(value).format('MM-DD h:mm')
            return moment(value).fromNow()
        }
    }
}

export default articleTypeItemMix