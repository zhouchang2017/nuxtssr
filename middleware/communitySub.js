export default async function ({ store, query, params}) {
  if (process.client) {
    console.log('社区子首页中间件数据获取……')
    await store.dispatch('getCommunitySubListPage', {params, query})
  }
}
