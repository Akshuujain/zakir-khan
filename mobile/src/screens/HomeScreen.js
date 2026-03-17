import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getHomeData } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  bg: '#0A0A0F',
  surface: '#13131C',
  card: '#1C1C2A',
  accent: '#E8B34B',
  text: '#F0EDE6',
  muted: '#7A7880',
  border: 'rgba(255,255,255,0.07)',
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const userId = '6f6f6f6f-6f6f-6f6f-6f6f-6f6f6f6f6f6f'; // Demo UUID

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const homeData = await getHomeData(userId);
      setData(homeData);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
    }
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* Hero Banner Area */}
      <View style={styles.heroContainer}>
        <View style={styles.topNav}>
          <Text style={styles.logoText}>ZAKIR<Text style={{color: COLORS.text}}>LIVE</Text></Text>
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search" size={18} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={18} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroContent}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>⭐ EXCLUSIVE SPECIAL</Text>
          </View>
          <Text style={styles.heroTitle}>Mannpasand{'\n'}<Text style={{color: COLORS.accent}}>Season 3</Text></Text>
          <Text style={styles.heroMeta}>2024 · Stand-up · 1h 42m · Hindi</Text>
          
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.btnPlay} onPress={() => navigation.navigate('Watch')}>
              <Ionicons name="play" size={16} color="#1A0A00" />
              <Text style={styles.btnPlayText}>Watch Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWatchlist}>
              <Text style={styles.btnWatchlistText}>+ Watchlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content Sections */}
      <View style={styles.contentScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {(data?.categories || ['All', 'Stand-Up', 'Podcasts', 'Behind Scenes']).map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.catPill, i === 0 && styles.catPillActive]}>
              <Text style={[styles.catPillText, i === 0 && styles.catPillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <SectionHeader title="Continue Watching" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsRow}>
          {data?.continueWatching?.length > 0 ? (
              data.continueWatching.map((item, idx) => (
                  <ContentCard 
                    key={item.id} 
                    title={item.title} 
                    sub={`${item.type || 'Stand-up'} · ${item.year || '2023'}`} 
                    progress={0.35} 
                    duration="48:22 left" 
                    icon="mic" 
                    color="#2A0A0A" 
                  />
              ))
          ) : (
            <>
              <ContentCard title="Haq Se Single" sub="Stand-up · 2023" progress={0.35} duration="48:22 left" icon="mic" color="#2A0A0A" />
              <ContentCard title="Tathastu" sub="Stand-up · 2022" progress={0.20} duration="1:02:10 left" icon="podcast" color="#0A1A2A" />
            </>
          )}
        </ScrollView>

        <SectionHeader title="Exclusive Specials" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredRow}>
          {data?.exclusiveSpecials?.length > 0 ? (
              data.exclusiveSpecials.map((item, idx) => (
                <FeaturedCard key={item.id} tag="New · 2024" title={item.title} icon="theater-masks" color="#2A0A00" />
              ))
          ) : (
            <>
              <FeaturedCard tag="New · 2024" title="Mannpasand S3" icon="theater-masks" color="#2A0A00" />
              <FeaturedCard tag="Podcast" title="Sunao Zakir" icon="microphone" color="#001A2A" />
            </>
          )}
        </ScrollView>
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

// Internal Components
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionLink}>See all</Text>
  </View>
);

const ContentCard = ({ title, sub, progress, duration, icon, color }) => (
  <View style={styles.contentCard}>
    <View style={[styles.cardThumb, {backgroundColor: color}]}>
      <Text style={{fontSize: 30}}>{icon === 'mic' ? '🎤' : '🎙️'}</Text>
      <View style={styles.cardDuration}>
        <Text style={styles.cardDurationText}>{duration}</Text>
      </View>
    </View>
    <View style={styles.cardProgressBar}>
      <View style={[styles.cardProgressFill, {width: `${progress * 100}%`}]} />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSub}>{sub}</Text>
  </View>
);

const FeaturedCard = ({ tag, title, icon, color }) => (
  <View style={styles.featuredCard}>
    <View style={[styles.featuredBg, {backgroundColor: color}]}>
      <Text style={{fontSize: 40}}>{icon === 'theater-masks' ? '🎭' : '🎙️'}</Text>
      <View style={styles.featuredLabel}>
        <Text style={styles.featuredLabelTag}>{tag}</Text>
        <Text style={styles.featuredLabelTitle}>{title}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  heroContainer: {
    height: 380,
    backgroundColor: '#1A0A0A',
    paddingTop: 10,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  heroTag: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  heroTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A0A00',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 38,
    marginBottom: 8,
  },
  heroMeta: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 15,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnPlay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  btnPlayText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A0A00',
  },
  btnWatchlist: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  btnWatchlistText: {
    fontSize: 13,
    color: 'white',
  },
  contentScroll: {
    marginTop: 20,
  },
  categoriesRow: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  catPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  catPillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  catPillText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '500',
  },
  catPillTextActive: {
    color: '#1A0A00',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionLink: {
    fontSize: 12,
    color: COLORS.accent,
  },
  cardsRow: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  contentCard: {
    width: 140,
    marginRight: 15,
  },
  cardThumb: {
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardDuration: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  cardDurationText: {
    fontSize: 9,
    color: 'white',
    fontWeight: 'bold',
  },
  cardProgressBar: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 6,
    borderRadius: 1,
  },
  cardProgressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 6,
  },
  cardSub: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2,
  },
  featuredRow: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featuredCard: {
    width: 220,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
  },
  featuredBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  featuredLabelTag: {
    fontSize: 9,
    color: COLORS.accent,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  featuredLabelTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
