import { PostItem } from '@/app/(tabs)';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostProps {
  post: PostItem;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const caption = post.caption || '';
  const truncatedCaption = isExpanded
    ? caption
    : caption.split('\n')[0] + (caption.includes('\n') ? '...' : '');

  const handleLike = () => {
    console.log('Like pressed');
  };

  const handleComment = () => {
    console.log('Comment pressed');
  };

  // Generate placeholder profile picture based on name
  const getProfilePicture = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials;
  };

  return (
    <View style={[styles.post, post.category === '#reflect' ? styles.reflect : styles.flex]}>
      <View style={styles.postContent}>
        {/* Profile Picture */}
        <View style={styles.profilePicture}>
          <Text style={styles.profileInitials}>{getProfilePicture(post.name)}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.contentArea}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.user}>{post.name}</Text>
              <Text style={styles.amount}>{post.amount}</Text>
              <Text style={styles.category}>{post.category}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Timestamp and Style */}
          <Text style={styles.timestampStyle}>{post.timestamp} • {post.spendingStyle}</Text>

          {/* Title */}
          {post.title && <Text style={styles.title}>{post.title}</Text>}

          {/* Caption */}
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{truncatedCaption}</Text>
            {caption.includes('\n') && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                accessibilityLabel={isExpanded ? 'Read less' : 'Read more'}
              >
                <Text style={styles.readMore}>{isExpanded ? ' Read Less' : ' Read More'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Images */}
          {post.image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=Food+1' }} style={styles.image} />
              <Image source={{ uri: 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=Food+2' }} style={styles.image} />
            </View>
          )}

          {/* Interactions */}
          <View style={styles.interactions}>
            <TouchableOpacity
              onPress={handleLike}
              style={styles.interactionButton}
              accessibilityLabel={`Like post, ${post.likes} likes`}
            >
              <Ionicons name="thumbs-up-outline" size={16} color="#666" />
              <Text style={styles.interactionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleComment}
              style={styles.interactionButton}
              accessibilityLabel={`Comment on post, ${post.comments} comments`}
            >
              <Ionicons name="chatbubble-outline" size={16} color="#666" />
              <Text style={styles.interactionText}>{post.comments} comments</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Badge */}
          <View style={styles.transactionBadge}>
            <Ionicons name="card-outline" size={12} color="#666" />
            <Text style={styles.transactionText}>{post.transaction}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  post: {
    //marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  reflect: {
    backgroundColor: '#E3D1A1', // Light yellow/cream for #reflect
  },
  flex: {
    backgroundColor: '#C4B9FE', // Light purple for #flex
  },
  postContent: {
    flexDirection: 'row',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  contentArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  category: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  moreButton: {
    padding: 4,
  },
  timestampStyle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  captionContainer: {
    marginBottom: 12,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  readMore: {
    color: '#6A5ACD',
    fontWeight: 'bold',
    marginTop: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  interactions: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  interactionText: {
    fontSize: 12,
    color: '#666',
  },
  transactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 102, 102, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  transactionText: {
    fontSize: 12,
    color: '#666',
  },
});

export default Post;