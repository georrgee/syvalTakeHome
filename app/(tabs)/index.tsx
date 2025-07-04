import Post from '@/components/Post';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal, SafeAreaView,
  ScrollView, StatusBar,
  StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';

export interface PostItem {
  id: string;
  name: string;
  amount: string;
  timestamp: string;
  transaction: string;
  spendingStyle?: string;
  likes?: number;
  comments?: number;
  category?: string;
  title?: string;
  caption?: string;
  image?: string;
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  price: string;
  date: string;
}

export interface Friend {
  id: string;
  name: string;
}

export default function HomeScreen() {

  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [taggedFriends, setTaggedFriends] = useState<Friend[]>([]);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [friendSearchText, setFriendSearchText] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [showFeelingDropdown, setShowFeelingDropdown] = useState(false);

  const mockFriends: Friend[] = [
    { id: '1', name: 'Haruka' },
    { id: '2', name: 'Rey Delgado' },
    { id: '3', name: 'Danica' },
    { id: '4', name: 'Carl' },
    { id: '5', name: 'Jeff' }
  ];

  const mockFeelings = [
    { id: '1', emoji: '😊', label: 'Happy' },
    { id: '2', emoji: '😐', label: 'Neutral' },
    { id: '3', emoji: '😞', label: 'Sad' }
  ];

  const mockHashtags = [
    { id: '1', name: '#reflect', color: '#E3D1A1' },
    { id: '2', name: '#flex', color: '#C4B9FE' },
    { id: '3', name: '#reward', color: '#51b06c' },
    { id: '4', name: '#uncertain', color: '#c8c5c6' },
    { id: '5', name: '#necessary', color: '#745ba5' },
    { id: '6', name: '#supportive', color: '#ec7aab' },
  ];

  const categories = [
    { name: "Bank Fees", emoji: "🏦" },
    { name: "Clothing", emoji: "👕" },
    { name: "Coffee Shop", emoji: "☕" },
    { name: "Community", emoji: "🏘️" },
    { name: "Credit Card", emoji: "💳" },
    { name: "Education", emoji: "📚" },
    { name: "Entertainment", emoji: "🎬" },
    { name: "Food and Drink", emoji: "🍽️" },
    { name: "Gas Stations", emoji: "⛽" },
    { name: "General Merchandise", emoji: "🛍️" },
    { name: "Groceries", emoji: "🛒" },
    { name: "Healthcare", emoji: "🏥" },
    { name: "Home Improvement", emoji: "🔨" },
    { name: "Loan", emoji: "💰" },
    { name: "Mortgage", emoji: "🏠" },
    { name: "Payment", emoji: "💸" },
    { name: "Personal Care", emoji: "💅" },
    { name: "Recreation", emoji: "🎯" },
    { name: "Rent", emoji: "🏢" },
    { name: "Restaurants", emoji: "🍴" },
    { name: "Service", emoji: "🔧" },
    { name: "Shopping", emoji: "🛒" },
    { name: "Subscription", emoji: "📱" },
    { name: "Transfer", emoji: "💸" },
    { name: "Transportation", emoji: "🚗" },
    { name: "Travel", emoji: "✈️" },
    { name: "Utilities", emoji: "💡" }
  ];

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      name: 'Apple',
      category: 'Shops',
      price: '$9.99',
      date: 'Jun 2'
    },
    {
      id: '2',
      name: 'Deposit George Garcia',
      category: 'Transfer',
      price: '$100',
      date: 'Jun 2'
    },
    {
      id: '3',
      name: 'Payrange',
      category: 'Service',
      price: '$10.00',
      date: 'May 30'
    }
  ];

  const posts: PostItem[] = [
    {
      id: '1',
      name: 'George Garcia',
      amount: '$100.00',
      category: '#reflect',
      spendingStyle: 'The Connector',
      title: 'Birthday Present',
      caption: 'Little bro gave me a birthday present. I feel bad that he sent me money. He is also looking for a job. But I know that it’s all love and that the bad things are only temporary.',
      timestamp: 'Just now',
      transaction: 'Deposit Transfer',
      likes: 8,
      comments: 12,
    },
    {
      id: '2',
      name: 'Haruka',
      amount: '$11.50',
      category: '#flex',
      spendingStyle: 'The Indulger',
      caption: 'Feeling productive every day and I love it! Thought I should treat myself for all the hard work...',
      timestamp: '3h',
      transaction: 'Saluhall Market Food & Drink',
      likes: 500,
      comments: 526,
      image: 'https://via.placeholder.com/100', 
    },

    {
      id: '3',
      name: 'Danica',
      amount: '$526.92',
      category: '#flex',
      spendingStyle: 'The Supporter',
      caption: `Great dinner with George's birthday`,
      timestamp: '5h',
      transaction: 'La Mar',
      likes: 42,
      comments: 5,
      image: 'https://via.placeholder.com/101',
    },
  ];

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling);
    setShowFeelingDropdown(false);
  };

  const toggleFeelingDropdown = () => {
    setShowFeelingDropdown(!showFeelingDropdown);
  };

  const handleCreatePost = () => {
    setIsCreatePostVisible(true);
  };

  const handleCloseModal = () => {
    setIsCreatePostVisible(false);
    setPostTitle('');
    setPostText('');
    setSelectedTransaction(null);
    setSelectedHashtag(null);
    setSelectedCategory(null);
    setShowCategoryDropdown(false);
    setTaggedFriends([]);
    setShowFriendsDropdown(false);
    setFriendSearchText('');
    setSelectedFeeling(null);
    setShowFeelingDropdown(false);
  };

  const handleFriendTag = (friend: Friend) => {
    if (taggedFriends.length >= 5) {
      return;
    }

    if (!taggedFriends.find(f => f.id === friend.id)) {
      const newTaggedFriends = [...taggedFriends, friend];
      setTaggedFriends(newTaggedFriends);
    }

    setShowFriendsDropdown(false);
    setFriendSearchText('');
  };

  const handleRemoveFriend = (friendId: string) => {
    const friendToRemove = taggedFriends.find(f => f.id === friendId);
    if (friendToRemove) {
      setTaggedFriends(taggedFriends.filter(f => f.id !== friendId));

      // Remove @mention from post text
      const mention = `@${friendToRemove.name}`;
      setPostText(prev => prev.replace(new RegExp(`\\s*${mention}\\s*`, 'g'), ' ').trim());
    }
  };

  const toggleFriendsDropdown = () => {
    setShowFriendsDropdown(!showFriendsDropdown);
    setFriendSearchText('');
  };

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(friendSearchText.toLowerCase()) &&
    !taggedFriends.find(tagged => tagged.id === friend.id)
  );

  const handleHashtagSelect = (hashtag: string) => {
    setSelectedHashtag(selectedHashtag === hashtag ? null : hashtag);
  };

  const renderHashtagItem = ({ item }: { item: { id: string; name: string; color: string } }) => (
    <TouchableOpacity
      style={[
        styles.hashtagPill,
        { backgroundColor: selectedHashtag === item.name ? item.color : '#f0f0f0' }
      ]}
      onPress={() => handleHashtagSelect(item.name)}
    >
      <ThemedText style={[
        styles.hashtagText,
        { color: selectedHashtag === item.name ? '#fff' : '#666' }
      ]}>
        {item.name}
      </ThemedText>
    </TouchableOpacity>
  );

  const handlePost = () => {
    console.log('Creating post:', { title: postTitle, text: postText });
    handleCloseModal();
  };

  const handleTransactionSelect = (transaction: Transaction) => {
    if (selectedTransaction?.id === transaction.id) {
      setSelectedTransaction(null);
      setSelectedCategory(null); // Reset category when transaction is deselected
      setShowCategoryDropdown(false);
    } else {
      setSelectedTransaction(transaction);
      setSelectedCategory(null); // Reset category when new transaction is selected
      setShowCategoryDropdown(false);
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowCategoryDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    if (selectedTransaction) {
      setShowCategoryDropdown(!showCategoryDropdown);
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        selectedTransaction?.id === item.id && styles.transactionItemSelected
      ]}
      onPress={() => handleTransactionSelect(item)}
    >
      <View style={styles.transactionContent}>
        <View style={styles.transactionHeader}>
          <ThemedText style={styles.transactionName}>{item.name}</ThemedText>
          <ThemedText style={styles.transactionPrice}>{item.price}</ThemedText>
        </View>
        <View style={styles.transactionDetails}>
          <ThemedText style={styles.transactionCategory}>{item.category}</ThemedText>
          <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.screenContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <ThemedText style={styles.headerText}>For you</ThemedText>
          </View>

          <View style={styles.headerButtonsContainer}>
            <Ionicons name='people-outline' size={24} color="#5643F4" />
            <Ionicons name='notifications-outline' size={24} color="#5643F4" />
          </View>
        </View>

        <View style={styles.postListContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            style={styles.postListStyle}
            keyExtractor={(item) => item.id} />
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleCreatePost}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>

        {/* Full Screen Modal */}
        <Modal
          visible={isCreatePostVisible}
          animationType="slide"
          presentationStyle="fullScreen">

          <SafeAreaView style={styles.modalContainer}>
            <StatusBar barStyle="dark-content" />

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>

              <ThemedText style={styles.modalTitleTextStyle}>
                Create a post
              </ThemedText>

              <TouchableOpacity
                style={[styles.postButton, (selectedTransaction && selectedHashtag && selectedFeeling) ? styles.postButtonActive : styles.postButtonInactive]}
                onPress={handlePost}
                disabled={!(selectedTransaction && selectedHashtag && selectedFeeling)}>
                <ThemedText style={[styles.postButtonText, (selectedTransaction && selectedHashtag && selectedFeeling) ? styles.postButtonTextActive : styles.postButtonTextInactive]}>
                  Post
                </ThemedText>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {/* Modal Content */}
              <View style={styles.modalContent}>
                {/* <View style={styles.userInfo}>
                  <View style={styles.modalProfilePicture}>
                    <ThemedText style={styles.modalProfileInitials}>GG</ThemedText>
                  </View>
                  <ThemedText style={styles.modalUsername}>George</ThemedText>
                </View> */}

                {/* Title Input */}
                <TextInput
                  style={styles.titleInput}
                  placeholder="Title (optional)"
                  placeholderTextColor="#666"
                  value={postTitle}
                  onChangeText={setPostTitle}
                  maxLength={60}
                  returnKeyType="next"
                />

                {/* Body Input */}
                <TextInput
                  style={styles.textInput}
                  placeholder="Share your journey (optional)"
                  placeholderTextColor="#666"
                  multiline
                  value={postText}
                  onChangeText={setPostText}
                  maxLength={280}
                  textAlignVertical="top"
                  returnKeyType='next' />
              </View>

              {/* Bottom Actions */}
              <View style={styles.modalFooter}>
                <View style={styles.footerActions}>
                  {/* Picture Button */}
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="image-outline" size={24} color="#5643F4" />
                  </TouchableOpacity>

                  {/* Category Button */}
                  <View style={styles.categoryButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.categoryButton, selectedCategory && { backgroundColor: '#5643F4'},
                        !selectedTransaction && styles.categoryButtonDisabled
                      ]}
                      onPress={toggleCategoryDropdown}
                      disabled={!selectedTransaction}
                    >
                      <ThemedText style={[
                        styles.categoryButtonText, selectedCategory && { color: '#fff' },
                        !selectedTransaction && styles.categoryButtonTextDisabled
                      ]}>
                        {selectedCategory || "Category"}
                      </ThemedText>
                      <Ionicons
                        name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={selectedCategory ? "white" : "#5643F4"}
                      />
                    </TouchableOpacity>

                    {/* Category Dropdown */}
                    {showCategoryDropdown && (
                      <View style={styles.categoryDropdown}>
                        <View style={styles.dropdownHeader}>
                          <ThemedText style={styles.dropdownTitle}>Select Category</ThemedText>
                        </View>
                        <ScrollView
                          style={styles.categoryDropdownList}
                          showsVerticalScrollIndicator={false}
                          nestedScrollEnabled={true}>
                          {categories.map((item) => (
                            <TouchableOpacity
                              key={item.name}
                              style={styles.categoryDropdownItem}
                              onPress={() => handleCategorySelect(item.name)}>
                              <ThemedText style={styles.categoryEmoji}>{item.emoji}</ThemedText>
                              <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  {/* @ Button with Friends Dropdown */}
                  <View style={styles.friendsButtonContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, taggedFriends.length > 0 && styles.actionButtonActive]}
                      onPress={toggleFriendsDropdown}
                    >
                      <Ionicons name="at-outline" size={24} color={taggedFriends.length > 0 ? "#fff" : "#5643F4"} />
                      {taggedFriends.length > 0 && (
                        <View style={styles.friendsBadge}>
                          <ThemedText style={styles.friendsBadgeText}>{taggedFriends.length}</ThemedText>
                        </View>
                      )}
                    </TouchableOpacity>

                    {/* Friends Dropdown */}
                    {showFriendsDropdown && (
                      <View style={styles.friendsDropdown}>
                        <View style={styles.friendsDropdownHeader}>
                          <TextInput
                            style={styles.friendsSearchInput}
                            placeholder="Search friends"
                            placeholderTextColor="#999"
                            value={friendSearchText}
                            onChangeText={setFriendSearchText}
                            autoFocus
                          />
                          <TouchableOpacity
                            style={styles.friendsCloseButton}
                            onPress={toggleFriendsDropdown}
                          >
                            <Ionicons name="close" size={20} color="#666" />
                          </TouchableOpacity>
                        </View>

                        <ScrollView
                          style={styles.friendsDropdownList}
                          showsVerticalScrollIndicator={false}
                          nestedScrollEnabled={true}
                        >
                          {filteredFriends.length > 0 ? (
                            filteredFriends.map((friend) => (
                              <TouchableOpacity
                                key={friend.id}
                                style={styles.friendsDropdownItem}
                                onPress={() => handleFriendTag(friend)}
                              >
                                <View style={styles.friendAvatar}>
                                  <ThemedText style={styles.friendAvatarText}>
                                    {friend.name.charAt(0).toUpperCase()}
                                  </ThemedText>
                                </View>
                                <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
                              </TouchableOpacity>
                            ))
                          ) : (
                            <View style={styles.noFriendsFound}>
                              <ThemedText style={styles.noFriendsText}>
                                {friendSearchText ? 'No friends found' : 'All friends tagged'}
                              </ThemedText>
                            </View>
                          )}
                        </ScrollView>
                        {taggedFriends.length >= 5 && (
                          <View style={styles.friendsLimitWarning}>
                            <ThemedText style={styles.friendsLimitText}>Maximum 5 friends can be tagged</ThemedText>
                          </View>
                        )}
                      </View>
                    )}
                  </View>

                  {/* Feeling Button */}
                  <View style={styles.feelingButtonContainer}>
                    <TouchableOpacity
                      style={[styles.feelingButton, selectedFeeling && styles.feelingButtonActive]}
                      onPress={toggleFeelingDropdown}
                    >
                      <ThemedText style={[styles.feelingButtonText, selectedFeeling && styles.feelingButtonTextActive]}>
                        {selectedFeeling ? `${selectedFeeling}` : "😶"}
                      </ThemedText>
                      <Ionicons
                        name={showFeelingDropdown ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={selectedFeeling ? "#fff" : "#5643F4"}
                      />
                    </TouchableOpacity>

                    {/* Feeling Dropdown */}
                    {showFeelingDropdown && (
                      <View style={styles.feelingDropdown}>
                        <View style={styles.feelingDropdownHeader}>
                          <ThemedText style={styles.feelingDropdownTitle}>How do you feel about this?</ThemedText>
                        </View>
                        {mockFeelings.map((feeling) => (
                          <TouchableOpacity
                            key={feeling.id}
                            style={styles.feelingDropdownItem}
                            onPress={() => handleFeelingSelect(feeling.emoji)}
                          >
                            <ThemedText style={styles.feelingEmoji}>{feeling.emoji}</ThemedText>
                            <ThemedText style={styles.feelingLabel}>{feeling.label}</ThemedText>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
              

              {/* Tagged Friends Chips */}
              {taggedFriends.length > 0 && (
                <View style={styles.taggedFriendsSection}>
                  <ThemedText style={styles.taggedFriendsLabel}>Tagged Friends:</ThemedText>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.taggedFriendsContainer}
                  >
                    {taggedFriends.map((friend) => (
                      <View key={friend.id} style={styles.friendChip}>
                        <ThemedText style={styles.friendChipText}>@{friend.name}</ThemedText>
                        <TouchableOpacity
                          style={styles.friendChipRemove}
                          onPress={() => handleRemoveFriend(friend.id)}
                        >
                          <Ionicons name="close" size={14} color="#666" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
              



              {/* Hashtag Section */}
              <View style={styles.hashtagSection}>
                <FlatList
                  data={mockHashtags}
                  renderItem={renderHashtagItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.hashtagList}
                />
              </View>

              {/* Transaction Bottom Sheet */}
              <View style={styles.transactionSheet}>
                <View style={styles.sheetHeader}>
                  <ThemedText style={styles.sheetTitle}>Recent Transactions</ThemedText>
                </View>
                <FlatList
                  data={mockTransactions}
                  renderItem={renderTransactionItem}
                  keyExtractor={(item) => item.id}
                  style={styles.transactionList}
                  scrollEnabled={false}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },

  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },

  headerContainer: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTextContainer: {
    flex: 0.6,
  },

  headerButtonsContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5643F4'
  },

  postListContainer: {
    flex: 1,
    width: '100%',
  },

  postListStyle: {
    marginTop: 20,
    paddingHorizontal: 0,
  },

  // Floating Action Button Styles
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5643F4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modalScrollView: {
    flex: 1,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },

  modalTitleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  postButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  postButtonActive: {
    backgroundColor: '#5643F4',
  },

  postButtonInactive: {
    backgroundColor: '#e1e8ed',
  },

  postButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  postButtonTextActive: {
    color: '#fff',
  },

  postButtonTextInactive: {
    color: '#aab8c2',
  },

  modalContent: {
    padding: 16,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalProfilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5643F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  modalProfileInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  // Selected Transaction Preview Styles
  selectedTransactionPreview: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#5643F4',
  },

  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5643F4',
    marginBottom: 8,
  },

  previewContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },

  previewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    backgroundColor: '#fff',
  },



  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },


  actionButton: {
    padding: 12,
    borderRadius: 24,
    //backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
 // Transaction Sheet Styles
  transactionSheet: {
    //backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    marginTop: 16,
  },

  sheetHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    //borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  transactionList: {
    paddingHorizontal: 16,
  },

  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  transactionItemSelected: {
    borderColor: '#5643F4',
    backgroundColor: '#f0f0ff',
  },

  transactionContent: {
    flex: 1,
  },

  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },

  transactionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5643F4',
  },

  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  transactionCategory: {
    fontSize: 14,
    color: '#666',
  },

  transactionDate: {
    fontSize: 14,
    color: '#666',
  },

  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 5,
    marginBottom: 5,
  },

  textInput: {
    minHeight: 100,
    fontSize: 18,
    color: '#000',
    textAlignVertical: 'top',
    paddingTop: 12,
    marginBottom: 8,
  },

  characterCount: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },

  characterCountText: {
    fontSize: 12,
    color: '#666',
  },

  // Hashtag Styles
  hashtagSection: {
    marginTop: 16,
  },

  hashtagSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  hashtagList: {
    paddingHorizontal: 4,
  },

  hashtagPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hashtagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Category Button Styles
  categoryButtonContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    // borderWidth: 1,
    // borderColor: '#5643F4',
    //backgroundColor: '#fff',
    minWidth: 100,
    justifyContent: 'center',
    height: 48,
  },

  categoryButtonDisabled: {
    borderColor: '#ccc',
    //backgroundColor: '#f5f5f5',
  },

  categoryButtonText: {
    fontSize: 14,
    color: '#5643F4',
    fontWeight: '500',
    marginRight: 6,
  },

  categoryButtonTextDisabled: {
    color: '#ccc',
  },

  categoryDropdown: {
    position: 'absolute',
    top: 55,
    left: '50%',
    transform: [{ translateX: -90 }],
    minWidth: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    maxHeight: 250,
    zIndex: 1000,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  // Add new dropdown header style
  dropdownHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  categoryDropdownList: {
    maxHeight: 180,
  },

  categoryDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f5f5f5',
  },

  categoryEmoji: {
    fontSize: 20,
    marginRight: 12,
  },

  categoryName: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },

  // friends styling 
  friendsButtonContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  actionButtonActive: {
    backgroundColor: '#5643F4',
  },

  friendsBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  friendsBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  friendsDropdown: {
    position: 'absolute',
    top: 55,
    right: -50,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 250,
    maxHeight: 320,
    zIndex: 1000,
  },

  friendsDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  friendsSearchInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },

  friendsCloseButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  friendsDropdownList: {
    maxHeight: 220,
  },
  friendsDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },

  friendAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5643F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  }, friendAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  friendName: {
    fontSize: 16,
    color: '#333',
  },
  noFriendsFound: {
    padding: 20,
    alignItems: 'center',
  },
  noFriendsText: {
    color: '#666',
    fontSize: 14,
  },
  friendsLimitWarning: {
    padding: 8,
    backgroundColor: '#fff3cd',
    borderTopWidth: 1,
    borderTopColor: '#ffeaa7',
  },
  friendsLimitText: {
    color: '#856404',
    fontSize: 12,
    textAlign: 'center',
  },
  taggedFriendsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  taggedFriendsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  taggedFriendsContainer: {
    flexDirection: 'row',
  },
  friendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  friendChipText: {
    fontSize: 14,
    color: '#5643F4',
    marginRight: 6,
  },
  friendChipRemove: {
    padding: 2,
  },
  // feeling styling
  feelingButtonContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  feelingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    //backgroundColor: '#f8f9fa',
    // borderWidth: 1,
    // borderColor: '#5643F4',
    minWidth: 60,
    height: 48,
    justifyContent: 'center',
  },

  feelingButtonText: {
    fontSize: 18,
    color: '#5643F4',
    marginRight: 6,
  },

  feelingButtonActive: {
    backgroundColor: '#5643F4',
  },

  feelingButtonTextActive: {
    color: '#fff',
  },
  feelingDropdown: {
    position: 'absolute',
    top: 55,
    left: '50%',
    transform: [{ translateX: -75 }], // Center the dropdown
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    minWidth: 150,
  },

  feelingDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f5f5f5',
  },

  feelingEmoji: {
    fontSize: 22,
    marginRight: 12,
  },

  feelingLabel: {
    fontSize: 15,
    color: '#333',
  },

  feelingDropdownHeader: {
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
    //backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  feelingDropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

});