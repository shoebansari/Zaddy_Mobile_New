import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, fetchSortByData } from '../redux/slices/productsSlice';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/header/Header';
import { calculateDiscountPercentage } from '../utils/clientUtil';



const { width } = Dimensions.get('window');

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId } = route.params || {};
  const categoryName = route.params?.name || 'Products';

  const { products, sorts, loading, error } = useSelector((state) => state.productsSlice);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState('Category');
  const [dynamicFilterOptions, setDynamicFilterOptions] = useState({
    Category: [],
    Step: [],
    typeOfProduct: [],
    Concern: [],
    Ingredient: [],
    Availability: [],
    Size: []
  });
  const [sortOption, setSortOption] = useState('Recommended');

  useEffect(() => {
    if (categoryId) {
      const data = {
        categoryIds: String(categoryId),
      };
      dispatch(fetchProductsByCategory(data));
      dispatch(fetchSortByData());

      setSelectedFilters(prev => ({
        ...prev,
        Category: [categoryName],
      }));
    }
  }, [categoryId, categoryName, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const getCountMap = (key) => {
        const map = {};
        products.forEach((item) => {
          if (item[key]) {
            const value = key === 'stock' ? String(item[key]) : item[key];
            map[value] = (map[value] || 0) + 1;
          }
        });
        return Object.entries(map).map(([label, count]) => ({ label, count }));
      };

      const categoryCounts = getCountMap('categoryName');
      const currentCategoryCount = categoryCounts.find(c => c.label === categoryName)?.count || 0;

      setDynamicFilterOptions({
        Category: [{ label: categoryName, count: currentCategoryCount }],
        Step: getCountMap('stepsName'),
        typeOfProduct: getCountMap('typeofProductName'),
        Concern: getCountMap('concernName'),
        Size: getCountMap('sizeName'),
        Ingredient: getCountMap('ingredientName'),
        Availability: getCountMap('stock'),
      });
    }
  }, [products, categoryName]);

  const toggleOption = (filterType, option) => {
    const isSelected = selectedFilters[filterType]?.includes(option);
    const updated = isSelected
      ? selectedFilters[filterType].filter(item => item !== option)
      : [...(selectedFilters[filterType] || []), option];

    setSelectedFilters({
      ...selectedFilters,
      [filterType]: updated,
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
    setPriceRange([0, 2000]);
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
  };

  const filteredProducts = () => {
    let filtered = [...products];

    if (selectedFilters.Category?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.Category.includes(product.categoryName)
      );
    }

    if (selectedFilters.typeOfProduct?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.typeOfProduct.includes(product.typeofProductName)
      );
    }

     if (selectedFilters.Step?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.Step.includes(product.stepsName)
      );
    }

    if (selectedFilters.Size?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.Size.includes(product.sizeName)
      );
    }

    if (selectedFilters.Concern?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.Concern.includes(product.concernName)
      );
    }

    if (selectedFilters.Ingredient?.length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters.Ingredient.includes(product.ingredientName)
      );
    }

    filtered = filtered.filter(product =>
      product.productPrice >= priceRange[0] &&
      product.productPrice <= priceRange[1]
    );

    if (selectedFilters.Availability?.length > 0) {
      const availabilityFilter = selectedFilters.Availability[0];
      if (availabilityFilter === 'true') {
        filtered = filtered.filter(product => product.stock);
      } else if (availabilityFilter === 'false') {
        filtered = filtered.filter(product => !product.stock);
      }
    }

    return filtered;
  };

  const getDisplayProducts = () => {
    const filtered = filteredProducts();
    return sortedProducts(filtered);
  };

  const handleClick = ( gproductId) => { 
    navigation.navigate('ProductDetails', {
      gproductId: gproductId
    });
  };

  const sortedProducts = (productsArray = products) => {
    let sorted = [...productsArray];

    if (sortOption === 'Price: High to Low') {
      sorted.sort((a, b) => b.productPrice - a.productPrice);
    } else if (sortOption === 'Price: Low to High') {
      sorted.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOption === 'Better Discount') {
      sorted.sort((a, b) => {
        const discountA = (a.discountPrice / a.productPrice) * 100;
        const discountB = (b.discountPrice / b.productPrice) * 100;
        return discountB - discountA;
      });
    } else if (sortOption === 'Customer Rating') {
      sorted.sort((a, b) => (b.noOfRating || 0) - (a.noOfRating || 0));
    }

    return sorted.filter(product => product.categoryId === Number(categoryId));
  };

  const handleSort = (option) => {
    setSortOption(option);
    setSortModalVisible(false);
  };

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
    <View style={styles.mainContainer}>
      {/* Header Section */}
     

      {/* Scrollable Content Area */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <FlatList
          data={getDisplayProducts()}
          keyExtractor={(item) => item.gproductId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleClick(item.gproductId)}
            >
              {item.images && item.images.length > 0 ? (
                <Image source={{ uri: item.images[0] }} style={styles.image} />
              ) : (
                <Text style={styles.noImage}>No image</Text>
              )}
              <Text style={styles.productName}>{item.productName}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text
                    key={star}
                    style={[
                      styles.star,
                      { color: star <= Math.round(item.rating) ? '#ffd700' : '#d3d3d3' }
                    ]}
                  >
                    ★
                  </Text>
                ))}
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>₹{item.productPrice}</Text>
                <Text style={styles.mrp}>₹{item.mrp}</Text>

                <Text style={styles.discountLabel}>
                  {calculateDiscountPercentage(item.mrp, item.price)}% Off
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.fixedBottom}>
        <TouchableOpacity
          style={[styles.bottomButton, styles.sortButton]}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={styles.bottomButtonText}>Sort by</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, styles.filterButton]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.bottomButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort By</Text>
              {Array.isArray(sorts) && sorts.map((sort) => (
                <Pressable
                  key={sort.sortById}
                  onPress={() => handleSort(sort.sortByName)}
                  style={styles.modalButton}
                >
                  <Text>{sort.sortByName}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setSortModalVisible(false)} style={styles.modalCancel}>
                <Text style={{ color: 'red' }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { height: '80%' }]}>
              <SafeAreaView style={styles.fContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Filters</Text>
                  <TouchableOpacity onPress={clearAll}>
                    <Text style={styles.clearAll}>CLEAR ALL</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.appliedText}>
                  {Object.values(selectedFilters).flat().length} Applied
                </Text>

                <View style={styles.filterContainer}>
                  <View style={styles.filterList}>
                    {['Category', 'Step', 'typeOfProduct', 'Size', 'Concern', 'Price', 'Ingredient'].map(filter => (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          styles.filterItem,
                          activeFilter === filter && styles.activeFilterItem,
                        ]}
                        onPress={() => setActiveFilter(filter)}
                      >
                        <Text style={styles.filterText}>
                          {filter === 'typeOfProduct' ? 'Type Of Product' : filter}
                        </Text>
                        {selectedFilters[filter]?.length > 0 && (
                          <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{selectedFilters[filter].length}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>

                  <ScrollView style={styles.optionList}>
                    {activeFilter === 'Price' ? (
                      <>
                        <Text style={styles.rangeLabel}>
                          Selected Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                        </Text>
                        <Slider
                          style={{ width: '100%', height: 40 }}
                          minimumValue={0}
                          maximumValue={2000}
                          step={1}
                          value={priceRange[1]}
                          onValueChange={value => setPriceRange([priceRange[0], value])}
                          minimumTrackTintColor="#000"
                          maximumTrackTintColor="#ccc"
                          thumbTintColor="#000"
                        />
                      </>
                    ) : (
                      (dynamicFilterOptions[activeFilter] || []).map(({ label, count }) => {
                        const selected = selectedFilters[activeFilter]?.includes(label);
                        return (
                          <TouchableOpacity
                            key={label}
                            style={styles.optionRow}
                            onPress={() => toggleOption(activeFilter, label)}
                          >
                            <View style={[styles.checkbox, selected && styles.checkedBox]}>
                              {selected && (
                                <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>
                              )}
                            </View>
                            <Text style={styles.optionLabel}>{label}</Text>
                            <Text style={styles.optionCount}>({count})</Text>
                          </TouchableOpacity>
                        );
                      })
                    )}
                  </ScrollView>
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setFilterModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={applyFilters}
                  >
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 70, // Space for fixed buttons
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 5,
    alignItems: 'center',
    maxWidth: '48%',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  noImage: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCancel: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  fContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearAll: {
    fontSize: 14,
    color: 'black',
  },
  appliedText: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 13,
    color: '#666',
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  filterList: {
    width: 120,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeFilterItem: {
    backgroundColor: '#f0f0f0',
    borderLeftWidth: 4,
    borderColor: 'black',
  },
  filterText: {
    fontSize: 14,
  },
  filterBadge: {
    backgroundColor: '#000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  optionList: {
    flex: 1,
    padding: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 12,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#000000',
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
  },
  optionCount: {
    color: '#888',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    fontSize: 16,
    color: '#fff',
  },
  cancelButton: {
    width: '30%',
    backgroundColor: '#000',
    padding: 12,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  applyButton: {
    width: '30%',
    backgroundColor: '#000',
    padding: 12,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  applyText: {
    color: '#fff',
    fontSize: 16
  },
  rangeLabel: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  star: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  discountPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 4,
  },
  mrp: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 4,
    marginLeft: 5
  },
  discountLabel: {
    fontSize: 10,
    color: '#059669',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 5
  },
  arrowButton: {
    backgroundColor: 'white',
    width: '10%',
    marginLeft: 2
  },
  arrowText: {
    fontSize: 16,
    color: '#000000',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  sortButton: {
    backgroundColor: '#f0f0f0',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});