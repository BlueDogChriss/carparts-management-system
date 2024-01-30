<template>
  <div class="PartsLayout">
    <Button
      v-if="auth === true"
      label="Add stock"
      class="right"
      @click="openNew"
    />
    <DataTable
      :value="stocks"
      class="p-datatable-responsive-demo"
      :paginator="true"
      :rows="10"
    >
      <template #header> Table for stocks </template>
      <Column field="ownerId" header="Owner">
        <template #body="slotProps">
          <span class="p-column-title">Owner</span>
          {{ slotProps.data.ownerId }}
        </template>
      </Column>
      <Column field="partId" header="Part">
        <template #body="slotProps">
          <span class="p-column-title">Part</span>
          {{ slotProps.data.partId }}
        </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slotProps">
          <span class="p-column-title">Quantity</span>
          {{ slotProps.data.quantity }}
        </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slotProps">
          <span class="p-column-title">Quantity</span>
          {{ slotProps.data.quantity }}
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="partDialog"
      :style="{ width: '450px' }"
      :header="dialogTitle"
      :modal="true"
      class="p-fluid"
    >
      <Dropdown
        v-model="selectedPart"
        :options="parts"
        optionLabel="code"
        placeholder="Select a part"
      />

      <div class="p-field p-col">
        <InputNumber
          id="quantity"
          v-model="stock.quantity"
          placeholder="Quantity"
          integeronly
        />
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveStock"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import StockService from "../service/StockService";
import PartService from "../service/PartService";

export default {
  data() {
    return {
      stocks: null,
      auth: false,
      partDialog: false,
      stock: {},
      submitted: false,
      dialogTitle: "Add stock",
      parts: [],
      selectedPart: {},
    };
  },
  stockService: null,
  partService: null,
  created() {
    this.stockService = new StockService();
    this.partService = new PartService();
  },
  mounted() {
    this.stockService.getStocks().then((data) => (this.stocks = data));
    if (localStorage.getItem("token")) {
      this.auth = true;
    }

    this.partService.getParts().then((data) => (this.parts = data));
  },
  methods: {
    getStock() {
      this.stockService
        .getStocks()
        .then((data) => {
          this.stocks = data;
          // this.partsLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response !== undefined || err.response.status === 404) {
            this.parts = [];
            this.partsLoading = false;
            this.$toast.add({
              severity: "error",
              summary: "Something went wrong",
              detail: `${err}`,
              life: 3000,
            });
          }
        });
    },
    openNew() {
      console.log("aici");
      this.stock = {};
      this.submitted = false;
      this.partDialog = true;
    },
    hideDialog() {},
    saveStock() {
      console.log(this.selectedPart, this.stock);
      //update if the stock is already here
      this.stockService
        .saveStock({
          quantity: this.stock.quantity,
          partId: this.selectedPart.id,
        })
        .then((data) => {
          console.log(data);
          this.getStock();
          this.partDialog = false;
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response !== undefined || err.response.status === 404) {
            this.parts = [];
            this.partsLoading = false;
            this.$toast.add({
              severity: "error",
              summary: "Something went wrong",
              detail: `${err}`,
              life: 3000,
            });
          }
        });
    },
  },
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    InputNumber,
    Dropdown,
  },
};
</script>
<style lang="scss" scoped>
.PartsLayout {
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.p-field {
  margin-bottom: 10px;
}
.p-dropdown {
  margin-bottom: 10px;
}
.right {
  margin-bottom: 20px;
  max-width: 100px;
}
.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  ::v-deep(.p-datatable) {
    &.p-datatable-responsive-demo {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 100%;
        float: left;
        clear: left;
        border: 0 none;

        .p-column-title {
          padding: 0.4rem;
          min-width: 30%;
          display: inline-block;
          margin: -0.4em 1em -0.4em -0.4rem;
          font-weight: bold;
        }

        &:last-child {
          border-bottom: 1px solid var(--surface-d);
        }
      }
    }
  }
}
</style>
