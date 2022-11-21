const app = new Vue({
  el: '#app',
  data: () => {
    return {
      page: 'products',
      cart: [],
      search: '',
      sortBy: 'subject',
      sortDirection: 'asc',
      products: products,
      checkout: [],
      order: {
        name: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        method: 'Home',
        gift: false,
      },
      states: {
        AUH: 'Abu Dhabi',
        AJM: 'Ajman',
        DXB: 'Dubai',
        FUJ: 'Fujairah',
        RAK: 'Ras Al Khaimah',
        SHJ: 'Sharjah',
        UMM: 'Umm Al Quwain',
      },
    };

  },

  methods: {
    addToCart(product) {
      this.$emit("addItemToCart", product);
      console.log(product.id);
      if (!this.cart.includes(product)) {
        this.cart.push(product);
      }
      else
        console.log("Product exists in cart");
      product.cartquantity++;


      Swal.fire(
        'Added to Cart!',
        (product.subject + ' has been added to your cart!'),
        'success'
      )
      this.products.forEach((item) => {
        if (item.id === product.id) {
          item.quantity -= 1;
        }
      }
      )
    },


    removeFromCart(product) {
      console.log("Removed product  " + product.id);
      if (product.cartquantity === 1) {
        this.cart.splice(product, 1);
        product.cartquantity = 0;
      }
      else {
        product.cartquantity--;
        console.log("cartquantity: " + product.cartquantity);
      }
      Swal.fire(
        'Removed from Cart!',
        (product.subject + ' has been removed from your cart!'),
        'warning'
      )
      this.products.forEach((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
        }
      }
      )
    },

    navigateTo(page) {
      this.page = page;
      console.log(this.page);
    },

    quantityCount(product) {
      if (product.quantity > 0) {
        return true;
      } else {
        return false;
      }
    },

    onSubmitCheckout: function () {
      if (this.order.name && this.order.phone && this.order.address && this.order.city && this.order.zip && this.order.state) {
        this.checkout.push(this.order);
        this.order = {
          name: '',
          phone: '',
          address: '',
          city: '',
          zip: '',
          state: '',
          method: 'Home',
          gift: false,
        };
        alert("Order submitted");
        this.cart = [];
        this.navigateTo('products');
      } else {
        alert("Please fill all the text boxes");
        this.page = 'checkout';
      }
      
    },

    checkoutCart() {
      if (this.cart.length > 0) {
        this.page = "checkout";
      } else {
        Swal.fire(
          'Empty Cart?',
          'Add something from the store first!',
          'question'
        )
      }
    },
  },
  computed: {
    filteredProducts() {
      if (this.search) {
        return this.products.filter((product) => {
          return product.subject.toLowerCase().includes(this.search.toLowerCase());

        })
      }

      else if (this.sortBy === 'subject') {
        return this.products.sort((a, b) => {
          if (this.sortDirection === 'asc') {
            return a.subject.localeCompare(b.subject);
          } else if (this.sortDirection === 'desc') {
            return b.subject.localeCompare(a.subject);
          }
        })
      }
      else if (this.sortBy === 'price') {
        return this.products.sort((a, b) => {
          if (this.sortDirection === 'asc') {
            return a.price - b.price;
          } else if (this.sortDirection === 'desc') {
            return b.price - a.price;
          }
        });
      }
      else if (this.sortBy === 'quantity') {
        return this.products.sort((a, b) => {
          if (this.sortDirection === 'asc') {
            return a.quantity - b.quantity;
          } else if (this.sortDirection === 'desc') {
            return b.quantity - a.quantity;
          }
        });
      }
      else {
        return this.products;
      }
    },

    cartTotal() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.price * item.cartquantity;
      });
      console.log(total);
      return total;
    },

    cartCount() {
      let count = 0;
      this.cart.forEach((item) => {
        count += item.cartquantity;
      });
      console.log(count);
      return count;
    },
  },



});

