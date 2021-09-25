import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Components from './index';
import { ExampleComponent } from './index';

function defaultPage() {
    return (
        <div><p>My Paragraph</p></div>
    )
}

const Routes = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={() => <div>Example</div>} />
                <Route exact path='*' component={() => <div>2</div>} />
                <Route path='/different' component={Components.DifferentComponent} />
                <Route path='/' component={() => <div>3</div>} />
            </Switch>
        </main>
    )
}

export default Routes