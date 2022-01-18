import axios from "axios";

const Item_API_BASE_URL = "http://localhost:8080/api/v1/items";
class ItemService{

    getItems(){
        return axios.get(Item_API_BASE_URL);
    }

    createItem(item){
        return axios.post(Item_API_BASE_URL, item);
    }

    getItemById(itemId){
        return axios.get(Item_API_BASE_URL + '/' + itemId);
    }

    updateItem(item, itemId){
        return axios.put(Item_API_BASE_URL + '/' + itemId, item);
    }

    deleteItem(itemId){
        return axios.delete(Item_API_BASE_URL + '/' + itemId);
    }

    searchItem(searchText){
        return axios.get(Item_API_BASE_URL + '/' + 'search' + '/' + searchText);
    }
}

export default new ItemService()