export default {
    namespaced: true,
    state: {
        productList: []
    },
    getters: {
    },
    mutations: {
        setProducts(state:any, products: Array<Record<string, unknown>>):void{
            state.productList = [...products]
        }
    },
    
  }