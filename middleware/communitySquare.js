export default async function ({isServer,isClient, store, query, params}) {
  if (isClient) {
    await store.dispatch('getCommunitySubListPage', {type: query.article_type})
  }
}
