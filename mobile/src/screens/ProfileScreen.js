import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProfileData } from '../services/api';

const COLORS = {
  bg: '#0A0A0F',
  surface: '#13131C',
  card: '#1C1C2A',
  accent: '#E8B34B',
  text: '#F0EDE6',
  muted: '#7A7880',
  border: 'rgba(255,255,255,0.07)',
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const userId = '6f6f6f6f-6f6f-6f6f-6f6f-6f6f6f6f6f6f'; // Demo UUID

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProfileData(userId);
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileHeaderText}>MY ACCOUNT</Text>
        <Ionicons name="settings-outline" size={20} color={COLORS.muted} />
      </View>

      <View style={styles.profileHero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile?.name ? profile.name.split(' ').map(n=>n[0]).join('') : 'RK'}</Text>
        </View>
        <View>
          <Text style={styles.profileName}>{profile?.name || 'Rahul Kumar'}</Text>
          <Text style={styles.profileEmail}>{profile?.email || 'rahul.k@email.com'}</Text>
          <View style={styles.subBadge}>
            <Ionicons name="star" size={10} color={COLORS.accent} />
            <Text style={styles.subBadgeText}>ZakirLive {profile?.planName || 'Premium'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatItem num={profile?.watchedCount || "47"} label="Watched" />
        <StatItem num={profile?.savedCount || "12"} label="Saved" />
        <StatItem num={profile?.totalTime || "0H"} label="Total Time" />
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuGroupTitle}>SUBSCRIPTION</Text>
        <MenuItem icon="star" title={`${profile?.planName || 'Premium'} Plan`} sub={`Renews ${profile?.planExpiry || 'N/A'}`} />
        <MenuItem icon="card" title="Payment Methods" sub="Visa ending in 4242" />
        
        <Text style={styles.menuGroupTitle}>SETTINGS</Text>
        <MenuItem icon="notifications" title="Notifications" sub="New releases & events" />
        <MenuItem icon="trending-up" title="Video Quality" sub="Auto" />
        <MenuItem icon="download" title="Downloads" sub="3 videos · 1.2 GB" />
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

// Internal Components
const StatItem = ({ num, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statNum}>{num}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, title, sub }) => (
  <View style={styles.menuItem}>
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={18} color={COLORS.muted} />
    </View>
    <View style={{flex: 1}}>
      <Text style={styles.menuTitle}>{title}</Text>
      {sub && <Text style={styles.menuSub}>{sub}</Text>}
    </View>
    <Text style={styles.menuArrow}>›</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  profileHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.muted,
    letterSpacing: 1,
  },
  profileHero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(232,179,75,0.05)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 3,
    borderColor: COLORS.bg,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A0A00',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  subBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232,179,75,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: 'rgba(232,179,75,0.3)',
    gap: 6,
  },
  subBadgeText: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.card,
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },
  statNum: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuGroupTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.muted,
    marginTop: 25,
    marginBottom: 10,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    gap: 15,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  menuSub: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 18,
    color: COLORS.muted,
  },
});

export default ProfileScreen;
