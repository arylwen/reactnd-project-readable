import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { compose } from 'redux'
import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { reducer as formReducer } from 'redux-form';

import { categoriesReducer } from './reducers/categories-reducer'
import { postsReducer } from './reducers/posts-reducer'
import { commentsReducer } from './reducers/comments-reducer'

import Navigation from './components/navigation'
import Landing from './components/landing'
import NewPost from './components/new-post'
import DisplayPost from './components/display-post'
import EditPost from './components/edit-post'
import NewComment from './components/new-comment'
import EditComment from './components/edit-comment'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    categories: categoriesReducer,
    posts: postsReducer,
    comments: commentsReducer,
    form: formReducer,
})

const store = createStore( 
    reducers, 
    composeEnhancers (
        applyMiddleware(thunk)
    ) 
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={ Landing } />
                    <Route exact path='/posts/new' component={ NewPost } />
                    <Route exact path='/:category/:postid' component={ DisplayPost } />
                    <Route exact path='/:category/edit/:postid' component ={ EditPost } />
                    <Route exact path='/:category/:postid/comments/new' component={ NewComment } />
                    <Route exact path='/:category/:postid/comments/edit/:commentid' component= { EditComment } />
                    <Route exact path='/:category' component={ props => <Landing {...props} /> } />
                    <Route path='*' component={ Landing } />
                </Switch>
            </div>    
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

 