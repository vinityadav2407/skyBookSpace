
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
// Note: You might need to install react-native-linear-gradient for the best effect
// If not, the dark background still works with these new animations.

const { width } = Dimensions.get('window');

// Custom animation for a gentle floating effect
const floating = {
  0: { translateY: 0 },
  0.5: { translateY: -15 },
  1: { translateY: 0 },
};

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3500); // Increased slightly to let animations breathe
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050810" />

      {/* Decorative Glowing Moon/Orb */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={3000}
        style={styles.moonGlow}
      />

      <View style={styles.content}>
        {/* Logo with Floating Animation */}
        <Animatable.View
          animation={floating}
          iterationCount="infinite"
          duration={3000}
          easing="ease-in-out"
        >
          <Animatable.Image
            animation="zoomIn"
            duration={1200}
            source={require('../../src/assets/app_icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Animatable.Text
            animation="fadeInUp"
            delay={500}
            style={styles.appName}
          >
            SkyBook<Text style={{ color: '#f0efe9' }}>Space</Text>
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInUp"
            delay={800}
            style={styles.tagline}
          >
            EXPLORE YOUR READING UNIVERSE
          </Animatable.Text>
        </View>

        {/* Improved Loading Indicator */}
        <View style={styles.dotsRow}>
          {[0, 1, 2].map(i => (
            <Animatable.View
              key={i}
              animation="flash"
              iterationCount="infinite"
              duration={1500}
              delay={i * 200}
              style={styles.dot}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

Splash.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050810', // Deeper space black
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  moonGlow: {
    position: 'absolute',
    top: verticalScale(60),
    right: scale(-20),
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    backgroundColor: 'rgba(245, 230, 200, 0.05)', // Very faint glow
    zIndex: 1,
  },
  logo: {
    width: scale(180),
    height: scale(160),
    // Adding a subtle shadow to the logo
    shadowColor: '#8899bb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  appName: {
    color: '#FFFFFF',
    fontSize: moderateScale(32),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    color: '#8899bb',
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 4,
    marginTop: verticalScale(8),
    opacity: 0.8,
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: verticalScale(60),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 3,
    backgroundColor: '#e7e6e1', // Gold color to match "Space"
    marginHorizontal: scale(4),
  },
});
