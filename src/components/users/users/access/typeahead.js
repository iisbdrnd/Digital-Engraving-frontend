import React, { Component ,Fragment } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import options from '../../../../data/typeaheadData';
import { Typeahead } from 'react-bootstrap-typeahead';
import {FormGroup ,ButtonToolbar,Button} from 'react-bootstrap';

class TypeaheadOne extends React.Component {
    render(props) {
      console.log(props);
        return (
          <Fragment>
            <div style={{display:"flex", padding:"0px"}}>

              <Typeahead
                id="public-typeahead"
                defaultSelected={options.slice(0, 4)}
                labelKey="name"
                multiple
                options={options}
                placeholder="Choose a state..."
                ref={(ref) => {
                  return this._typeahead = ref;
                }}
              />
              {/* <Typeahead
                id="public-typeahead"
                labelKey={option => `${option.firstName} ${option.lastName}`}
                options={[
                  {firstName: 'Art', lastName: 'Blakey'},
                  {firstName: 'Jimmy', lastName: 'Cobb'},
                  {firstName: 'Elvin', lastName: 'Jones'},
                  {firstName: 'Max', lastName: 'Roach'},
                  {firstName: 'Tony', lastName: 'Williams'},
                ]}
              /> */}
              
              <ButtonToolbar style={{padding: "0px", marginTop: "-8px"}}>
                <Button
                  className="m-2"
                  onClick={() => this._typeahead.clear()}>
                  Clear
                </Button>
              </ButtonToolbar>

            
            </div>
          </Fragment>
        );
      }
    }

export default TypeaheadOne;