import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image } from 'react-native';

import { images } from '../constants/images';

const OnboardingLogo = () => (
  <Box center>
    <Box>
      <Image source={images.logo} />
    </Box>
    <Text color="white" size="md">Delivering Health to your Home</Text>
  </Box>
);

export default OnboardingLogo;