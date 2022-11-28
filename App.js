import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,SafeAreaView,Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {
  
  const [cep,setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null)



  function limpar(){
    setCep('')
    inputRef.current.focus();
    setCepUser(null);
  };

 async function buscar(){
    if(cep === ''){
      alert('Digite um Cep Valido');
      setCep('');
      return;
    }

    
    try{
      const responce = await api.get(`/${cep}/json`);
      //console.log(responce.data)
      setCepUser(responce.data)
      Keyboard.dismiss();//Fechar teclado

    }
    catch(error){
      console.log('Erro : ' + error );
    }


  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>

        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
        style={styles.input}
        placeholder='EX: 53439310'
        value={ cep }
        onChangeText={(texto)=> setCep(texto)}
        keyboardType='numeric'
        ref={inputRef}
        />

      </View>
      <View style={styles.areaBt}>

        <TouchableOpacity
         style={[styles.btn,{backgroundColor:'#1d57cd'}]}
         onPress={buscar}
         >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.btn,{backgroundColor:'#cd3e1d'}]}
        onPress={limpar}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

     
      {cepUser &&
          <View style={styles.areaResult}>
            <Text style={styles.itemText} >CEP : {cepUser.cep}</Text>
            <Text style={styles.itemText} >Logradouro : {cepUser.logradouro}</Text>
            <Text style={styles.itemText} >Bairro: {cepUser.bairro}</Text>
            <Text style={styles.itemText} >Cidade : {cepUser.localidade}</Text>
            <Text style={styles.itemText} >Estado : {cepUser.uf}</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    fontSize:18,
    
  },
  text:{
    marginTop:100,
    marginBottom:15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  areaBt:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:25,
    justifyContent:'space-around'
  },
  btn:{
    height: 50,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:5,
    padding: 15,
    
  },
  btnText:{
    color: '#FFF',
    fontSize: 15,
    

  },
  areaResult:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
  },
  itemText:{
      fontSize:22
  }


});
