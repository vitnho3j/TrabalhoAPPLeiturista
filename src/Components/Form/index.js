import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import {Picker} from "@react-native-picker/picker";
import TakePicture from '../Camera';
import { estilos } from '../Style/index';


export default function Form() {

    const [matricula, setMatricula] = useState(null);
    const [codigo, setCodigo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

  
    function validar() {
        if(matricula != null && selectedValue != "default" && codigo != null) {
            setIsOpen(true)
        } else {
            Alert.alert('Por favor, preencha todos os campos')
        }
    }
    function confirmarEnvio() {
        setIsOpen(false)
        setMatricula(null)
        setCodigo(null)
        setSelectedValue("default")
    }


    return (
        <View>
            <View style={estilos.form}>
                <Text style={estilos.label} >Digite sua matrícula</Text>
                <TextInput 
                style={estilos.input}
                keyboardType="numeric" 
                onChangeText={setMatricula} 
                value={matricula} 
                />
                <Text style={estilos.label}>Digite o código</Text>
                <TextInput 
                onChangeText={setCodigo} 
                value={codigo}
                style={estilos.input} />
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >   
                    <Picker.Item label="Situação:" value="default" />
                    <Picker.Item label="Leitura Implausível" value="Opcao 1" />
                    <Picker.Item label="Releitura" value="Opcao 2" />
                    <Picker.Item label="Situação Risco" value="Opcao 3" />
                    <Picker.Item label="Situação Fraude" value="Opcao 4" />
                    <Picker.Item label="Impedimento Leitura" value="Opcao 6" />
                </Picker>
                <TouchableOpacity style={estilos.button} 
                onPress={() => validar()} >
                <Text style={estilos.buttonText}>
                    Camera
                </Text>
                </TouchableOpacity>
                
            </View>
            <Modal transparent={true} visible={isOpen}>
                <TakePicture 
                    matricula={matricula}
                    codigo={codigo}
                    situacao={selectedValue}
                    confirmarEnvio={confirmarEnvio}
                    
                />
                  
            </Modal> 

        </View>
    );
}

