<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="container">
    <h1>รายการคำสั่งซื้อ</h1>

    <!-- Orders List -->
    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
      item-key="_id"
      @click:row="showOrderDetails"
    >
      <template v-slot:[`item.order_id`]="{ item }">
        #{{ item.order_id }}
      </template>
      <template v-slot:[`item.totalPrice`]="{ item }">
        {{ formatPrice(item.totalPrice) }} บาท
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>

    <!-- Order Details Dialog -->
    <v-dialog v-model="orderDetailsDialog" max-width="800px">
      <v-card v-if="selectedOrder">
        <v-card-title>
          รายละเอียดคำสั่งซื้อ #{{ selectedOrder.order_id }}
          <v-spacer></v-spacer>
          <v-btn icon @click="orderDetailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="mb-1">ข้อมูลคำสั่งซื้อ</h3>
              <p>
                <strong>ชื่อผู้สั่ง:</strong>
                {{ selectedOrder.buyerName }}
              </p>
              <p>
                <strong>วันที่สั่งซื้อ:</strong>
                {{ formatDate(selectedOrder.createdAt) }}
              </p>
              <p>
                <strong>ยอดรวม:</strong>
                {{ formatPrice(selectedOrder.totalPrice) }} บาท
              </p>
            </v-col>
          </v-row>

          <v-divider class="my-3"></v-divider>

          <h3>รายการสินค้า</h3>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">รูปสินค้า</th>
                <th class="text-left">สินค้า</th>
                <th class="text-right">ราคา</th>
                <th class="text-right">จำนวน</th>
                <th class="text-right">รวม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedOrder.items" :key="item._id">
                <td>
                  <v-img
                    :src="getProductImageUrl(item.product.productImage)"
                    :alt="item.product.productName"
                    width="80"
                    height="80"
                    style="border-radius: 50%; object-fit: cover"
                    contain
                  ></v-img>
                </td>
                <td>{{ item.product.productName }}</td>
                <td class="text-right">
                  {{ formatPrice(item.product.price) }} บาท
                </td>
                <td class="text-right">{{ item.quantity }}</td>
                <td class="text-right">
                  {{ formatPrice(item.itemTotal) }} บาท
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      selectedOrder: null,
      orderDetailsDialog: false,
      headers: [
        { text: "หมายเลขคำสั่งซื้อ", value: "order_id", align: "start" },
        { text: "ชื่อผู้สั่ง", value: "buyerName" },
        { text: "ยอดรวม", value: "totalPrice", align: "right" },
        { text: "วันที่สั่งซื้อ", value: "createdAt", align: "end" },
      ],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await this.axios.get("http://localhost:3000/orders");
        // เรียงลำดับออเดอร์จากวันที่ล่าสุด
        this.orders = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("เกิดข้อผิดพลาดในการโหลดรายการคำสั่งซื้อ");
      }
    },
    showOrderDetails(order) {
      this.selectedOrder = order;
      this.orderDetailsDialog = true;
    },
    formatPrice(price) {
      return price.toLocaleString("th-TH");
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getProductImageUrl(imagePath) {
      return imagePath
        ? `http://localhost:3000/${imagePath}`
        : "default-image-path.jpg";
    },
  },
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
  background-color: #e6e6e6;
  border: 3px;
  border-style: solid;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-data-table th {
  background-color: #4caf50;
  color: rgb(109, 109, 109);
  font-weight: bold;
  padding: 12px 16px;
}

.v-data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

.v-data-table tr:hover {
  background-color: #f1f1f1;
}

/* Order Details Dialog Styles */
.v-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.v-simple-table th {
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
}

.v-simple-table td {
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

/* .rounded-circle {
  border-radius: 50%;
  object-fit: cover;
} */
</style>