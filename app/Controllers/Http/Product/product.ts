import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{
  Route.post('/add-buy-product', 'Product/ProductController.addBuyProduct')
  Route.post('/add-shop-product', 'Product/ProductController.addShopProduct')
  Route.get('/get-buy-product', 'Product/ProductController.getProducts')
  Route.get('/get-buy-product-by-id/:id', 'Product/ProductController.getBuyProductById')
  Route.get('/get-my-buy-product', 'Product/ProductController.getMyBuyProduct')
}).prefix('product').middleware('auth')
