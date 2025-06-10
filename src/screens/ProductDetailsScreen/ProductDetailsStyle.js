import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 70, 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  imageSection: {
    padding: 15,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  thumbnailWrapper: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: '#3B82F6',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1F2937',
  },
  subName: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingCount: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 10,
  },
  mrp: {
    fontSize: 18,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#E5F6EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  deliverySection: {
    marginVertical: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  pincodeSection: {
    marginBottom: 20,
  },
  pincodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pincodeInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  pincodeValidation: {
    marginTop: 8,
  },
  validationSuccess: {
    color: '#059669',
    fontSize: 14,
  },
  validationError: {
    color: '#DC2626',
    fontSize: 14,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#000',
  },
  goToCartButton: {
    backgroundColor: '#4B5563',
  },
  outOfStockButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsSection: {
    marginTop: 20,
  },
  reviewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInitialCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userInitialText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  reviewContent: {
    flex: 1,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  verifiedBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
  },
  reviewText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  noReviews: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    marginTop: 10,
  },
  ratingSummaryContainer: {
    marginTop: 20,
  },
  ratingSummaryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 15,
  },
  avgRatingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  averageRatingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 6,
  },
  starsRow: {
    flexDirection: 'row',
  },
  reviewCountText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
  },
  seeReviewsButton: {
    marginLeft: 30,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#E0E7FF',
    borderRadius: 6,
    textAlign: 'center',
  },
  seeReviewsButtonText: {
    color: '#3730A3',
    fontWeight: '600',
    fontSize: 14,

  },
  ratingBreakdown: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingStarText: {
    width: 14,
    fontSize: 14,
    color: '#1F2937',
    marginRight: 4,
  },
  ratingBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    marginHorizontal: 6,
  },
  ratingBarFill: {
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 5,
  },
  ratingCountText: {
    width: 24,
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'right',
  },
  faqsSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  faqItem: {
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  faqTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  faqContent: {
    paddingHorizontal: 5,
  },
  faqDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  faqSeparator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  similarProductsSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  similarProductCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  similarProductImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 18,
  },
  similarProductPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  similarProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  similarProductMrp: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  faqWithProductsSection: {
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 15,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  Text: {
    fontWeight: 'bold',
    marginLeft: 15

  }
});

export default styles;
