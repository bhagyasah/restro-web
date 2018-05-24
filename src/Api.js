/* eslint-disable class-methods-use-this, no-unused-vars */
class Api {
  insertItem(object) { }
  deleteItem(id) { }
  purchaseItem(data) { }
  updateItem(object, id) { }
  insertMenuItem(object) { }
  updateMenuItem(menuitem, id) {}
  deleteMenuItem(id) {}
  reconcile(itemStock) {}
  insertTable(table) {}
  updateTable(obj, id) {}
  deleteTable(id) {}
  placeOrder(tableId, orderItems, discount = 0, serviceCharge, vat) {}
  updateOrder(orderId, tableId, orderItems, discount = 0, serviceCharge, vat) {}
  printOrder(orderId) {}
  cancelOrder(orderId) {}
  completeOrder(orderId) {}
  insertUser(user) {}
  extractSales(itemTypeId, start, end) {}
  getTable() {}
}

export default Api;
