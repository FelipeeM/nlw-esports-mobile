import { ImageBackground } from 'react-native';

import backgrounImg from '../../assets/background-galaxy.png'

import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
    return (
        <ImageBackground
            source={backgrounImg}
            defaultSource={backgrounImg}
            style={styles.container}           
        >
            {children}
        </ImageBackground>
    );
}