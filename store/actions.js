const actions = {
  increment ({commit}) {
    commit('increment')
  },
  nuxtServerInit (store, {params, route, req}) {
    console.log('nuxtServerInit')
  }
}

export default actions
