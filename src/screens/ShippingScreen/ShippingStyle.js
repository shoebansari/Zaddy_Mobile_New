import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  paymentOptions: {
    flexDirection: "row",
    marginBottom: 16,
  },
  paymentOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 4,
    alignItems: "center",
  },
  selectedPaymentOption: {
    borderColor: "#000",
    backgroundColor: "#000",
    
  },
  paymentOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedPaymentOptionText: {
    color: "#fff",
  },
  paymentMethodContainer: {
    marginTop: 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingLeft: 4,
    borderRadius: 10
  },
  methodPickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodPickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  methodPicker: {
    height: 52,
    width: '100%',
    backgroundColor: 'transparent',
    color: '#000',
  },
  pickerItem: {
    fontSize: 16,
    height: 52,
    textAlign: 'left',
    paddingHorizontal: 12,
  },
  pickerPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  addressItem: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  selectedAddressItem: {
    borderColor: "#000",
    backgroundColor: "#fafafa",
  },
  radioButton: {
    marginRight: 12,
    marginTop: 4,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#000",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  addressContent: {
    flex: 1,
  },
 
  addressName: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
},
nameAndBadgeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 4,
},
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
 
  defaultBadge: {
  backgroundColor: "#e6f3ff",
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
},
defaultBadgeText: {
  fontSize: 12,
  color: "#0066cc",
  fontWeight: 'bold',
},
  noAddressText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 16,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  addressForm: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    height: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#666",
  },
  cartItem: {
    flexDirection: "row",
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cartItemSeparator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  discountValue: {
    color: "#00a650",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeOrderButton: {
    backgroundColor: "#000",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  couponContainer: {
    marginVertical: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    color: '#333',
    borderRadius: 10,
  },
   dropdown: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownIcon: {
    marginRight: 8,
  },

   dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  

addressTypeContainer: {
  marginTop: 8,
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
  justifyContent: 'space-between'
},
addressTypeLabel: {
  fontSize: 16,
  color: '#333',
  fontWeight: '500',
},
radioButtonGroup: {
  flexDirection: 'row',
  alignItems: 'center',
},
radioButtonOption: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
},
radioButtonOuter: {
  height: 20,
  width: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#000000',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 5,
},
radioButtonInner: {
  height: 12,
  width: 12,
  borderRadius: 6,
  backgroundColor: '#000000',
},
radioButtonLabel: {
  fontSize: 14,
  color: '#000000',
},

addressTypeText: {
  fontSize: 12,
  color: "#00A86B",
  fontWeight: 'bold',
  textTransform: 'uppercase',
  backgroundColor: "#e6f3ff",
  borderRadius: 4,
  paddingHorizontal: 8,
  paddingVertical: 4,
},
});

export default styles;