<template>
  <div class="Stocks">
    <div>
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success"
            @click="openNew"
          />
          <!-- <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            :disabled="!selectedProducts || !selectedProducts.length"
          /> -->
        </template>
      </Toolbar>
    </div>
    <div class="table">
      <div class="loadingContainer">
        <ProgressSpinner v-if="partsLoading"></ProgressSpinner>
        <p v-else-if="parts.length === 0 && !partsLoading">
          Sorry, there are no parts in our database.
        </p>
      </div>
      <DataTable
        ref="dt"
        :value="parts"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <Column
          selectionMode="multiple"
          headerStyle="width: 3rem"
          :exportable="false"
        ></Column>
        <Column field="code" header="Code" :sortable="true"></Column>
        <Column field="name" header="Name" :sortable="true"></Column>
        <Column field="price" header="Price" :sortable="true"></Column>

        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editPart(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="deletePart(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="partDialog"
      :style="{ width: '450px' }"
      :header="dialogTitle"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <InputText
          id="code"
          v-model.trim="part.code"
          required="true"
          placeholder="Code"
          autofocus
          :class="{ 'p-invalid': submitted && !part.code }"
        />
        <small class="p-invalid" v-if="submitted && !part.code"
          >Code is required.</small
        >
      </div>
      <div class="p-field">
        <InputText
          id="name"
          v-model.trim="part.name"
          required="true"
          placeholder="Name"
          autofocus
          :class="{ 'p-invalid': submitted && !part.name }"
        />
        <small class="p-invalid" v-if="submitted && !part.name"
          >Name is required.</small
        >
      </div>

      <div class="p-field">
        <InputNumber
          id="price"
          v-model="part.price"
          mode="currency"
          placeholder="Price"
          currency="USD"
          locale="en-US"
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
          @click="savePart"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import PartService from "../service/PartService";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
export default {
  data() {
    return {
      parts: [],
      auth: false,
      submitted: false,
      partDialog: false,
      partsLoading: false,
      dialogTitle: "Part Details",
      part: {},
    };
  },
  partService: null,
  created() {
    this.partService = new PartService();
  },
  mounted() {
    // this.partsLoading = true;
    // this.partService
    //   .getParts()
    //   .then(data => {
    //     this.parts = data;
    //     console.log(this.parts);

    //     this.partsLoading = false;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    this.getParts();
    console.log(this.parts);
    if (localStorage.getItem("token")) {
      this.auth = true;
    }
    console.log(this.auth);
  },
  methods: {
    getParts() {
      this.partsLoading = true;
      this.partService
        .getParts()
        .then((data) => {
          this.parts = data;
          this.partsLoading = false;
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
      this.dialogTitle = "Part Details / Add";
      this.product = {};
      this.submitted = false;
      this.partDialog = true;
    },
    hideDialog() {
      this.partDialog = false;
      this.submitted = false;
    },
    savePart() {
      this.submitted = true;
      console.log(this.part);
      if (!this.part.id) {
        this.partService.savePart(this.part).then((res) => {
          this.$toast.add({
            severity: "success",
            summary: `${res.message}`,
            detail: "Added a part!",
            life: 3000,
          });

          this.hideDialog();
          this.getParts();
        });
      } else {
        this.partService.updatePart(this.part, this.part.id).then((res) => {
          this.$toast.add({
            severity: "success",
            summary: `${res.message}`,
            detail: "Updated part!",
            life: 3000,
          });

          this.hideDialog();
          this.getParts();
        });
      }
    },
    deletePart(part) {
      console.log(part);
      this.partService.deletePart(part.id).then((res) => {
        this.$toast.add({
          severity: "success",
          summary: `${res.message}`,
          detail: "Added a part!",
          life: 3000,
        });
        this.getParts();
      });
    },
    editPart(part) {
      console.log(part);
      this.dialogTitle = "Part Details / Edit";
      this.part = { ...part };
      this.partDialog = true;
    },
  },
  components: {
    DataTable,
    Column,
    Button,
    Toolbar,
    Dialog,
    InputNumber,
    InputText,
    ProgressSpinner,
  },
};
</script>

<style lang="scss" scoped>
.Stocks {
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.loadingContainer {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.table {
  margin-top: 20px;
}
.p-field {
  margin-bottom: 10px;
}
.p-button-success {
  margin-right: 10px;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.p-dialog .product-image {
  width: 150px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
