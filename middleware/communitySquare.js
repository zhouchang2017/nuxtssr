export default async function ({store, query, params}) {
  if (process.client) {
    console.log('社区广场中间件数据获取……')
    let _with = {'with': ['tags']}
    await store.dispatch('getCommunitySubListPage', {params, query, is_choice: null, _with})
  }
}
