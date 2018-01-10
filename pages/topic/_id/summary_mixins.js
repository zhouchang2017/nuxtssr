import axios from 'axios'
import api from '~/util/api.config'

const SummaryMixins = {
  async asyncData ({params, query}) {
    let url = query.hasOwnProperty('filter') ?
      `${api.community.getSummary(params.id,params.summary)}&article_type=${query.filter}` :
      `${api.community.getSummary(params.id,params.summary)}`
    let {data} = await axios.get(url)
    console.log(data)
    return {initData: data, title: `棒客-${data.body.community_info.name}-${data.body.type.cn_name}`}
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  }
}
export default SummaryMixins
