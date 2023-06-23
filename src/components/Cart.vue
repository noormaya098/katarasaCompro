<template>
    <div>
      <navigation :color="color" :flat="flat" />
      <v-container>
        <div class="font-katarasa">
          <v-row>
            <v-col cols="6">
              <h3>
                Keranjang Belanjaku
              </h3>
            </v-col>
            <v-col cols="6">
              <div style="text-align: end;">
                <v-btn style="text-transform: none;" class="font-katarasa">
                  <v-icon>
                    mdi-arrow-left
                  </v-icon> kembali belanja
                </v-btn>
              </div>
            </v-col>
          </v-row>
  
          <!-- Data Table -->
          <v-card class="mt-5" style="border-radius: 20px;">
            <v-card-title >
              <v-checkbox v-model="selectAll"></v-checkbox>
              <v-icon left>mdi-home</v-icon> Katarasa Coffee & Tea
            </v-card-title>
            {{ produkItems }}
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="produkItems"
                :item-key="itemKey"
                hide-default-footer
             
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      <v-checkbox v-model="item.selected"
                      class="custom-checkbox"
                      color="red"
                      ></v-checkbox>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.variantId }}</td>
                    <td>{{ item.priceCurrencyFormat }}</td>
                    <td>
                      <div class="spindotts" style="margin: 0px;">
                        <v-btn @click="decrementKuantitas(item)" icon>
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        {{ item.kuantitas }}
                        <v-btn @click="incrementKuantitas(item)" icon>
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </td>
                    <td>{{ item.subTotal }}</td>
                    <td>
                      <v-btn icon color="red" @click="deleteItem(item)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
  
          <!-- Total Price Card -->
          <v-card class="mt-5" style="border-radius: 20px;">
            <v-card-title class="text-h5" style="color: #1D1851;">
              Total Harga
            </v-card-title>
            <v-card-text>
              <v-row >
                <v-col cols="6">
                  <h4 style="color: #A56C16;">{{ calculateTotalPrice() }}</h4>
                </v-col>
                <v-col cols="auto" class="justify-end">
                  <v-btn color="primary" @click="checkout">Checkout</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          </div>
      </v-container>
      
      <foote />
      </div>
      
    
  </template>
  
  <script>
  import navigation from "../components/NavigationLain.vue";
  import foote from "../components/Footer";
  
  export default {
    components: {
      navigation,
      foote,
    },
    data() {
      return {
        headers: [
          { text: '', value: 'selected', sortable: false },
          { text: 'Produk', value: 'produk' },
          { text: 'Variant', value: 'variant' },
          { text: 'Harga', value: 'harga' },
          { text: 'Kuantitas', value: 'kuantitas' },
          { text: 'Sub Total', value: 'subTotal' },
          { text: '', value: 'actions', sortable: false },
        ],
        produkItems: [],
        itemKey: 'produk',
        selectAll: false,
      };
    },
    mounted() {
      this.getCart();
    },
    methods: {

      getCart() {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("http://103.236.151.120:2026/cart/data-cart?page=1&limit=5&is_gift=0", requestOptions)
              .then(response => response.json())
              .then(result =>{ 
                console.log("respons user", result); 
                this.produkItems = result.data.items[0].products
            })
            .catch(error => console.log('error', error));
        },

      incrementKuantitas(item) {
        item.kuantitas++;
        item.subTotal = item.harga * item.kuantitas;
      },
      decrementKuantitas(item) {
        if (item.kuantitas > 1) {
          item.kuantitas--;
          item.subTotal = item.harga * item.kuantitas;
        }
      },
      deleteItem(item) {
        const index = this.produkItems.indexOf(item);
        if (index !== -1) {
          this.produkItems.splice(index, 1);
        }
      },
      calculateTotalPrice() {
      let totalPrice = 0;
      this.produkItems.forEach(item => {
        if (item.selected) { // Hitung hanya jika item terpilih
          totalPrice += item.subTotal;
        }
      });
      return totalPrice;
    },
    checkout() {
      // Perform checkout logic here
    },

    

    // getDataCart (){

    //   const token = localStorage.getItem('token');
    //   var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer "+token);

    //   var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    //   };

    //   fetch("http://103.236.151.120:2026/cart/data-cart?page=1&limit=5&is_gift=", requestOptions)
    //     .then(response => response.json())
    //     .then(result => this.produkItems = result.data)
    //     .catch(error => console.log('error', error));
    // }


  },
    watch: {
        selectAll(value) {
      this.produkItems.forEach(item => {
        item.selected = value;
      });
      this.calculateTotalPrice(); // Hitung total harga saat pilihan 'selectAll' diubah
    },
  },

 
  };
  </script>
  
  <style scoped>
  

  .spindotts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    margin: auto;
  }

  .custom-checkbox input[type="checkbox"] {
    background-color: #ff0000; /* Ganti dengan warna latar belakang yang diinginkan */
  }
  </style>
  