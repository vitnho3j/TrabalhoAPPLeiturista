import { Text, Image, View } from "react-native";
import { estilos } from '../Style/index';

import topo from '../../../assets/img2.jpg'

export default function Title() {
    return (
        <View>
            <Image source={topo} style={estilos.image}/>
            <Text style={estilos.title} >Bem vindo</Text>
        </View>
    );
}
