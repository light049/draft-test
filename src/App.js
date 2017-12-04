import React, { PureComponent } from 'react';
import ContentEditable from './comp/ContentEditable';
import ContentEditable2 from './comp/ContentEditable2';
import DraftJsBasic from './comp/DraftJsBasic';
import DraftJs from './comp/DraftJs';
import './css';

class App extends PureComponent {
    render() {
        return (
            <div className='App'>
                <ContentEditable title='Content Editable' />
                <ContentEditable2 title='Content Editable 2' />
                <DraftJsBasic title='Draft Js (empty)' />
                <DraftJs title='Draft Js' />
            </div>
        );
    }
}

export default App;
