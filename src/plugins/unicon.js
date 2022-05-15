import * as unicons from 'vue-unicons/dist/icons'
import Unicon from 'vue-unicons'
const objArray = [];
    Object.keys(unicons)
    .forEach(
        key => objArray.push(unicons[key])
        );
    Unicon.add(objArray)
export{
    Unicon
}