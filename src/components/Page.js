import React from 'react';
import ProductsContainer from './ProductsContainer';
import Cart from './Cart.js'

const Url = 'http://localhost:3000/products'

class Page extends React.Component {

  state = {
    products: [],
    selectedProducts:[],
    departmentName: "All Products",
    cart:[]
  }

  componentDidMount () {
    if(this.props.cartView) {
      let cartItems = JSON.parse(localStorage.cartItems);
      this.setState({
        cart: cartItems,
        products: cartItems,
        selectedProducts: cartItems.slice(0,20),
        departmentName: "Cart",
        cartView: this.props.cartView
      });
    } else {
    fetch(Url)
      .then(r => r.json())
      .then(products =>
        this.setState({
          products,
          selectedProducts: products.slice(0,20)
        }))
      }
  }

  handleDeptClick = (dept) => {
    let selectedDeptProducts = this.state.products.filter(product => {
      return (product.department === dept.split(' ').join(''))
    })
    this.setState({
      selectedProducts: selectedDeptProducts,
      departmentName: dept
    })
  }

  handleSelectedCartClick = (cardItem) =>{
    console.log(cardItem);
  }


  render() {
    return (
      <div className="Page">
        <ProductsContainer
          deptName={this.state.departmentName}
          products={this.state.products}
          selectedProducts={this.state.selectedProducts}
          handleDepmtClick={this.handleDeptClick}
          handleCartClick={this.handleSelectedCartClick}
        />
        <Cart />
      </div>
    );
  }
}

export default Page;
