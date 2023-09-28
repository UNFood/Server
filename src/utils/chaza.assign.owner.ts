import fs from 'fs';
import User from '../models/User';
export const assignOwnerToChazas = async (): Promise<void> => {
    // Leer el archivo chazas.json
    const rawData = fs.readFileSync('src/utils/data/chaza.json', 'utf-8');
    const chazas = JSON.parse(rawData);

    for(const chaza of chazas){
        chaza.owner = await User.findOne();
    }
    const jsonData=JSON.stringify(chazas);
    fs.writeFileSync('src/utils/data/chaza.json',jsonData,'utf-8');
    throw new Error('Error al asignar propietario a las chazas');
    
}