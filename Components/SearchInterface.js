import React,{useState} from "react"
import {View,Text,Image,StyleSheet,FlatList,ScrollView } from "react-native"
import { SearchBar } from 'react-native-elements';
import SearchItem from "./SearchItem"


function SearchInterface(){
  const [searchText,setSearchText] = useState("")
  return(
    <>
       <ScrollView style={styles.container}>
          <View style ={styles.header}>
          <SearchBar
          placeholder="Type Here..."
          onChangeText={setSearchText}
           value={searchText}
          />
          </View>
          <View>
           <SearchItem/>
            <SearchItem/>
             <SearchItem/>
              <SearchItem/>
          </View>
       </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:0,
    backgroundColor:"#121419"
  },  textStyle:{
      paddingHorizontal:15,
      marginVertical:15,
      fontFamily:"GlueGun-GW8Z",
      fontSize:25,
      color:"#dce0e9"
    },
    header :{

    }
})

export default SearchInterface
