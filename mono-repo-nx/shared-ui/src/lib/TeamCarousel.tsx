import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { t } from '@poliverai/intl';

type Member = {
  id: number;
  name: string;
  title: string;
  img: string;
  quote: string;
};

const members: Member[] = [
  { id: 1, name: 'Gabriel Dagadu', title: 'Team Member 1', img: '/team-members/2.png', quote: 'When we teach machines to think, we must also teach them to care.' },
  { id: 2, name: 'Surajudeen Akande', title: 'Team Member 2', img: '/team-members/1.jpeg', quote: 'AI amplifies human creativity and helps us solve previously intractable problems.' },
  { id: 3, name: 'El-Moatasem Madani', title: 'Team Member 3', img: '/team-members/3.png', quote: 'Automation liberates humans to focus on what matters most.' },
  { id: 4, name: 'Labius Ramono Disemelo', title: 'Team Member 4', img: '/team-members/4.jpg', quote: 'Robust systems and compassionate design go hand in hand.' },
  { id: 5, name: 'Hafiz Syed Ashir Hassan', title: 'Team Member 5', img: '/team-members/5.jpg', quote: 'Open data and AI can build a fairer future for everyone.' },
  { id: 6, name: 'Foster Luh', title: 'Team Member 6', img: '/team-members/6.jpg', quote: 'AI must be built with empathy and a focus on human dignity.' },
  { id: 7, name: 'Syed Abrar Ahmad', title: 'Team Member 7', img: '/team-members/7.png', quote: 'Security and privacy are the foundations of trust in AI.' },
  { id: 8, name: 'Timothy Kasenge', title: 'Team Member 8', img: '/team-members/8.png', quote: 'Efficient algorithms enable meaningful AI at scale.' },
  { id: 9, name: 'Keplet Saintil', title: 'Team Member 9', img: '/team-members/9.png', quote: 'Language is the bridge between human intent and machine understanding.' },
  { id: 10, name: 'Elijah Rwothoromo', title: 'Team Member 10', img: '/team-members/10.jpg', quote: 'Innovation combines curiosity with disciplined engineering.' },
  { id: 11, name: 'Roger Okello', title: 'Team Member 11', img: '/team-members/11.png', quote: 'Quality assurance ensures reliability and user confidence.' },
  { id: 12, name: 'Seun Odewale', title: 'Team Member 12', img: '/team-members/12.jpg', quote: 'Strong IT foundations make resilient products possible.' },
  { id: 13, name: 'Abraham Omomoh', title: 'Team Member 13', img: '/team-members/13.jpg', quote: 'Inspiration drives teams to turn ideas into impact.' },
];

function copy(path: string, fallback: string) {
  const value = t(path, fallback);
  return typeof value === 'string' ? value : fallback;
}

export default function TeamCarousel() {
  const [index, setIndex] = React.useState(0);
  const { width } = useWindowDimensions();
  const perView = width < 768 ? 1 : 3;
  const maxIndex = Math.max(0, Math.ceil(members.length / perView) - 1);
  const slice = members.slice(index * perView, index * perView + perView);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>{copy('team_carousel.title', 'Meet the Team')}</Text>
        <Text style={styles.subheading}>
          {copy('team_carousel.subtitle', 'Building responsible AI tools to protect privacy and empower organizations.')}
        </Text>
      </View>

      <View style={styles.carouselWrap}>
        <Pressable onPress={() => setIndex((current) => Math.max(0, current - 1))} style={styles.arrowButton}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        <View style={styles.cardsWrap}>
          {slice.map((member) => (
            <View key={member.id} style={styles.card}>
              {Platform.OS === 'web' ? (
                <Image source={{ uri: member.img }} style={styles.avatar} resizeMode="cover" />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>{member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</Text>
                </View>
              )}
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.title}</Text>
              <Text style={styles.quote}>“{member.quote}”</Text>
            </View>
          ))}
        </View>
        <Pressable onPress={() => setIndex((current) => Math.min(maxIndex, current + 1))} style={styles.arrowButton}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    maxWidth: 1120,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 34,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  heading: {
    color: '#0f172a',
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '700',
    textAlign: 'center',
  },
  subheading: {
    marginTop: 12,
    maxWidth: 720,
    color: '#475569',
    fontSize: 18,
    lineHeight: 29,
    textAlign: 'center',
  },
  carouselWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.95)',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '700',
  },
  cardsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
    flex: 1,
  },
  card: {
    width: 300,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  avatarFallback: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: '#1d4ed8',
    fontSize: 28,
    fontWeight: '800',
  },
  name: {
    marginTop: 14,
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  role: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  quote: {
    marginTop: 14,
    color: '#475569',
    fontSize: 15,
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
