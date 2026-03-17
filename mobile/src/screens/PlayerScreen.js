import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  bg: '#0A0A0F',
  surface: '#13131C',
  card: '#1C1C2A',
  accent: '#E8B34B',
  text: '#F0EDE6',
  muted: '#7A7880',
  border: 'rgba(255,255,255,0.07)',
};

const PlayerScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.playerVideoArea}>
        <Text style={styles.playerPlaceholderIcon}>🎤</Text>
        <TouchableOpacity style={styles.playerBack} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playerCenterBtn}>
          <Ionicons name="pause" size={30} color="#1A0A00" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.playerInfo} showsVerticalScrollIndicator={false}>
        <Text style={styles.playerTitle}>Mannpasand S3</Text>
        <Text style={styles.playerMeta}>Zakir Khan · Stand-Up Special · 2024</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: '35%'}]} />
            <View style={[styles.progressDot, {left: '35%'}]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>35:42</Text>
            <Text style={styles.timeText}>1:42:00</Text>
          </View>
        </View>

        <View style={styles.playerControls}>
          <Ionicons name="play-skip-back" size={24} color={COLORS.text} />
          <Ionicons name="refresh" size={24} color={COLORS.text} />
          <TouchableOpacity style={styles.ctrlBtnMain}>
            <Ionicons name="play" size={32} color="#1A0A00" />
          </TouchableOpacity>
          <Ionicons name="repeat" size={24} color={COLORS.text} />
          <Ionicons name="play-skip-forward" size={24} color={COLORS.text} />
        </View>

        <View style={styles.playerOptions}>
          <PlayerOption label="QUALITY" value="1080p HD" />
          <PlayerOption label="AUDIO" value="Hindi" />
          <PlayerOption label="DOWNLOAD" value="Offline" accent />
        </View>

        <Text style={styles.epHeader}>More Episodes</Text>
        <EpisodeItem title="Haq Se Single" meta="55 min · 2023" icon="🏠" active />
        <EpisodeItem title="Kaksha Gyarvi" meta="1h 12 min · 2018" icon="🌶️" />
      </ScrollView>
    </View>
  );
};

const PlayerOption = ({ label, value, accent }) => (
  <View style={styles.playerOption}>
    <Text style={styles.optionLabel}>{label}</Text>
    <Text style={[styles.optionValue, accent && {color: COLORS.accent}]}>{value}</Text>
  </View>
);

const EpisodeItem = ({ title, meta, icon, active }) => (
  <View style={styles.epItem}>
    <View style={styles.epThumb}>
      <Text style={{fontSize: 20}}>{icon}</Text>
    </View>
    <View style={{flex: 1}}>
      <Text style={styles.epTitle}>{title}</Text>
      <Text style={styles.epMeta}>{meta}</Text>
    </View>
    {active && <View style={styles.epDot} />}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  playerVideoArea: {
    height: 250,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerPlaceholderIcon: {
    fontSize: 60,
  },
  playerBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCenterBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(232,179,75,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInfo: {
    padding: 20,
  },
  playerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  playerMeta: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 25,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.accent,
    position: 'absolute',
    top: -5,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.muted,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  ctrlBtnMain: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  playerOption: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 9,
    color: COLORS.muted,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionValue: {
    fontSize: 13,
    color: 'white',
    fontWeight: '600',
  },
  epHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  epItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    gap: 15,
  },
  epThumb: {
    width: 80,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  epTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  epMeta: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  epDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
});

export default PlayerScreen;
