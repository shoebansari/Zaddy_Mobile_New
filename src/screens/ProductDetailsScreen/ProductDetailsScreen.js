import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllProductDetails } from '../../redux/slices/productDetailsSlice';
import { getAllReviewRating, getAllReviewRatingStar } from '../../redux/slices/ratingReviewSlice';
import { fetchAllPinCode } from '../../redux/slices/shippingMethodSlice';
import Collapsible from 'react-native-collapsible';
import RenderHtml from 'react-native-render-html';
import styles from './ProductDetailsStyle';
import { emitCartUpdate } from '../../utils/emitCartUpdate';
import { calculateDiscountPercentage } from '../../utils/clientUtil';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId , productGUID ,gproductId} = route.params;

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isPinValid, setIsPinValid] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const { productData, faqs, faqIngredients, loading, error, similarProducts, faqWithProducts } = useSelector(state => state.productDetailsSlice);

  const ratingReviewData = useSelector(state => state.ratingReviewSlice.ratingReviewData);
  const ratingReviewStarData = useSelector(state => state.ratingReviewSlice.ratingReviewStarData);
  useEffect(() => {
    const payload = { id: String(productId || productGUID || gproductId) };
    dispatch(getAllProductDetails(payload));
   dispatch(getAllReviewRating(productId || productGUID || gproductId));
    dispatch(getAllReviewRatingStar(productId || productGUID || gproductId));

  }, [dispatch]);

  useEffect(() => {
    if (productData?.imageUrls?.length > 0) {
      setSelectedImage(productData.imageUrls[0]);
    }
  }, [productData]);

  const handleAddToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      const itemExists = cartItems.find(item => item.productId === productData.productId);
      if (itemExists) {
        setAddedToCart(true);
        return;
      }

      const newItem = {
        productId: productData.productId,
        productName: productData.productName,
        image: selectedImage || productData.imageUrls?.[0] || '',
        price: productData.price,
        quantity: quantity,
        stock: productData.stock,
        mrp: productData.mrp,
        sellerName: productData.sellerName || 'ZaddyCare',
        selectedImage: selectedImage
      };

      cartItems.push(newItem);
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      setAddedToCart(true);
      emitCartUpdate(); // Use the exported function
      Alert.alert('Success', 'Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };
  const handleGoToCart = () => {
    navigation.navigate('Cart');
  };

  const calculateDeliveryDates = (deliveryDays = 5) => {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + deliveryDays);
    const startFormatted = startDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    const endFormatted = endDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return `${startFormatted} to ${endFormatted}`;
  };

  const handlePinCodeCheck = async () => {
    if (pinCode.length !== 6) {
      setIsPinValid(false);
      return;
    }
    const handleThumbnailHover = (image) => {
      setMainImage(image);
    };

    setIsCheckingPin(true);
    try {
      const response = await dispatch(fetchAllPinCode(pinCode)).unwrap();
      if (response.statusCode === 200) {
        setIsPinValid(true);
        setDeliveryInfo(response?.data[0]?.noOfDays);
      } else {
        setIsPinValid(false);
      }
    } catch (error) {
      console.error("Error checking pincode:", error);
      setIsPinValid(false);
    } finally {
      setIsCheckingPin(false);
    }
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      handlePinCodeCheck();
    } else {
      setIsPinValid(null);
    }
  }, [pinCode]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container}>
        {/* Product Images Section */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.mainImage}
            resizeMode="contain"
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>

            {productData?.imageUrls?.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedImage(image);
                  setMainImage(image);
                }}
                style={[
                  styles.thumbnailWrapper,
                  selectedImage === image && styles.selectedThumbnail
                ]}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{productData?.productName}</Text>
          <Text style={styles.subName}>{productData?.subName}</Text>

          {/* Rating Section */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="star"
                size={20}
                color={star <= (productData?.rating || 0) ? '#FFD700' : '#D3D3D3'}
              />
            ))}
            <Text style={styles.ratingCount}>{productData?.reviewCount}</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{productData?.price}</Text>
            {productData?.mrp && (
              <>
                <Text style={styles.mrp}>₹{productData.mrp}</Text>
                <View style={styles.discountBadge}>
                   <Text style={styles.discountText}>
                    {calculateDiscountPercentage(productData.mrp, productData.price)}% Off
                  </Text>
                </View>
              </>
            )}
          </View>
          {faqWithProducts?.length > 0 && (
            <View style={styles.faqWithProductsSection}>
              <Text style={styles.sectionTitle}>Product Related FAQs</Text>
              {faqWithProducts.map((item, index) => (
                <View key={`faq-product-${index}`} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                  >
                    <Text style={styles.faqTitle}>{item.title}</Text>
                    <Icon
                      name={activeFaqIndex === index ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                  <Collapsible collapsed={activeFaqIndex !== index}>
                    <View style={styles.faqContent}>
                      <RenderHtml
                        contentWidth={width - 30}
                        source={{ html: item.description }}
                        baseStyle={styles.faqDescription}
                      />
                    </View>
                  </Collapsible>
                  {index !== faqWithProducts.length - 1 && <View style={styles.faqSeparator} />}
                </View>
              ))}
            </View>
          )}

          {/* Delivery Section */}
          <View style={styles.deliverySection}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <Text style={styles.deliveryText}>Sold by: {productData?.sellerName || 'ZaddyCare'}</Text>
          </View>

          {/* Pincode Section */}
          <View style={styles.pincodeSection}>
            <Text style={styles.sectionTitle}>Check Delivery Availability</Text>
            <View style={styles.pincodeInputContainer}>
              <TextInput
                style={styles.pincodeInput}
                placeholder="Enter 6-digit pincode"
                keyboardType="numeric"
                maxLength={6}
                value={pinCode}
                onChangeText={text => setPinCode(text)}
              />
              {isCheckingPin && (
                <ActivityIndicator size="small" color="#000" style={styles.loadingIndicator} />
              )}
            </View>

            {pinCode.length > 0 && (
              <View style={styles.pincodeValidation}>
                {pinCode.length < 6 ? (
                  <Text style={styles.validationError}>Please enter 6 digits</Text>
                ) : isPinValid ? (
                  <Text style={styles.validationSuccess}>
                    {" "}
                    Expected Delivery:{" "}
                    {calculateDeliveryDates(deliveryInfo)}
                  </Text>
                ) : (
                  <Text style={styles.validationError}>Delivery not available</Text>
                )}
              </View>
            )}
          </View>
          {/* FAQ Ingredients Section */}
          {faqIngredients?.length > 0 && (
            <View style={styles.faqsSection}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {faqIngredients.map((item, index) => (
                <View key={index.toString()} style={styles.faqItem}>
                  <TouchableOpacity
                    onPress={() => setActiveIngredientIndex(activeIngredientIndex === index ? null : index)}
                    style={styles.faqHeader}
                  >
                    <Text style={styles.faqTitle}>{item.title}</Text>
                    <Icon
                      name={activeIngredientIndex === index ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                  <Collapsible collapsed={activeIngredientIndex !== index}>
                    <View style={styles.faqContent}>
                      <RenderHtml
                        contentWidth={width - 30}
                        source={{ html: item.description }}
                        baseStyle={styles.faqDescription}
                      />
                    </View>
                  </Collapsible>
                  {index !== faqIngredients.length - 1 && <View style={styles.faqSeparator} />}
                </View>
              ))}
            </View>
          )}

          {/* Reviews Section */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            {ratingReviewData?.length > 0 ? (
              ratingReviewData.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.userInitialCircle}>
                      <Text style={styles.userInitialText}>
                        {review.username?.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.reviewContent}>
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>Verified Buyer</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="star"
                        size={16}
                        color={star <= review.rating ? '#FFD700' : '#D3D3D3'}
                      />
                    ))}
                    <Text style={styles.Text}>{review.title}</Text>
                  </View>

                  <Text style={styles.reviewText}>{review.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noReviews}>No reviews yet</Text>
            )}

            {ratingReviewStarData?.length > 0 && (
              <View style={styles.ratingSummaryContainer}>
                <View style={styles.ratingSummaryCard}>
                  {/* Left: Average Rating with stars and See reviews summary on one line */}
                  <View style={styles.avgRatingLine}>
                    <Text style={styles.averageRatingText}>
                      {ratingReviewStarData[0].averageRating.toFixed(1)}
                    </Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = star <= Math.floor(ratingReviewStarData[0].averageRating);
                        const half = star === Math.ceil(ratingReviewStarData[0].averageRating) &&
                          (ratingReviewStarData[0].averageRating % 1 >= 0.5);

                        return (
                          <Icon
                            key={star}
                            name={filled ? 'star' : half ? 'star-half-full' : 'star-outline'}
                            size={20}
                            color="#000000"
                          />
                        );
                      })}
                    </View>

                    <Text style={styles.reviewCountText}>
                      Based on {ratingReviewStarData[0].totalReview} reviews
                    </Text>

                    <Text style={styles.seeReviewsButton}>
                      <Text style={styles.seeReviewsButtonText}>
                        ✨ See reviews summary
                      </Text>
                    </Text>
                  </View>

                  {/* Right: Rating breakdown */}
                  <View style={styles.ratingBreakdown}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = ratingReviewStarData[0][`rating${star}`] || 0;
                      const percent = ((count / ratingReviewStarData[0].totalReview) * 100).toFixed(0);

                      return (
                        <View key={star} style={styles.ratingBarContainer}>
                          <Text style={styles.ratingStarText}>{star}</Text>
                          <Icon name="star" size={16} color="#000000" />
                          <View style={styles.ratingBarBackground}>
                            <View
                              style={[
                                styles.ratingBarFill,
                                { width: `${percent}%` }
                              ]}
                            />
                          </View>
                          <Text style={styles.ratingCountText}>{count}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Similar Products Section */}
        {similarProducts?.length > 0 && (
          <View style={styles.similarProductsSection}>
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <FlatList
              data={similarProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.similarProductId.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.similarProductCard}
                  onPress={() => navigation.replace('ProductDetails', { productId: item.subProductId })}
                >
                  <Image
                    source={{ uri: item.images?.[0] }}
                    style={styles.similarProductImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.similarProductName} numberOfLines={2}>
                    {item.productName}
                  </Text>
                  <View style={styles.similarProductPriceContainer}>
                    <Text style={styles.similarProductPrice}>₹{item.price}</Text>
                    {item.mrp && (
                      <>
                        <Text style={styles.similarProductMrp}>₹{item.mrp}</Text>
                        <Text style={styles.discountText}>
                          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {faqs?.length > 0 && (
          <View style={styles.faqsSection}>
            <Text style={styles.sectionTitle}>FAQs</Text>
            {faqs.map((item, index) => (
              <View key={index.toString()} style={styles.faqItem}>
                <TouchableOpacity
                  onPress={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                  style={styles.faqHeader}
                >
                  <Text style={styles.faqTitle}>{item.title}</Text>
                  <Icon
                    name={activeFaqIndex === index ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
                <Collapsible collapsed={activeFaqIndex !== index}>
                  <View style={styles.faqContent}>
                    <RenderHtml
                      contentWidth={width - 30}
                      source={{ html: item.description }}
                      baseStyle={styles.faqDescription}
                    />
                  </View>
                </Collapsible>
                {index !== faqs.length - 1 && <View style={styles.faqSeparator} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        {productData?.stock > 0 ? (
          !addedToCart ? (
            <TouchableOpacity
              style={[styles.button, styles.addToCartButton]}
              onPress={handleAddToCart}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.goToCartButton]}
              onPress={handleGoToCart}
            >
              <Text style={styles.buttonText}>Go to Cart</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={[styles.button, styles.outOfStockButton]}>
            <Text style={styles.buttonText}>Out of Stock</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

