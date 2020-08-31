import React,{useState,useEffect} from "react"
import {View,Text,Image,StyleSheet,FlatList,ScrollView,Alert} from "react-native"
import { SearchBar } from 'react-native-elements';
import SearchItem from "./SearchItem"
import Axios from "axios"
import { connect } from "react-redux";



function SearchInterface(props){
  const [searchText,setSearchText] = useState("")
  const [dataList,setDataList]     = useState([])
  const [data,setData]  = useState("")


  useEffect(()=>{
    async function getData()
   {
    const response = await Axios.get("http://192.168.43.173:5000/games/show");
    setData(response.data)
   }
   getData()
 })

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
             {dataList.map(item  => <SearchItem key ={item._id} game ={item} navigation={props.navigation.navigate}/>) }
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

const mapStateProps = (state) => ({
  games: state.games
});


export default connect(mapStateProps)(SearchInterface);
