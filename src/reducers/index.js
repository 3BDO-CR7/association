import { combineReducers }  from 'redux';
import lang                 from './LangReducer';
import blog                 from './CategoriesReducer';
import article              from './ArticlesReducer';

export default combineReducers({
    lang,
    blog,
    article,
});
