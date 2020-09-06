import React,{useState,useEffect} from "react"
import {View,Text,Image,StyleSheet,FlatList,ScrollView,Alert} from "react-native"
import { SearchBar } from 'react-native-elements';
import SearchItem from "./SearchItem"
import Axios from "axios"




function SearchInterface(props){
  const [searchText,setSearchText] = useState("")
  const [dataList,setDataList]     = useState([])
  const [data,setData]  = useState("")

 const gamesURL = "http://192.168.43.173:8082/games/show"
  useEffect(()=>{
    async function getData()
   {
    const response = await Axios.get(gamesURL);
    setData(response.data)
    console.log("this is games :" + response.data)
   }
   getData()
 },[gamesURL])

const handleTextChange = (text) =>{
    setSearchText(text)
    if(text === "")
    setDataList(data)
    else
    {
     setDataList(data.filter(x => String(x.title.toLowerCase()).includes(text.toLowerCase())))
    }

}

  return(
    <>
       <ScrollView style={styles.container}>
          <View style ={styles.header}>
          <SearchBar
          placeholder="Type Here..."
          onChangeText={handleTextChange}
          value={searchText}
          />
          </View>
          <View>
             {dataList && dataList.map(item  => <SearchItem key ={item._id} game ={item} navigation={props.navigation.navigate}/>) }
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




export default SearchInterface;
