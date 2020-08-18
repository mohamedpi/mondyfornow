import React from 'react'
import { StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native'


const SearchItem =(props)=> {

    return (
      <TouchableOpacity style={styles.main_container} >
        <Image
          style={styles.image}
          source={{uri : props.game.imageURI}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{props.game.title}</Text>
            <Text style={styles.vote_text}>{props.game.rating}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{props.game.description}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>{props.game.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
  main_container: {
    height: 155,
    flexDirection: 'row',
    marginBottom:15,
    marginTop:15
  },
  image: {
    width: 120,
    height: 160,
    margin: 5,
    backgroundColor: 'gray',
    resizeMode:"cover"
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontFamily:"GlueGun-GW8Z",
    fontSize:25,
    color:"#dce0e9",
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#FFDF00'
  },
  description_container: {
    flex: 7,

  },
  description_text: {

    fontSize:14,
    color:"#dce0e9",
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    fontSize: 14,
    color:"#dce0e9",

  }
})

export default SearchItem
