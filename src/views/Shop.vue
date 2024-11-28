<template>
  <div class="container">
    <!-- Existing shop header and add new item button -->
    <div>
      <v-row class="mx-auto mt-2">
        <h1>Workshop 3</h1>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          icon
          outlined
          color="secondary my-3 ml-2"
          @click="showCart()"
        >
          <v-badge
            :content="cart.length"
            :value="cart.length > 0"
            color="red"
            overlap
          >
            <span
              v-if="animationVisible"
              :style="animationStyle"
              class="cart-animation"
            >
              +1
            </span>
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </v-row>
    </div>
    <div class="mt-3">
      <v-row class="mx-auto">
        <v-btn color="success my-3" @click="newItem()"
          ><v-icon>mdi-plus</v-icon>เพิ่มสินค้าใหม่</v-btn
        >
        <v-spacer></v-spacer>
      </v-row>
    </div>

    <!-- Product Grid -->
    <v-row>
      <v-col cols="md-3 xl-2" v-for="(item, index) in apidata" :key="index">
        <div>
          <v-card width="400px" class="productCard">
            <v-img
              height="200px"
              :src="getProductImageUrl(item.productImage)"
            ></v-img>
            <v-divider style="background-color: black"></v-divider>
            <v-card-title primary-title>
              {{ item.productName }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.productDetail }}
            </v-card-subtitle>
            <v-card-text>
              ราคา :
              <span class="red--text">{{ formatPrice(item.price) }}</span>
              บาท<br />
              จำนวนคงเหลือ : <span class="red--text">{{ item.amount }}</span>
            </v-card-text>
            <v-card-actions class="justify-space-between">
              <div>
                <v-btn color="info" @click="addToCart(item, $event)">
                  <v-icon>mdi-cart-arrow-up</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn color="warning" class="mr-1" @click="editItem(item)"
                  ><v-icon>mdi-file-edit-outline</v-icon></v-btn
                >
                <v-btn color="error" @click="deleteItem(item)"
                  ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Existing Product Edit Dialog -->
    <v-dialog v-model="dialogedit" max-width="500px">
      <v-card class="editCard">
        <v-card-title primary-title>
          {{ savemode }}
        </v-card-title>
        <v-divider style="background-color: black" class="my-3"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-file-input
                label="เลือกรูปสินค้า"
                prepend-icon="mdi-camera"
                @change="onFileSelected"
              ></v-file-input>
            </v-col>
            <v-col cols="12" v-if="imagePreview">
              <v-img :src="imagePreview" max-height="200" contain></v-img>
            </v-col>
            <v-col cols="12">
              <v-text-field
                name="productName"
                label="ชื่อสินค้า"
                id="productName"
                v-model="postdata.productName"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                name="productDetail"
                label="รายละเอียดสินค้า"
                id="productDetail"
                v-model="postdata.productDetail"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                label="ราคา"
                id="price"
                v-model="postdata.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="amount"
                label="จำนวน"
                id="amount"
                v-model="postdata.amount"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeItem()">ยกเลิก</v-btn>
          <v-btn
            color="success"
            text
            @click="saveSelect()"
            :disabled="isSaveButtonDisabled"
            >บันทึก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Shopping Cart Dialog -->
    <v-dialog v-model="cartDialog" max-width="600px">
      <v-card class="pb-2">
        <v-card-title>
          ตะกร้าสินค้า
          <v-spacer></v-spacer>
          <v-btn icon @click="cartDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list v-if="cart.length > 0">
            <v-list-item v-for="(item, index) in cart" :key="index">
              <v-list-item-avatar>
                <v-img :src="getProductImageUrl(item.productImage)"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.productName }}</v-list-item-title>
                <v-list-item-subtitle>
                  ราคา: {{ formatPrice(item.price) }} บาท
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row no-gutters align="center">
                  <v-btn icon small @click="decreaseQuantity(index)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn icon small @click="increaseQuantity(index)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon small class="ml-2" @click="removeFromCart(index)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-alert v-else type="error"> ไม่มีสินค้าในตะกร้า!! </v-alert>

          <v-divider class="my-3" v-if="cart.length > 0"></v-divider>

          <div v-if="cart.length > 0" class="text-right">
            <h3>ยอดรวม: {{ formatPrice(calculateTotal()) }} บาท</h3>
          </div>
        </v-card-text>
        <v-card-actions class="" v-if="cart.length > 0">
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="clearCart()">ล้างตะกร้า</v-btn>
          <v-btn color="success" @click="confirmOrder()"
            >ยืนยันการสั่งซื้อ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      cart: [],
      cartDialog: false,
      id: "",
      postdata: {
        productName: "",
        productDetail: "",
        price: "",
        amount: "",
      },
      postdefault: {
        productName: "",
        productDetail: "",
        price: "",
        amount: "",
      },
      dialogedit: false,
      selectedFile: null,
      imagePreview: null,
      animationVisible: false, // สถานะแอนิเมชัน
      animationStyle: {}, // สไตล์ของแอนิเมชัน
    };
  },
  computed: {
    isSaveButtonDisabled() {
      return (
        !this.postdata.productName ||
        !this.postdata.price ||
        !this.postdata.amount
      );
    },
    savemode() {
      return this.id === "" ? "เพิ่มสินค้าใหม่" : "แก้ไขข้อมูลสินค้า";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    resetImageData() {
      this.selectedFile = null;
      this.imagePreview = null;
    },
    newItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = true;
    },
    editItem(item) {
      this.id = item._id;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = false;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutdata();
      } else this.savePostdata();
    },
    getData() {
      this.axios.get("http://localhost:3000/product").then((res) => {
        console.log(res.data);
        this.apidata = res.data;
      });
    },
    async savePostdata() {
      try {
        const formData = new FormData();
        formData.append("productName", this.postdata.productName);
        formData.append("productDetail", this.postdata.productDetail);
        formData.append("price", this.postdata.price);
        formData.append("amount", this.postdata.amount);

        if (this.selectedFile) {
          formData.append("productImage", this.selectedFile);
        }

        const { data } = await this.axios.post(
          "http://localhost:3000/product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        alert("เพิ่มสินค้าใหม่สำเร็จ!!");
        this.getData();
        this.closeItem();
        this.resetImageData();
      } catch (error) {
        console.error("Save Product Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "เกิดข้อผิดพลาดในการบันทึกสินค้า";
        alert(errorMessage);
      }
    },
    async savePutdata() {
      try {
        const formData = new FormData();
        formData.append("productName", this.postdata.productName);
        formData.append("productDetail", this.postdata.productDetail);
        formData.append("price", this.postdata.price);
        formData.append("amount", this.postdata.amount);

        // เพิ่มรูปภาพถ้ามีการเลือก
        if (this.selectedFile) {
          formData.append("productImage", this.selectedFile);
        }

        const { data } = await this.axios.put(
          "http://localhost:3000/product/" + this.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        alert("แก้ไขข้อมูลสินค้าสำเร็จ!!");
        this.getData();
        this.closeItem();
        this.resetImageData(); // รีเซ็ตข้อมูลรูปภาพหลังบันทึก
      } catch (error) {
        console.log(error);
        alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
      }
    },
    getProductImageUrl(imagePath) {
      // ตรวจสอบและแปลง path รูปภาพ
      return imagePath
        ? `http://localhost:3000/${imagePath}`
        : "default-image-path.jpg";
    },
    async deleteItem(item) {
      if (confirm("ต้องการลบสินค้า") + item.productName)
        try {
          const { data } = await this.axios.delete(
            "http://localhost:3000/product/" + item._id
          );
          console.log(data);
          alert("ลบสินค้าสำเร็จ!!");
          this.getData();
          this.closeItem();
        } catch (error) {
          console.log(error);
          alert("error");
        }
    },
    formatPrice(price) {
      return price.toLocaleString("th-TH");
    },
    onFileSelected(file) {
      this.selectedFile = file;

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addToCart(product, event) {
      // Check if product is already in cart
      const existingProductIndex = this.cart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex > -1) {
        // If product exists, increase quantity
        if (this.cart[existingProductIndex].quantity < product.amount) {
          this.cart[existingProductIndex].quantity += 1;
        } else {
          alert("จำนวนสินค้าไม่เพียงพอ");
          return;
        }
      } else {
        // If product not in cart, add with quantity 1
        if (product.amount > 0) {
          this.cart.push({
            ...product,
            quantity: 1,
          });
        } else {
          alert("สินค้าหมด");
          return;
        }
      }

      // Add animation for +1
      const rect = event.target.getBoundingClientRect();
      this.animationStyle = {
        position: "absolute",
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top}px`,
      };

      this.animationVisible = true; // Show animation
      setTimeout(() => {
        this.animationVisible = false; // Hide animation after 1s
      }, 3000);
    },

    increaseQuantity(index) {
      if (this.cart[index].quantity < this.cart[index].amount) {
        this.cart[index].quantity += 1;
      } else {
        alert("จำนวนสินค้าไม่เพียงพอ");
      }
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        // If quantity is 1, remove from cart
        this.removeFromCart(index);
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
      this.cartDialog = true;
    },
    showCart() {
      this.cartDialog = true;
    },
    calculateTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    async confirmOrder() {
      try {
        // Prepare order data
        const orderItems = this.cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        }));

        // Send order to backend
        const { data } = await this.axios.post("http://localhost:3000/orders", {
          items: orderItems,
          buyerName: "Guest",
          total: this.calculateTotal(),
        });

        // Update product amounts
        for (const item of this.cart) {
          await this.axios.put(`http://localhost:3000/product/${item._id}`, {
            amount: item.amount - item.quantity,
          });
        }

        console.log(data);
        alert("สั่งซื้อสำเร็จ!");
        this.getData(); // Refresh product data
        this.clearCart();
        this.cartDialog = false;
      } catch (error) {
        console.error("Order Error:", error);
        alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    },
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true,
    },
  },
  mounted() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  },
};
</script>

<style scoped>
.v-list-item__avatar {
  margin-right: 16px !important;
}
.v-list-item__avatar img {
  max-width: 80px;
  max-height: 80px;
  object-fit: cover;
}
.productCard {
  border: 3px;
  border-radius: 15px;
  border-style: solid;
  border-color: black;
  box-shadow: 5px 10px;
}
.editCard {
  border-radius: 15px;
  border-style: solid;
  border-color: black;
}
.v-badge__badge {
  font-size: 0.75rem; /* ขนาดของตัวเลข */
  min-width: 16px; /* ขนาด Badge */
  height: 16px; /* ขนาด Badge */
}
.cart-animation {
  font-size: 1.5rem;
  color: red;
  animation: move-up 1s ease-out forwards;
  pointer-events: none; /* ป้องกันไม่ให้ข้อความรับอีเวนต์ */
}

@keyframes move-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-50px);
  }
}
</style>