<template>
  <div class="table-responsive mt-4">
    <table class="table table-striped table-bordered align-middle">
      <thead class="table-dark">
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in expenses" :key="item._id">
          <td>{{ item.title }}</td>
          <td>₹ {{ item.amount }}</td>
          <td>{{ item.category }}</td>
          <td class="text-center">
            <button
              class="btn btn-danger btn-sm"
              @click="$emit('deleted', item._id)"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </td>
        </tr>

        <!-- Show message if no expenses -->
        <tr v-if="expenses.length === 0">
          <td colspan="4" class="text-center text-muted py-3">
            No expenses found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["expenses"]
};
</script>
