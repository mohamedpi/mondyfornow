import React from 'react'
import PropTypes from 'prop-types'

import contactData from './contact.json'
import { Nav } from './Nav'
import Profile from './Profile'

const ProfileScreen = ({ navigation }) => (
  <Profile {...contactData} navigation={navigation} />
)

ProfileScreen.navigationOptions = ({ navigation }) => ({
  header: (
    <Nav
      title="Settings"
      navigation={navigation}
      leftIcon={{
        type: 'ionicon',
        name: 'md-list',
        size: 26,
      }}
    />
  ),
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
