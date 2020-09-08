import { combineReducers }  from 'redux';
import lang                 from './LangReducer';
import blog                 from './CategoriesReducer';
import article              from './ArticlesReducer';
import addOrder             from './AddOrderReducer';

export default combineReducers({
    lang,
    blog,
    article,
    addOrder
});
