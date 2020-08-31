import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';


const ModalCommande = (props)=>{
  return (
     <View style={{flex: 1}}>
       <Modal isVisible={props.visibility}>
         <View style={{flex: 1}}>
           <Text>Hello!</Text>
          
         </View>
       </Modal>
     </View>
   );
}

export default Modalcommande
