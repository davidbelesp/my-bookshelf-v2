import { Text, View } from 'react-native';
import BookListComponent from '../components/BookListComponent';

export default function Index() {
    return (
        <View style={{ backgroundColor: "#000"}}>
            <Text type="title" style={{color:"#fff"}}>My Bookshelf</Text>
            <BookListComponent />
        </View>
    );
}